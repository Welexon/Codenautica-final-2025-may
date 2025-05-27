import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, Loader, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { validateEmail } from '../../utils/validation';

interface LoginFormProps {
  returnTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ returnTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loginTimeout, setLoginTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Clear error when inputs change
  useEffect(() => {
    if (error) setError('');
  }, [email, password]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (loginTimeout) {
        clearTimeout(loginTimeout);
      }
    };
  }, [loginTimeout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      document.getElementById('email')?.focus();
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      document.getElementById('password')?.focus();
      return;
    }

    setLoading(true);
    
    // Set a timeout to detect stalled login attempts
    const timeoutId = setTimeout(() => {
      console.log('Login attempt taking too long, might be stalled');
      setError('Login is taking longer than expected. Please try again.');
      setLoading(false);
    }, 20000); // 20 seconds timeout
    
    setLoginTimeout(timeoutId);
    
    try {
      console.log('Attempting to login with email:', email);
      await login(email.trim(), password.trim());
      console.log('Login successful, redirecting...');
      setSuccess(true);

      if (loginTimeout) {
        clearTimeout(loginTimeout);
        setLoginTimeout(null);
      }

      // Redirect will be handled by auth store after successful login
    } catch (err: any) {
      console.error('Login error:', err);
      setAttempts(prev => prev + 1);
      
      // Handle specific error cases
      if (err.message.includes('Invalid login credentials')) {
        if (attempts >= 2) {
          setError('Multiple login attempts failed. Would you like to reset your password? ' +
            'Click "Forgot your password?" below.');
        } else {
          setError('Incorrect email or password. Please check your credentials and try again.');
        }
      } else if (err.message.includes('Email not confirmed')) {
        setError('Please verify your email address before logging in. Check your inbox for the verification email.');
      } else if (err.message.includes('Too many requests')) {
        setError('Too many login attempts. Please try again later or reset your password.');
      } else if (err.message.includes('Network')) {
        setError('Connection error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }

      // Focus the appropriate field based on the error
      if (err.message.toLowerCase().includes('email')) {
        document.getElementById('email')?.focus();
      } else {
        document.getElementById('password')?.focus();
      }
    } finally {
      setLoading(false);
      if (loginTimeout) {
        clearTimeout(loginTimeout);
        setLoginTimeout(null);
      }
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div> 
            <h3 className="mt-2 text-lg font-medium text-gray-900">Login successful!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Redirecting you to your dashboard...
            </p>
          </div>
        ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-md bg-red-50 p-4" role="alert">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                aria-label="Email address"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                aria-label="Password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                <span className="text-sm text-gray-500 hover:text-gray-700">
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a 
                href="/forgot-password" 
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
                disabled={loading}
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label={loading ? 'Signing in...' : 'Sign in'}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 mr-2" aria-hidden="true" />
                  Signing in...
                </div> 
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {attempts >= 2 && (
            <div className="text-sm text-center text-gray-600">
              <p>
                Having trouble logging in?{' '}
                <a
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                  disabled={loading}
                >
                  Create a new account
                </a>
                {' '}or{' '}
                <a
                  href="/contact-support"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact-support');
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                  disabled={loading}
                >
                  contact support
                </a>
              </p>
            </div>
          )}
        </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;