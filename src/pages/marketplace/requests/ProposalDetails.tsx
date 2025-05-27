import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, Star, Download, MessageCircle } from 'lucide-react';

const ProposalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const proposal = {
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
    solution: 'Our proposed solution will utilize modern API integration techniques...',
    milestones: [
      {
        title: 'Initial Setup and Architecture',
        description: 'Set up project infrastructure and design system architecture',
        duration: '2 weeks',
        amount: 5000,
      },
      {
        title: 'Core Integration Development',
        description: 'Develop core integration features and APIs',
        duration: '4 weeks',
        amount: 12000,
      },
      {
        title: 'Testing and Deployment',
        description: 'Comprehensive testing and production deployment',
        duration: '2 weeks',
        amount: 8000,
      },
    ],
    attachments: [
      { name: 'Technical Proposal.pdf', size: '2.4 MB' },
      { name: 'Portfolio.pdf', size: '1.8 MB' },
    ],
    status: 'pending',
    submittedAt: '2024-03-15',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Proposals
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={proposal.developer.avatar}
                  alt={proposal.developer.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {proposal.developer.name}
                  </h1>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{proposal.developer.rating} rating</span>
                    <span className="mx-2">•</span>
                    <span>{proposal.developer.completedProjects} projects completed</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                proposal.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : proposal.status === 'accepted'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-500">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>€{proposal.budget}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{proposal.duration}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Submitted {new Date(proposal.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose prose-blue max-w-none mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Cover Letter</h2>
              <p className="text-gray-600">{proposal.coverLetter}</p>
            </div>

            <div className="prose prose-blue max-w-none mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Proposed Solution</h2>
              <p className="text-gray-600">{proposal.solution}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Milestones</h2>
              <div className="space-y-4">
                {proposal.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {milestone.title}
                      </h3>
                      <span className="text-lg font-medium text-gray-900">
                        €{milestone.amount}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{milestone.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{milestone.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h2>
              <div className="space-y-2">
                {proposal.attachments.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Download className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors">
                Accept Proposal
              </button>
              <button className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 font-medium hover:bg-gray-50 transition-colors">
                Decline Proposal
              </button>
              <button className="w-full flex items-center justify-center bg-white text-blue-700 border border-blue-700 rounded-lg px-4 py-3 font-medium hover:bg-blue-50 transition-colors">
                <MessageCircle className="h-5 w-5 mr-2" />
                Message Developer
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Developer Info</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">Member since</dt>
                  <dd className="text-sm font-medium text-gray-900">March 2022</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Response rate</dt>
                  <dd className="text-sm font-medium text-gray-900">98%</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Average response time</dt>
                  <dd className="text-sm font-medium text-gray-900">2 hours</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;