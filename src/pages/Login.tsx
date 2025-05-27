import React from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Ship } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const message = location.state?.message;
  const returnTo = location.state?.returnTo;

  // Check if user is already authenticated
  const checkAuth = async () => {
    if (isAuthenticated) {
      window.location.href = returnTo || '/dashboard';
      return;
    }
    
    // Double-check with Supabase directly
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log('Session found but not in auth store, redirecting to dashboard');
        setTimeout(() => {
          window.location.href = returnTo || '/dashboard';
        }, 100);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };
  
  // Run the auth check
  React.useEffect(() => {
    checkAuth();
  }, [isAuthenticated, returnTo]);
  
  // If already authenticated, show loading until redirect happens
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <Ship className="h-12 w-12 text-blue-700" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">CodeNautica</span>
            <span className="text-sm text-blue-700 font-medium -mt-1">Nordic Software Solutions</span>
          </div>
        </Link>

        {message && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-700 text-center" role="alert">{message}</p>
          </div>
        )}

        <LoginForm returnTo={returnTo} />
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to={{
              pathname: "/register",
              search: returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""
            }}
            state={{ returnTo }}
            className="font-medium text-blue-700 hover:text-blue-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;