import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, BarChart3, Users, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMarketplaceStore } from '../../store/marketplaceStore';

const Solutions = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { solutions, loading, error, fetchSolutions } = useMarketplaceStore();
  
  // Fetch solutions on component mount
  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  // Filter solutions for the current user
  const userSolutions = solutions.filter(s => s.developer.id === user?.id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Solutions</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchSolutions()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Solutions</h1>
          <p className="text-gray-600">Manage and monitor your published solutions</p>
        </div>
        <button
          onClick={() => navigate('/solutions/add')}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Add Solution
        </button>
      </div>

      {userSolutions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No solutions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first solution.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/solutions/add')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Solution
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {userSolutions.map((solution) => (
            <div key={solution.id} className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-10 w-10 text-blue-600" />
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{solution.title}</h2>
                      <p className="text-sm text-gray-500">{solution.category}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    solution.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {solution.verified ? 'Verified' : 'Pending Review'}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {solution.activeUsers} active users
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {solution.rating} rating
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {solution.downloads} downloads
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Last updated {new Date(solution.lastUpdate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => navigate(`/marketplace/solutions/${solution.id}`)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/solutions/${solution.id}/edit`)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Solution
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Solutions;