import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Download, Users, Tag, ArrowUpRight } from 'lucide-react';
import { Solution } from '../../types/marketplace';
import { useAuthStore } from '../../store/authStore';

interface SolutionCardProps {
  solution: Solution;
  showActions?: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, showActions = true }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const handleAction = () => {
    navigate(`/marketplace/solutions/${solution.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={solution.image}
          alt={solution.title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{solution.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <Tag className="h-4 w-4 text-blue-700" />
          <span className="text-sm font-medium text-blue-700">{solution.category}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition-colors">
          {solution.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {solution.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              <span>{solution.downloads}+ downloads</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{solution.activeUsers}+ users</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center space-x-2">
            <img
              src={solution.developer.avatar}
              alt={solution.developer.name}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              {solution.developer.name}
            </span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            €{solution.price}
            {solution.subscription && <span className="text-sm text-gray-500">/mo</span>}
          </span>
        </div>
        
        {showActions && (
          <button
            onClick={handleAction}
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors"
          >
            View Details
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SolutionCard;