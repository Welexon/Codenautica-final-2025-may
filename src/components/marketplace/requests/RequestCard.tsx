import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, MessageCircle, FileText, Users, Clock, ArrowRight } from 'lucide-react';
import { Request } from '../../../types/marketplace';
import { useAuthStore } from '../../../store/authStore';

interface RequestCardProps {
  request: Request;
  userRole?: 'business' | 'developer';
}

const RequestCard: React.FC<RequestCardProps> = ({ request, userRole }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleAction = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          returnTo: `/marketplace/requests/${request.id}`,
          message: 'Please log in to view request details and submit proposals.'
        }
      });
      return;
    }

    if (userRole === 'developer') {
      navigate(`/marketplace/requests/${request.id}/propose`);
    } else {
      navigate(`/marketplace/requests/${request.id}`);
    }
  };

  const formatBudget = (budget: string) => {
    const [min, max] = budget.split('-').map(num => 
      parseInt(num.replace(/[^0-9]/g, '')).toLocaleString()
    );
    return `€${min} - €${max}`;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={request.postedBy.avatar}
              alt={request.postedBy.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
              <p className="text-sm text-gray-500">Posted by {request.postedBy.name}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            request.status === 'open'
              ? 'bg-green-100 text-green-800'
              : request.status === 'in-progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {request.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-500">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>{formatBudget(request.budget)}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{formatDeadline(request.deadline)}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>{request.proposals} proposals</span>
          </div>
        </div>

        {/* Attachments */}
        {request.attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
            <div className="space-y-2">
              {request.attachments.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{file.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAction}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {userRole === 'developer' ? (
              <>
                Submit Proposal
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;