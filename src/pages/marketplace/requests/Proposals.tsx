import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProposalList from '../../../components/marketplace/requests/ProposalList';

const Proposals = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const proposals = [
    {
      id: '1',
      developer: {
        id: 'd1',
        name: 'John Developer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 4.8,
        completedProjects: 23,
      },
      budget: 25000,
      duration: '2-3 months',
      coverLetter: 'I have extensive experience in developing e-commerce integrations...',
      status: 'pending',
      submittedAt: '2024-03-15',
    },
    // Add more mock proposals
  ];

  const handleAccept = (proposalId: string) => {
    // Handle accepting proposal
    console.log('Accepting proposal:', proposalId);
  };

  const handleReject = (proposalId: string) => {
    // Handle rejecting proposal
    console.log('Rejecting proposal:', proposalId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(`/marketplace/requests/${id}`)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Request
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
        <p className="text-gray-600">Review and manage proposals for your project</p>
      </div>

      <ProposalList
        proposals={proposals}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default Proposals;