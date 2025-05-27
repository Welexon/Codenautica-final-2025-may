import React from 'react';
import { useAuthStore } from '../../store/authStore';
import BusinessDashboard from './BusinessDashboard';
import DeveloperDashboard from './DeveloperDashboard';
import AdminDashboard from '../admin/Dashboard';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { supabase } from '../../lib/supabase';
import { formatUserData } from '../../store/authStore';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  
  // Show loading state while checking authentication
  if (!isAuthenticated && user === undefined) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated in dashboard, checking session...');
    
    // Check for session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        console.log('No session found in dashboard, redirecting to login');
        setTimeout(() => {
          window.location.href = '/login?returnTo=/dashboard';
        }, 50);
      } else {
        console.log('Session exists but user state not loaded yet');
        
        // Try to get the user from the session
        supabase.auth.getUser().then(({ data: userData, error }) => {
          if (error || !userData.user) {
            console.error('Error getting user from session:', error);
            setTimeout(() => {
              window.location.href = '/login?returnTo=/dashboard';
            }, 50);
            return;
          }
          
          // Try to fetch the profile directly
          supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.user.id)
            .single()
            .then(({ data: profile, error: profileError }) => {
              if (profileError || !profile) {
                console.error('Error fetching profile:', profileError);
                setTimeout(() => {
                  window.location.href = '/login?returnTo=/dashboard';
                }, 50);
                return;
              }
              
              // Manually update the auth store
              useAuthStore.setState({ 
                user: formatUserData(profile), 
                isAuthenticated: true 
              });
            });
        });
      }
    }).catch(error => {
      console.error('Error checking session:', error);
      setTimeout(() => {
        window.location.href = '/login?returnTo=/dashboard';
      }, 50);
    });
    
    return <LoadingSpinner text="Checking authentication..." />;
  }

  if (!user) {
    return <LoadingSpinner text="Loading user data..." />;
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'business':
      return <BusinessDashboard />;
    case 'developer':
      return <DeveloperDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <BusinessDashboard />;
  }
};

export default Dashboard;