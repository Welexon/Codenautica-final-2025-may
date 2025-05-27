import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Star, Users, Edit, Trash2, Eye } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMarketplaceStore } from '../../store/marketplaceStore';

const SolutionList = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { solutions } = useMarketplaceStore();

  // Filter solutions for the current developer
  const mySolutions = solutions.filter(s => s.developer.id === user?.id);

  const handleEditSolution = (id: string) => {
    navigate(`/solutions/${id}/edit`);
  };

  const handleDeleteSolution = (id: string) => {
    if (window.confirm('Are you sure you want to delete this solution?')) {
      // Handle solution deletion
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Solutions</h2>
        <button
          onClick={() => navigate('/solutions/add')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Add New Solution
        </button>
      </div>

      {mySolutions.length === 0 ? (
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
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {mySolutions.map((solution) => (
              <li key={solution.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {solution.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            {solution.rating}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            {solution.activeUsers} users
                          </div>
                          <span className="text-sm text-gray-500">
                            €{solution.price}
                            {solution.subscription && '/mo'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/marketplace/solutions/${solution.id}`)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEditSolution(solution.id)}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSolution(solution.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SolutionList;