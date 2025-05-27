import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthRouteProps } from '../../types/auth';
import LoadingSpinner from '../ui/LoadingSpinner';
import { supabase } from '../../lib/supabase';
import { formatUserData } from '../../store/authStore';

const ProtectedRoute: React.FC<AuthRouteProps> = ({
  children,
  allowedRoles = [],
  requireAuth = true,
}) => {
  const { isAuthenticated, user, isAdmin } = useAuthStore();
  const location = useLocation();
  
  // Show loading state while auth is being checked
  if (requireAuth && user === undefined) {
    console.log('User undefined in protected route, checking session...');
    
    // Check for session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        console.log('No session found in protected route, redirecting to login');
        window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
      } else {
        console.log('Session exists but user state not loaded yet');
        
        // Try to get the user from the session
        supabase.auth.getUser().then(({ data: userData, error }) => {
          if (error || !userData.user) {
            console.error('Error getting user from session:', error);
            window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
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
                window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
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
      window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
    });
    
    return <LoadingSpinner fullScreen text="Checking your session..." />;
  }

  if (requireAuth && !isAuthenticated) {
    console.log('Protected route requires auth, redirecting to login');
    
    // Use a more reliable way to redirect with a short delay
    setTimeout(() => {
      window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
    }, 50);
    
    return <LoadingSpinner fullScreen text="Redirecting to login..." />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles.length > 0 && user) {
    // Admin override - admins can access any route
    if (isAdmin()) {
      return <>{children}</>;
    }
    
    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(user.role)) {
      return (
        <Navigate
          to="/unauthorized"
          state={{ 
            message: 'You do not have permission to access this page.',
            returnTo: '/'
          }}
          replace
        />
      );
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;