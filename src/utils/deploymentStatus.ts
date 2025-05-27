import { supabase } from '../lib/supabase';

/**
 * Interface for deployment status
 */
export interface DeploymentStatus {
  id: string;
  status: 'queued' | 'building' | 'deployed' | 'failed';
  url?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
  claimed: boolean;
  claimUrl?: string;
}

/**
 * Checks the deployment status of a specific deployment
 * @param deployId The ID of the deployment to check
 * @returns The deployment status or null if not found
 */
export const getDeploymentStatus = async (deployId: string): Promise<DeploymentStatus | null> => {
  try {
    // First try to get from Supabase if connected
    const { data: userData } = await supabase.auth.getUser();
    
    if (userData?.user) {
      const { data, error } = await supabase
        .from('deployments')
        .select('*')
        .eq('id', deployId)
        .single();
        
      if (!error && data) {
        return {
          id: data.id,
          status: data.status,
          url: data.url,
          error: data.error,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          claimed: data.claimed,
          claimUrl: data.claim_url
        };
      }
    }
    
    // Fallback to API call
    const response = await fetch(`https://api.stackblitz.com/deployments/${deployId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch deployment status: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      id: data.id,
      status: data.status,
      url: data.url,
      error: data.error,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      claimed: data.claimed,
      claimUrl: data.claim_url
    };
  } catch (error) {
    console.error('Error checking deployment status:', error);
    return null;
  }
};

/**
 * Polls the deployment status until it reaches a terminal state
 * @param deployId The ID of the deployment to poll
 * @param onStatusChange Callback function to handle status changes
 * @param interval Polling interval in milliseconds
 * @param maxAttempts Maximum number of polling attempts
 * @returns The final deployment status
 */
export const pollDeploymentStatus = async (
  deployId: string,
  onStatusChange?: (status: DeploymentStatus) => void,
  interval = 3000,
  maxAttempts = 60
): Promise<DeploymentStatus | null> => {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const status = await getDeploymentStatus(deployId);
    
    if (!status) {
      return null;
    }
    
    // Notify of status change
    if (onStatusChange) {
      onStatusChange(status);
    }
    
    // If deployment is in a terminal state, return the status
    if (status.status === 'deployed' || status.status === 'failed') {
      return status;
    }
    
    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }
  
  // If we've reached max attempts, return the last known status
  return getDeploymentStatus(deployId);
};