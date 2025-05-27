import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  Settings, 
  Package, 
  Building2, 
  CreditCard, 
  Calendar, 
  Mail, 
  Edit,
  Users,
  Star,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import MeetingScheduler from '../components/profile/MeetingScheduler';
import MessageCenter from '../components/profile/MessageCenter';
import ProjectList from '../components/profile/ProjectList';
import ProfileStats from '../components/profile/ProfileStats';
import SolutionList from '../components/profile/SolutionList';
import SubscriptionManager from '../components/profile/SubscriptionManager';
import BusinessSettings from '../components/profile/BusinessSettings';
import DeveloperSettings from '../components/profile/DeveloperSettings';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'meetings' | 'projects' | 'solutions' | 'subscriptions' | 'settings'>('overview');

  // Show loading state while checking authentication
  if (!isAuthenticated && user === undefined) {
    return <LoadingSpinner text="Loading profile..." />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <LoadingSpinner text="Loading user data..." />;
  }

  const renderRoleSpecificContent = () => {
    if (user?.role === 'developer') {
      return (
        <>
          {activeTab === 'solutions' && <SolutionList />}
          {activeTab === 'settings' && <DeveloperSettings />}
        </>
      );
    }

    if (user?.role === 'business') {
      return (
        <>
          {activeTab === 'subscriptions' && <SubscriptionManager />}
          {activeTab === 'settings' && <BusinessSettings />}
        </>
      );
    }

    return null;
  };

  const getTabs = () => {
    const commonTabs = [
      { id: 'overview', label: 'Overview', icon: Package },
      { id: 'messages', label: 'Messages', icon: Mail },
      { id: 'meetings', label: 'Meetings', icon: Calendar }
    ];

    if (user?.role === 'developer') {
      return [
        ...commonTabs,
        { id: 'solutions', label: 'My Solutions', icon: Package },
        { id: 'settings', label: 'Developer Settings', icon: Settings }
      ];
    }

    if (user?.role === 'business') {
      return [
        ...commonTabs,
        { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
        { id: 'settings', label: 'Business Settings', icon: Settings }
      ];
    }

    return commonTabs;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={user?.name}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {user?.role === 'developer' ? 'Developer' : 'Business'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {getTabs().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && <ProfileStats user={user} />}
          {activeTab === 'messages' && <MessageCenter />}
          {activeTab === 'meetings' && <MeetingScheduler />}
          {renderRoleSpecificContent()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {user?.role === 'developer' ? (
                <>
                  <button
                    onClick={() => navigate('/solutions/add')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Add New Solution
                  </button>
                  <button
                    onClick={() => navigate('/custom-requests')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    View Custom Requests
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Browse Solutions
                  </button>
                  <button
                    onClick={() => navigate('/post-request')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Post Custom Request
                  </button>
                </>
              )}
              <button
                onClick={() => navigate('/settings/billing')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Billing Settings
              </button>
              <button
                onClick={() => navigate('/settings/notifications')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Notification Settings
              </button>
            </div>
          </div>

          {/* Plan Info */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg text-white">
            <h3 className="text-lg font-medium mb-4">Current Plan</h3>
            <p className="text-blue-100 mb-2">
              {user?.plan || 'Free Plan'}
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Profile;