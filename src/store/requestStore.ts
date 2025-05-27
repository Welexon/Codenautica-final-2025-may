import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { useActivityStore } from './activityStore';
import { useNotificationStore } from './notificationStore';
import { useNotificationStore } from './notificationStore';
import { mockRequests } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

export interface CustomRequest {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: string;
  postedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  skills: string[];
  requirements?: string[];
  attachments?: {
    name: string;
    url: string;
    size: string;
  }[];
  proposals?: number;
  postedAt?: string;
}

interface RequestState {
  requests: CustomRequest[]; 
  loading: boolean;
  error: string | null;
  fetchRequests: () => Promise<void>;
  addRequest: (request: Omit<CustomRequest, 'id' | 'status' | 'postedAt' | 'proposals'>) => Promise<void>;
  updateRequest: (id: string, updates: Partial<CustomRequest>) => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  getRequestById: (id: string) => CustomRequest | undefined;
}

export const useRequestStore = create<RequestState>()(
  persist(
    (set, get) => ({
      requests: mockRequests, // Initialize with mock data
      loading: false,
      error: null,

      fetchRequests: async () => {
        set({ loading: true, error: null });
        try {
          // Check if Supabase is connected
          const isConnected = await checkSupabaseConnection();
          if (!isConnected) {
            console.warn('Not connected to Supabase, using mock data for requests');
            set({ 
              requests: mockRequests,
              error: null
            });
            return;
          }
          
          const { data, error } = await supabase
            .from('custom_requests')
            .select(`
              *,
              postedBy:profiles!custom_requests_posted_by_fkey (
                id,
                name,
                avatar
              ),
              proposals (
                *,
                developer:profiles!proposals_developer_id_fkey (
                  id,
                  name,
                  avatar
                )
              )
            `)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching requests:', error);
            set({ 
              requests: mockRequests,
              error: 'Failed to fetch from database, showing sample data'
            });
            return;
          }

          if (!data || data.length === 0) {
            console.log('No requests found in database, using mock data');
            set({ 
              requests: mockRequests,
              error: null // Don't show error for empty data, just use mock data
            });
            return;
          }

          // Format the requests data
          const formattedRequests = data.map((request: any) => ({
            ...request,
            postedBy: request.postedBy || {
              id: request.posted_by,
              name: 'Unknown User',
              avatar: `https://ui-avatars.com/api/?name=Unknown+User`
            },
            requirements: Array.isArray(request.requirements) ? request.requirements : [],
            attachments: Array.isArray(request.attachments) ? request.attachments : [],
            skills: Array.isArray(request.skills) ? request.skills : [],
            skills: Array.isArray(request.skills) ? request.skills : [],
            proposals: request.proposals?.length || 0
          }));

          set({ requests: formattedRequests, error: null });
        } catch (error) {
          console.error('Error fetching requests:', error);
          set({ 
            requests: mockRequests,
            error: 'Failed to fetch requests - showing sample data'
          });
        } finally {
          set({ loading: false });
        }
      },

      addRequest: async (requestData) => {
        set({ loading: true, error: null });
        try {
          // Check if Supabase is connected
          const isConnected = await checkSupabaseConnection();
          if (!isConnected) {
            console.warn('Not connected to Supabase, using mock data for adding request');
            
            // Create a mock request with a generated ID
            const newRequest: CustomRequest = {
              id: uuidv4(),
              title: requestData.title,
              description: requestData.description,
              budget: requestData.budget,
              deadline: requestData.deadline,
              status: 'open',
              postedBy: requestData.postedBy,
              skills: requestData.skills || [],
              requirements: requestData.requirements || [],
              attachments: requestData.attachments || [],
              proposals: 0,
              postedAt: new Date().toISOString()
            };
            
            set(state => ({
              requests: [newRequest, ...state.requests],
              loading: false
            }));
            
            return;
          }
          
          // Prepare data for Supabase
          const supabaseData = {
            title: requestData.title,
            description: requestData.description,
            budget: requestData.budget,
            deadline: requestData.deadline,
            posted_by: requestData.postedBy.id,
            skills: requestData.skills || [],
            requirements: requestData.requirements || [],
            attachments: requestData.attachments || [],
            status: 'open'
          };
          
          // Insert request into database
          const { data, error } = await supabase
            .from('custom_requests')
            .insert([supabaseData])
            .select()
            .single();
            
          if (error) {
            throw error;
          }
          
          // Format the new request
          const newRequest: CustomRequest = {
            id: data.id,
            title: data.title,
            description: data.description,
            budget: data.budget,
            deadline: data.deadline,
            status: data.status,
            postedBy: requestData.postedBy,
            skills: data.skills || [],
            requirements: data.requirements || [],
            attachments: data.attachments || [],
            proposals: 0,
            postedAt: data.created_at
          };
          
          // Update state with new request
          set(state => ({
            requests: [newRequest, ...state.requests]
          }));
          
          // Log activity
          useActivityStore.getState().addActivity({
            userId: requestData.postedBy.id,
            type: 'request_create',
            details: {
              requestId: data.id,
              requestTitle: data.title
            }
          });
          
          // Send notification to developers
          // In a real app, you would fetch developers with matching skills
          // and send them notifications
          useNotificationStore.getState().addNotification({
            userId: requestData.postedBy.id,
            type: 'success',
            title: 'Request Posted',
            message: `Your request "${data.title}" has been posted successfully.`,
            action: {
              label: 'View Request',
              url: `/marketplace/requests/${data.id}`
            }
          });
          
        } catch (error) {
          console.error('Failed to add request:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      
      updateRequest: async (id, updates) => {
        // Implementation for updating requests
      },
      
      deleteRequest: async (id) => {
        // Implementation for deleting requests
      },
      
      getRequestById: (id) => {
        return get().requests.find(request => request.id === id);
      }
    }),
    {
      name: 'request-storage',
      partialize: (state) => ({
        requests: state.requests,
      }),
    }
  )
);

// Import missing functions
import { checkSupabaseConnection } from '../lib/supabase';