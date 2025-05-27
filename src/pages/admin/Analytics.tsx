import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminAnalytics = () => {
  // Mock analytics data - in a real app, fetch from API
  const stats = {
    totalRevenue: {
      value: '€245,890',
      change: '+12.5%',
      trend: 'up'
    },
    activeUsers: {
      value: '4,567',
      change: '+8.2%',
      trend: 'up'
    },
    totalSolutions: {
      value: '789',
      change: '+5.7%',
      trend: 'up'
    },
    averageRating: {
      value: '4.8',
      change: '-0.2%',
      trend: 'down'
    }
  };

  const revenueData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 61000 },
    { month: 'Apr', value: 58000 },
    { month: 'May', value: 63000 },
    { month: 'Jun', value: 72000 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-600">Monitor platform performance and trends</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <span className={`inline-flex items-center text-sm ${
              stats.totalRevenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.totalRevenue.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.totalRevenue.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalRevenue.value}</h3>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <span className={`inline-flex items-center text-sm ${
              stats.activeUsers.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.activeUsers.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.activeUsers.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeUsers.value}</h3>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="h-6 w-6 text-blue-600" />
            <span className={`inline-flex items-center text-sm ${
              stats.totalSolutions.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.totalSolutions.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.totalSolutions.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalSolutions.value}</h3>
          <p className="text-sm text-gray-600">Total Solutions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart2 className="h-6 w-6 text-blue-600" />
            <span className={`inline-flex items-center text-sm ${
              stats.averageRating.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.averageRating.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {stats.averageRating.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.averageRating.value}</h3>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h2>
          <div className="h-80">
            {/* Revenue chart visualization would go here */}
            <div className="h-full flex items-center justify-center text-gray-500">
              Revenue Chart Placeholder
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h2>
          <div className="h-80">
            {/* User growth chart visualization would go here */}
            <div className="h-full flex items-center justify-center text-gray-500">
              User Growth Chart Placeholder
            </div>
          </div>
        </div>

        {/* Solutions Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Solutions</h2>
          <div className="h-80">
            {/* Solutions performance chart visualization would go here */}
            <div className="h-full flex items-center justify-center text-gray-500">
              Solutions Performance Chart Placeholder
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h2>
          <div className="h-80">
            {/* Category distribution chart visualization would go here */}
            <div className="h-full flex items-center justify-center text-gray-500">
              Category Distribution Chart Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;