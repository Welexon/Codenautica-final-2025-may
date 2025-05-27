import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, Users, Clock, ArrowLeft, Plus } from 'lucide-react';
import TopicList from '../../components/community/TopicList';
import { useAuthStore } from '../../store/authStore';

const CategoryView = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isAuthenticated } = useAuthStore();

  // Mock category data - in real app, fetch based on categoryId
  const categories = {
    general: {
      name: 'General Discussion',
      description: 'General discussions about Nordic software development',
      topics: 234,
      posts: 1245,
      activeUsers: 567,
    },
    technical: {
      name: 'Technical Support',
      description: 'Get help with technical issues and implementation',
      topics: 567,
      posts: 2890,
      activeUsers: 789,
    },
    ideas: {
      name: 'Ideas & Feedback',
      description: 'Share your ideas and give feedback to others',
      topics: 123,
      posts: 789,
      activeUsers: 345,
    },
    help: {
      name: 'Help & Questions',
      description: 'Ask questions and get help from the community',
      topics: 345,
      posts: 1567,
      activeUsers: 678,
    },
    networking: {
      name: 'Networking',
      description: 'Connect with other developers and businesses',
      topics: 89,
      posts: 456,
      activeUsers: 234,
    },
    solutions: {
      name: 'Solutions',
      description: 'Discuss and share software solutions',
      topics: 432,
      posts: 2134,
      activeUsers: 567,
    },
    international: {
      name: 'International Markets',
      description: 'Expanding beyond the Nordic region',
      topics: 156,
      posts: 873,
      activeUsers: 321,
    },
    security: {
      name: 'Security & Compliance',
      description: 'Discussions about security, GDPR, and compliance',
      topics: 278,
      posts: 1432,
      activeUsers: 456,
    },
    innovation: {
      name: 'Innovation & Trends',
      description: 'Emerging technologies and industry trends',
      topics: 198,
      posts: 1056,
      activeUsers: 389,
    },
    learning: {
      name: 'Learning Resources',
      description: 'Share and discover learning materials',
      topics: 145,
      posts: 892,
      activeUsers: 276,
    },
    business: {
      name: 'Business Development',
      description: 'Growing your software business in the Nordic market',
      topics: 167,
      posts: 943,
      activeUsers: 312,
    }
  };

  const category = categoryId ? categories[categoryId as keyof typeof categories] : null;

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/community"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Community
        </Link>
        
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/community"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/community"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Community
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600 mb-6">{category.description}</p>
        
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>{category.topics} topics</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span>{category.activeUsers} active users</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>{category.posts} posts</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Topics in {category.name}</h2>
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

      <TopicList categoryId={categoryId} />
    </div>
  );
};

export default CategoryView;