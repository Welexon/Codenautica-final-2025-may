import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Analytics = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your performance metrics and insights</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: user?.role === 'business' ? 'Active Solutions' : 'Total Sales',
            value: user?.role === 'business' ? '5' : '€12,450',
            icon: user?.role === 'business' ? BarChart3 : DollarSign,
            change: '+12% from last month',
          },
          {
            label: 'Active Users',
            value: '1,234',
            icon: Users,
            change: '+18% from last month',
          },
          {
            label: 'Growth Rate',
            value: '23%',
            icon: TrendingUp,
            change: '+5% from last month',
          },
          {
            label: user?.role === 'business' ? 'Total Spend' : 'Revenue',
            value: user?.role === 'business' ? '€4,320' : '€8,940',
            icon: DollarSign,
            change: '+8% from last month',
          },
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends</h2>
          <div className="h-80 bg-gray-50 rounded flex items-center justify-center">
            Chart placeholder - Usage trends over time
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="h-80 bg-gray-50 rounded flex items-center justify-center">
            Chart placeholder - Performance metrics
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;