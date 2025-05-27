import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, User, Building2, Code2, Loader, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validation';

interface RegisterFormProps {
  returnTo?: string | null;
  initialRole?: 'business' | 'developer' | '';
}

const RegisterForm: React.FC<RegisterFormProps> = ({ returnTo, initialRole = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuthStore();
  
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: initialRole as 'developer' | 'business' | '',
    acceptTerms: false,
  });
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registerTimeout, setRegisterTimeout] = useState<NodeJS.Timeout | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (registerTimeout) {
        clearTimeout(registerTimeout);
      }
    };
  }, [registerTimeout]);
  
  // Set initial role from props if provided
  useEffect(() => {
    if (initialRole && initialRole !== formData.role) {
      setFormData(prev => ({ 
        ...prev, 
        role: initialRole === 'developer' || initialRole === 'business' 
          ? initialRole 
          : 'business'
      }));
    }
  }, [initialRole]);
  
  // Set initial role from props if provided
  useEffect(() => {
    if (initialRole && initialRole !== formData.role) {
      setFormData(prev => ({ 
        ...prev, 
        role: initialRole === 'developer' || initialRole === 'business' 
          ? initialRole 
          : 'business'
      }));
    }
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name || !formData.role) {
      setError('All fields are required');
      return;
    }

    if (!formData.role) {
      setError('Please select your role (Business or Developer)');
      return;
    }

    if (!formData.role) {
      setError('Please select your role (Business or Developer)');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');
    
    // Set a timeout to detect stalled registration attempts
    const timeoutId = setTimeout(() => {
      console.log('Registration attempt taking too long, might be stalled');
      setError('Registration is taking longer than expected. Please try again.');
      setLoading(false);
    }, 25000); // 25 seconds timeout
    setRegisterTimeout(timeoutId);

    console.log('Starting registration with data:', { 
      email: formData.email,
      name: formData.name,
      role: formData.role || 'business'
    });

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role || 'business'
      });

      console.log('Registration successful, redirecting...');
      setSuccess(true);
      
      if (registerTimeout) {
        clearTimeout(registerTimeout);
        setRegisterTimeout(null);
      }

      // Redirect will be handled by auth store after successful registration
      // This is just a fallback in case the automatic redirect doesn't work
      const redirectTimeout = setTimeout(() => {
        try {
          window.location.href = '/onboarding';
        } catch (redirectError) {
          console.error('Error during redirect:', redirectError);
        }
      }, 2000);
      
      return () => clearTimeout(redirectTimeout);
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please check your information and try again.');
      }
    } finally {
      setLoading(false);
      if (registerTimeout) {
        clearTimeout(registerTimeout);
        setRegisterTimeout(null);
      }
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {success ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900" role="alert">Registration successful!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your account has been created. Redirecting you to complete your profile...
            </p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4" role="alert">
              <div className="flex items-start">
                <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'business' })}
              className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                formData.role === 'business'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <Building2 className={`h-8 w-8 ${formData.role === 'business' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${formData.role === 'business' ? 'text-blue-700' : 'text-gray-700'}`}>
                Business
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'developer' })}
              className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
                formData.role === 'developer'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <Code2 className={`h-8 w-8 ${formData.role === 'developer' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${formData.role === 'developer' ? 'text-blue-700' : 'text-gray-700'}`}>
                Developer
              </span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="accept-terms"
              name="accept-terms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password || !formData.name || !formData.role || !formData.acceptTerms}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-live="polite"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" aria-hidden="true" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;