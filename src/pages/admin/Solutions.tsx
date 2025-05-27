import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Solution } from '../../types/marketplace';
import { mockSolutions } from '../../data/mockData';

const AdminSolutions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // In a real app, fetch solutions from API
  const solutions = mockSolutions;

  const handleVerifySolution = async (solutionId: string) => {
    // Handle solution verification
  };

  const handleRejectSolution = async (solutionId: string) => {
    // Handle solution rejection
  };

  const handleDeleteSolution = async (solutionId: string) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;
    // Handle solution deletion
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solutions Management</h1>
          <p className="text-gray-600">Review and manage platform solutions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search solutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="operations">Operations</option>
          <option value="analytics">Analytics</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Solutions Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solution
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Developer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {solutions.map((solution) => (
              <tr key={solution.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {solution.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {solution.downloads} downloads
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {solution.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{solution.developer.name}</div>
                  <div className="text-sm text-gray-500">{solution.developer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    solution.verified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {solution.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  €{solution.price}
                  {solution.subscription && '/mo'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => navigate(`/marketplace/solutions/${solution.id}`)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {!solution.verified && (
                      <button
                        onClick={() => handleVerifySolution(solution.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleRejectSolution(solution.id)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSolution(solution.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSolutions;