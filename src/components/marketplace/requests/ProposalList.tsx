import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, DollarSign, Star } from 'lucide-react';

interface Proposal {
  id: string;
  developer: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    completedProjects: number;
  };
  budget: number;
  duration: string;
  coverLetter: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

interface ProposalListProps {
  proposals: Proposal[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const ProposalList: React.FC<ProposalListProps> = ({ proposals, onAccept, onReject }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={proposal.developer.avatar}
                alt={proposal.developer.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {proposal.developer.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{proposal.developer.rating} rating</span>
                  <span className="mx-2">•</span>
                  <span>{proposal.developer.completedProjects} projects completed</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onAccept(proposal.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Accept
              </button>
              <button
                onClick={() => onReject(proposal.id)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Decline
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{proposal.coverLetter}</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center text-gray-500">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>€{proposal.budget}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{proposal.duration}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <User className="h-5 w-5 mr-2" />
              <span>Submitted {new Date(proposal.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate(`/proposals/${proposal.id}`)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Full Proposal →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalList;