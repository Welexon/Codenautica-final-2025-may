import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/auth';
import { BarChart2, Users, Star, Package, MessageSquare, Calendar, FileText, Building2, Settings } from 'lucide-react';

interface ProfileStatsProps {
  user: User | null;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => {
  const navigate = useNavigate();

  // Determine available actions based on user role
  const availableActions = user?.role === 'business' 
    ? [
        { 
          label: 'Browse Solutions', 
          icon: Package,
          onClick: () => navigate('/marketplace')
        },
        { 
          label: 'Post Custom Request', 
          icon: FileText,
          onClick: () => navigate('/post-request')
        },
        { 
          label: 'Schedule Meeting', 
          icon: Calendar,
          onClick: () => navigate('/schedule-meeting')
        },
        { 
          label: 'Find Developers', 
          icon: Users,
          onClick: () => navigate('/developers')
        }
      ]
    : [
        { 
          label: 'Add Solution', 
          icon: Package,
          onClick: () => navigate('/solutions/add')
        },
        { 
          label: 'View Requests', 
          icon: FileText,
          onClick: () => navigate('/custom-requests')
        },
        { 
          label: 'Messages', 
          icon: MessageSquare,
          onClick: () => navigate('/messages')
        },
        { 
          label: 'My Solutions', 
          icon: Building2,
          onClick: () => navigate('/solutions')
        }
      ];

  const handleSettingsClick = (path: string) => {
    navigate(`/settings/${path}`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            name: 'Total Solutions',
            value: '12',
            icon: Package,
            change: '+2.5%',
            changeType: 'increase',
          },
          {
            name: 'Active Users',
            value: '2.7k',
            icon: Users,
            change: '+10.2%',
            changeType: 'increase',
          },
          {
            name: 'Average Rating',
            value: '4.8',
            icon: Star,
            change: '+0.3',
            changeType: 'increase',
          },
          {
            name: 'Revenue',
            value: '€24.5k',
            icon: BarChart2,
            change: '+4.75%',
            changeType: 'increase',
          },
        ].map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'increase'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Solutions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Solutions</h2>
            <button 
              onClick={() => navigate('/solutions')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: 'Inventory Management',
                status: 'Active',
                lastUsed: '2 hours ago',
                metrics: { users: 45, uptime: '99.9%' }
              },
              {
                name: 'Analytics Dashboard',
                status: 'Active',
                lastUsed: '1 day ago',
                metrics: { users: 32, uptime: '99.8%' }
              },
              {
                name: 'HR Management Suite',
                status: 'Active',
                lastUsed: '3 days ago',
                metrics: { users: 28, uptime: '99.9%' }
              }
            ].map((solution) => (
              <div 
                key={solution.name}
                className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => navigate('/solutions')}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{solution.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {solution.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Last used: {solution.lastUsed}</span>
                  <span>{solution.metrics.users} active users</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings & Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings & Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            {/* Settings Links */}
            <button
              onClick={() => handleSettingsClick('profile')}
              className="flex items-center p-3 text-left bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="font-medium">Profile Settings</span>
            </button>
            <button
              onClick={() => handleSettingsClick('security')}
              className="flex items-center p-3 text-left bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="font-medium">Security Settings</span>
            </button>
            <button
              onClick={() => handleSettingsClick('notifications')}
              className="flex items-center p-3 text-left bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="font-medium">Notification Preferences</span>
            </button>
            <button
              onClick={() => handleSettingsClick('billing')}
              className="flex items-center p-3 text-left bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className="font-medium">Billing Information</span>
            </button>

            {/* Role-specific Actions */}
            <div className="border-t border-gray-200 my-4 pt-4">
              {availableActions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="flex items-center p-3 text-left bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors w-full mb-2"
                >
                  <action.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;