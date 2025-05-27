import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Package, Users, Briefcase, Settings, ArrowRight, Code2, Building2, BarChart3, Shield, Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';

const WelcomeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { returnTo: '/dashboard' } });
    }
  }, [user, navigate]);

  const businessActions = [
    {
      title: 'Browse Solutions',
      description: 'Explore our marketplace of verified software solutions',
      icon: Package,
      action: () => navigate('/marketplace')
    },
    {
      title: 'Find Developers',
      description: 'Connect with skilled Nordic developers',
      icon: Users,
      action: () => navigate('/developers/directory')
    },
    {
      title: 'Post Custom Request',
      description: 'Submit a custom project request',
      icon: Briefcase,
      action: () => navigate('/post-request')
    },
    {
      title: 'Complete Profile',
      description: 'Set up your business profile',
      icon: Settings,
      action: () => navigate('/settings/profile')
    }
  ];

  const developerActions = [
    {
      title: 'Add Solution',
      description: 'List your software solution in our marketplace',
      icon: Package,
      action: () => navigate('/solutions/add')
    },
    {
      title: 'View Requests',
      description: 'Browse custom project requests from businesses',
      icon: Briefcase,
      action: () => navigate('/custom-requests')
    },
    {
      title: 'Complete Profile',
      description: 'Set up your developer profile',
      icon: Settings,
      action: () => navigate('/settings/profile')
    },
    {
      title: 'Join Community',
      description: 'Connect with other Nordic developers',
      icon: Users,
      action: () => navigate('/community')
    }
  ];

  const adminActions = [
    {
      title: 'Manage Users',
      description: 'View and manage platform users',
      icon: Users,
      action: () => navigate('/admin/users')
    },
    {
      title: 'Manage Solutions',
      description: 'Review and approve solutions',
      icon: Package,
      action: () => navigate('/admin/solutions')
    },
    {
      title: 'View Analytics',
      description: 'Monitor platform performance',
      icon: BarChart3,
      action: () => navigate('/admin/analytics')
    },
    {
      title: 'Security Settings',
      description: 'Manage platform security',
      icon: Shield,
      action: () => navigate('/admin/security')
    }
  ];

  // Determine which actions to show based on user role
  const actions = user?.role === 'admin' 
    ? adminActions 
    : user?.role === 'business' 
      ? businessActions 
      : developerActions;
  if (!user) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            {user?.role === 'admin' ? (
              <Shield className="h-12 w-12 mr-4" />
            ) : user?.role === 'business' ? (
              <Building2 className="h-12 w-12 mr-4" />
            ) : (
              <Code2 className="h-12 w-12 mr-4" />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to CodeNautica, {user?.name}!</h1>
              <p className="text-xl text-blue-100">
                {user?.role === 'admin'
                  ? "Manage and monitor the CodeNautica platform"
                  : user?.role === 'business'
                  ? "Let's find the perfect software solutions for your business"
                  : 'Start sharing your solutions with Nordic businesses'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={action.action}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center mb-4">
                <action.icon className="h-8 w-8 text-blue-600" />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/documentation"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Package className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-gray-700">Documentation</span>
            </a>
            <a
              href="/community"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-gray-700">Community</span>
            </a>
            <a
              href="/support"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Settings className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-gray-700">Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;