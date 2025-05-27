import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { MessageSquare, Eye, Clock } from 'lucide-react';

interface TopicPreviewProps {
  topic: {
    id: string;
    title: string;
    preview: string;
    category: string;
    author: {
      name: string;
      avatar: string;
    };
    replies: Array<{
      id: string;
      content: string;
      author: any;
      createdAt: string;
      votes: number;
    }>;
    views: number;
    lastReply: string;
    pinned: boolean;
  };
}

const TopicPreview: React.FC<TopicPreviewProps> = ({ topic }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/community/topics/${topic.id}`);
    } else {
      navigate('/login', {
        state: {
          returnTo: `/community/topics/${topic.id}`,
          message: 'Please log in to read the full topic and participate in discussions'
        }
      });
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={topic.author.avatar}
            alt={topic.author.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">{topic.title}</h3>
            <p className="text-sm text-gray-500">by {topic.author.name}</p>
          </div>
        </div>
        {topic.pinned && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Pinned
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{topic.preview}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            {topic.replies ? topic.replies.length : 0} replies
          </span>
          <span className="inline-flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {topic.views} views
          </span>
        </div>
        <span className="inline-flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {new Date(topic.lastReply).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TopicPreview;