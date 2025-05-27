import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

console.log(`Initializing Supabase client at ${new Date().toISOString()} with:`, { 
  url: supabaseUrl,
  anonKey: supabaseAnonKey.substring(0, 5) + '...' // Log partial key for debugging
});

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Store session in localStorage
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'codenautica-auth',
    flowType: 'implicit' // Use implicit flow for better browser compatibility
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'codenautica'
    }
  }
});

// Connection status tracking
let isConnected = false;
let connectionError: Error | null = null;
let lastConnectionCheck = 0;
const CONNECTION_CHECK_INTERVAL = 15000; // 15 seconds

// Utility function to check Supabase connection with caching
export const checkSupabaseConnection = async () => {
  try {
    
    const now = Date.now();
    const timestamp = new Date().toISOString();
    
    // Return cached result if recent
    if (now - lastConnectionCheck < CONNECTION_CHECK_INTERVAL) {
      if (connectionError) {
        console.warn(`[${timestamp}] Using cached connection error:`, connectionError.message);
      }
      console.log(`[${timestamp}] Using cached connection status: ${isConnected ? 'Connected' : 'Disconnected'}`);
      return isConnected;
    }
    
    console.log(`[${timestamp}] Checking Supabase connection...`);
    
    // Simple query to check connection
    const { data, error } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).limit(1);
    
    if (error) {
      console.error(`[${timestamp}] Supabase connection error during check:`, error.message);
      throw error;
    }
    
    isConnected = true;
    connectionError = null;
    lastConnectionCheck = now;
    console.log(`[${timestamp}] Supabase connection successful.`);
    return isConnected;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Supabase connection error:`, error);
    isConnected = false;
    connectionError = error instanceof Error ? error : new Error(String(error));
    lastConnectionCheck = Date.now();
    console.log(`[${new Date().toISOString()}] Supabase connection failed`);
    return false;
  }
};

// Error handling utility with improved error messages
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Common Postgres error codes
  if (error.code === 'PGRST301') {
    return {
      message: 'You do not have permission to perform this action',
      code: 'permission_denied'
    };
  }

  if (error.code === '23505') {
    return {
      message: 'This record already exists',
      code: 'duplicate_record'
    };
  }

  if (error.code === '23503') {
    return {
      message: 'This action would violate referential integrity',
      code: 'foreign_key_violation'
    };
  }

  if (error.code === '22P02') {
    return {
      message: 'Invalid UUID format',
      code: 'invalid_uuid'
    };
  }

  // Auth errors
  if (error.message?.includes('Email not confirmed')) {
    return {
      message: 'Please verify your email address before logging in',
      code: 'email_not_verified'
    };
  }

  if (error.message?.includes('Invalid login credentials')) {
    return {
      message: 'Invalid email or password',
      code: 'invalid_credentials'
    };
  }

  // Network errors
  if (error.message?.includes('Failed to fetch')) {
    return {
      message: 'Network error. Please check your internet connection',
      code: 'network_error'
    };
  }

  // Default error
  return {
    message: error.message || error.error_description || 'An unexpected error occurred',
    code: error.code || 'unknown_error'
  };
};

// Initialize Supabase connection
// Run an immediate connection check on startup
checkSupabaseConnection().then(isConnected => {
  if (!isConnected) {
    console.warn('Failed to connect to Supabase on startup - falling back to mock data');
  } else {
    console.log('Successfully connected to Supabase on startup');
  }
});

// Set up a regular connection check interval
setInterval(() => {
  checkSupabaseConnection();
}, CONNECTION_CHECK_INTERVAL);

// Export connection status for components to use
export const getConnectionStatus = () => ({
  isConnected,
  lastChecked: lastConnectionCheck,
  error: connectionError
});