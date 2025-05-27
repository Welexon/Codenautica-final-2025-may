import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import TopicPreview from './TopicPreview';
import { mockForumTopics } from '../../data/mockData';

interface TopicListProps {
  categoryId?: string;
}

const TopicList: React.FC<TopicListProps> = ({ categoryId }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Filter topics by category if provided
  const topics = categoryId 
    ? mockForumTopics.filter(topic => topic.category.toLowerCase() === categoryId.toLowerCase())
    : mockForumTopics || [];

  return (
    <div className="space-y-4">
      {topics.length > 0 ? (
        topics.map((topic) => (
          <TopicPreview key={topic.id} topic={topic} />
        ))
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600">No topics found in this category.</p>
        </div>
      )}

      {!isAuthenticated && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
          <p className="text-blue-700 mb-4">
            Join our community to participate in discussions and access full content
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicList;