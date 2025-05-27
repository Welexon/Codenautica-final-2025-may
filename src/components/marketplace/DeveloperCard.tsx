import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, ExternalLink, MessageCircle } from 'lucide-react';
import { Developer } from '../../types/marketplace';
import { ViewPermissions } from '../../types/auth';
import { useAuthStore } from '../../store/authStore';

interface DeveloperCardProps {
  developer: Developer;
  permissions: ViewPermissions;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, permissions }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleContact = () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnTo: `/developers/${developer.id}`,
          message: 'Please log in to contact developers.'
        }
      });
      return;
    }

    if (!permissions.canContact) {
      return;
    }

    navigate(`/messages/new?developer=${developer.id}`);
  };

  const handleViewProfile = () => {
    navigate(`/developers/${developer.id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <img
          src={developer.avatar}
          alt={developer.name}
          className="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{developer.name}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span>{developer.rating} rating</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total Sales</span>
          <span className="font-medium text-gray-900">{developer.totalSales}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Member Since</span>
          <span className="font-medium text-gray-900">
            {new Date(developer.joinedDate).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleContact}
          className="w-full bg-blue-700 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-800 transition-colors flex items-center justify-center"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {isAuthenticated ? 'Contact Developer' : 'Log in to Contact'}
        </button>
        
        <button
          onClick={handleViewProfile}
          className="w-full bg-white text-blue-700 border border-blue-700 rounded-lg px-4 py-3 font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
        >
          View Full Profile
          <ExternalLink className="ml-2 h-4 w-4" />
        </button>
      </div>

      {!isAuthenticated && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Log in to contact this developer and view more details
        </p>
      )}
    </div>
  );
};

export default DeveloperCard;