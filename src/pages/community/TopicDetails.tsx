import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Flag, Share2, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import ReplyForm from '../../components/community/ReplyForm';
import ReplyList from '../../components/community/ReplyList';
import TopicVoteButton from '../../components/community/TopicVoteButton';
import { formatDistanceToNow } from 'date-fns';
import { mockForumTopics } from '../../data/mockData';

const TopicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Find the topic from mock data
  const topic = mockForumTopics.find(t => t.id === id);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h2>
          <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist or has been removed.</p>
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

  const handleReplySubmit = (content: string) => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnTo: `/community/topics/${id}`,
          message: 'Please log in to reply to topics.'
        }
      });
      return;
    }
    // Handle reply submission
    setShowReplyForm(false);
  };

  const handleVote = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          returnTo: `/community/topics/${id}`,
          message: 'Please log in to vote on topics.'
        }
      });
      return;
    }
    // Handle vote
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/community"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Community
      </Link>
      
      {/* Topic Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={topic.author.avatar}
              alt={topic.author.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h4 className="font-medium text-gray-900">{topic.author.name}</h4>
              <p className="text-sm text-gray-500">
                Posted {formatDistanceToNow(new Date(topic.createdAt))} ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {topic.category}
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{topic.title}</h1>
        <p className="text-gray-700 mb-6">{topic.content}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <TopicVoteButton
              votes={topic.views}
              userVoted={false}
              onVote={handleVote}
            />
            <button
              onClick={() => setShowReplyForm(true)}
              className="inline-flex items-center text-gray-700 hover:text-blue-600"
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>{topic.replies.length} replies</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-red-600">
              <Flag className="h-5 w-5" />
            </button>
            {user?.id === topic.author.id && (
              <>
                <button className="text-gray-500 hover:text-blue-600">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mb-6">
          <ReplyForm onSubmit={handleReplySubmit} onCancel={() => setShowReplyForm(false)} />
        </div>
      )}

      {/* Replies */}
      <ReplyList topicId={id || ''} />

      {!showReplyForm && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowReplyForm(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Reply to Topic
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicDetails;