import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Clock, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMarketplaceStore } from '../../store/marketplaceStore';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { solutions } = useMarketplaceStore();

  // In a real app, these would be fetched from an API
  const activeSolutions = solutions.slice(0, 3);
  const recentActivity = [
    { type: 'solution_activated', name: 'Inventory Management', time: '2 hours ago' },
    { type: 'support_ticket', name: 'Technical Question', time: '1 day ago' },
    { type: 'payment_processed', name: 'Monthly Subscription', time: '3 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">Here's what's happening with your solutions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Solutions', value: '3', icon: Package, change: '+1 this month' },
          { label: 'Total Usage', value: '2.4k', icon: BarChart3, change: '+12% from last month' },
          { label: 'Uptime', value: '99.9%', icon: Clock, change: 'Last 30 days' },
          { label: 'Support Tickets', value: '2', icon: MessageCircle, change: '1 open' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Active Solutions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Solutions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activeSolutions.map((solution) => (
            <div key={solution.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{solution.title}</h3>
                  <p className="text-sm text-gray-500">Last used 2 hours ago</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/solutions/${solution.id}/dashboard`)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View Dashboard
              </button>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => navigate('/marketplace')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse More Solutions →
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {activity.type === 'solution_activated' && (
                    <Package className="h-6 w-6 text-blue-600" />
                  )}
                  {activity.type === 'support_ticket' && (
                    <MessageCircle className="h-6 w-6 text-yellow-500" />
                  )}
                  {activity.type === 'payment_processed' && (
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">{activity.name}</h4>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;