import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import RequestCard from '../../components/marketplace/requests/RequestCard';
import RequestFilters from '../../components/marketplace/requests/RequestFilters';
import { useRequestStore } from '../../store/requestStore';

const CustomRequests = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { requests, loading, error, fetchRequests } = useRequestStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 100000]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredRequests, setFilteredRequests] = useState(requests);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    let filtered = requests;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(request =>
        selectedSkills.every(skill =>
          request.skills.includes(skill)
        )
      );
    }

    // Apply budget filter
    filtered = filtered.filter(request => {
      const [min, max] = request.budget.split('-').map(num => parseInt(num.replace(/[^0-9]/g, '')));
      return min >= budgetRange[0] && max <= budgetRange[1];
    });

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, selectedSkills, budgetRange, statusFilter]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Requests</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => fetchRequests()}
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Requests</h1>
          <p className="text-gray-600">Browse and respond to custom project requests from businesses</p>
        </div>
        {user?.role === 'business' && (
          <button
            onClick={() => navigate('/post-request')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Request
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <RequestFilters
            selectedSkills={selectedSkills}
            onSkillsChange={setSelectedSkills}
            budgetRange={budgetRange}
            onBudgetChange={setBudgetRange}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests by title, skills, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Request List */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-white rounded-lg p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="space-y-6">
              {filteredRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  userRole={user?.role}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedSkills.length > 0
                  ? 'Try adjusting your search filters'
                  : 'No custom requests are currently available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomRequests;