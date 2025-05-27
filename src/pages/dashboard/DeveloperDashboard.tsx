import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  Users, 
  Plus,
  MessageCircle,
  FileText,
  Briefcase,
  Settings,
  Star
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMarketplaceStore } from '../../store/marketplaceStore';
import { mockRequests } from '../../data/mockData';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { solutions } = useMarketplaceStore();

  // Filter solutions for the current developer
  const mySolutions = solutions.filter(s => s.developer.id === user?.id);

  // Filter relevant requests based on developer's skills
  const relevantRequests = mockRequests.filter(request =>
    request.skills.some(skill => user?.skills?.includes(skill))
  ).slice(0, 3);

  const recentSales = [
    { solution: 'Inventory Management', customer: 'TechCorp AS', amount: '€299', date: '2 hours ago' },
    { solution: 'Analytics Dashboard', customer: 'DataNordic', amount: '€199', date: '1 day ago' },
    { solution: 'HR Suite', customer: 'StaffPro', amount: '€399', date: '3 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">Here's how your solutions are performing</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/solutions/add')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Solution
          </button>
          <button
            onClick={() => navigate('/custom-requests')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Briefcase className="h-5 w-5 mr-2" />
            Browse Requests
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '€4,890', icon: DollarSign, change: '+12% from last month' },
          { label: 'Active Customers', value: '234', icon: Users, change: '+18 this month' },
          { label: 'Solutions', value: mySolutions.length, icon: Package, change: '+1 this month' },
          { label: 'Avg. Rating', value: '4.8', icon: Star, change: '+0.2 from last month' },
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Solutions Performance */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Your Solutions</h2>
              <button
                onClick={() => navigate('/solutions')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {mySolutions.slice(0, 3).map((solution) => (
              <div key={solution.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{solution.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{solution.activeUsers} active users</span>
                        <span>{solution.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/solutions/${solution.id}/edit`)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Matching Requests</h2>
              <button
                onClick={() => navigate('/custom-requests')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {relevantRequests.map((request) => (
              <div key={request.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">Budget: €{request.budget}</span>
                        <span>{request.proposals} proposals</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/marketplace/requests/${request.id}/propose`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentSales.map((sale, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{sale.solution}</h4>
                    <p className="text-sm text-gray-500">{sale.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{sale.amount}</p>
                    <p className="text-sm text-gray-500">{sale.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <button
                onClick={() => navigate('/messages')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { from: 'TechCorp AS', message: 'Question about integration', time: '2 hours ago' },
              { from: 'DataNordic', message: 'New feature request', time: '5 hours ago' },
              { from: 'StaffPro', message: 'Support inquiry', time: '1 day ago' },
            ].map((message, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{message.from}</h4>
                    <p className="text-sm text-gray-500">{message.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;