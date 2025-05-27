import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthRouteProps } from '../../types/auth';
import { supabase } from '../../lib/supabase';
import { formatUserData } from '../../store/authStore';

const AuthRoute: React.FC<AuthRouteProps> = ({
  children,
  allowedRoles = [],
  requireAuth = true,
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If authentication is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If authentication is required but user is not authenticated
  if (!isAuthenticated) {
    console.log('Auth route requires auth, redirecting to login');

    // Check for session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setTimeout(() => {
          window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
        }, 50);
      } else {
        console.log('Session exists but user state not loaded yet');
        
        // Try to get the user from the session
        supabase.auth.getUser().then(({ data: userData, error }) => {
          if (error || !userData.user) {
            console.error('Error getting user from session:', error);
            setTimeout(() => {
              window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
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
                  window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
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
        window.location.href = `/login?returnTo=${encodeURIComponent(location.pathname)}`;
      }, 50);
    });
    
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  // If specific roles are required, check user's role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;