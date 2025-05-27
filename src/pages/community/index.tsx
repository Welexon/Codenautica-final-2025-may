import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ForumCategories from '../../components/community/ForumCategories';
import TopicList from '../../components/community/TopicList';
import { useAuthStore } from '../../store/authStore';
import TopContributors from '../../components/community/TopContributors';
import PopularTags from '../../components/community/PopularTags';

const CommunityForum = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600">Connect with developers and businesses in the Nordic tech community</p>
        </div>
        {isAuthenticated && (
          <Link
            to="/community/new-topic"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Topic
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <ForumCategories />
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Topics</h2>
            <TopicList />
          </div>
        </div>

        <div className="space-y-6">
          <TopContributors />
          <PopularTags />
          
          {!isAuthenticated && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Join the Discussion</h2>
              <p className="text-gray-600 mb-4">
                Sign up to participate in discussions and connect with other members.
              </p>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;