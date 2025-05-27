import React from 'react';
import { ThumbsUp, Flag, Edit2, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';

interface ReplyListProps {
  topicId: string;
}

const ReplyList: React.FC<ReplyListProps> = ({ topicId }) => {
  const { user } = useAuthStore();

  // Mock replies data - in a real app, fetch from API
  const replies = [
    {
      id: '1',
      content: 'Great question! For Nordic markets, it\'s essential to consider GDPR compliance. I recommend implementing a comprehensive consent management system that covers all Nordic countries. Also, make sure to integrate with local payment providers like Klarna, Vipps, and MobilePay for the best user experience.',
      author: {
        id: '2',
        name: 'Sarah Engineer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'developer'
      },
      createdAt: '2024-03-11T14:30:00Z',
      votes: 15,
      userVoted: false
    },
    {
      id: '2',
      content: 'I\'ve worked with several Nordic e-commerce platforms, and I can confirm that payment integration is crucial. Each country has its preferred payment methods. For Norway, Vipps is essential. For Sweden, Swish and Klarna are must-haves. Finland relies heavily on bank transfers and MobilePay in Denmark is very popular. Make sure your solution supports all these options.',
      author: {
        id: '3',
        name: 'Marcus Jensen',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'developer'
      },
      createdAt: '2024-03-11T16:45:00Z',
      votes: 12,
      userVoted: false
    },
    {
      id: '3',
      content: 'Don\'t forget about shipping integrations! PostNord is the main carrier across the Nordic region, but there are country-specific options too. Also, make sure your address forms support the different postal code formats used in each country.',
      author: {
        id: '4',
        name: 'Emma Virtanen',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'developer'
      },
      createdAt: '2024-03-12T09:15:00Z',
      votes: 8,
      userVoted: false
    },
    {
      id: '4',
      content: 'Language support is another critical factor. While English is widely understood, having your platform available in local languages (Swedish, Norwegian, Danish, Finnish) will significantly improve user experience and conversion rates. Consider implementing a robust translation system.',
      author: {
        id: '6',
        name: 'Sofia Lindberg',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'developer'
      },
      createdAt: '2024-03-12T11:30:00Z',
      votes: 10,
      userVoted: false
    },
    {
      id: '5',
      content: 'From a security perspective, make sure you\'re compliant with both GDPR and the specific data protection regulations in each Nordic country. They generally follow GDPR but may have additional requirements. Also, implement strong fraud detection systems, especially for card payments.',
      author: {
        id: '10',
        name: 'Ingrid Johansen',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'developer'
      },
      createdAt: '2024-03-13T10:00:00Z',
      votes: 14,
      userVoted: false
    }
  ];

  return (
    <div className="space-y-6">
      {replies.map((reply) => (
        <div key={reply.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={reply.author.avatar}
                alt={reply.author.name}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-900">{reply.author.name}</h4>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(reply.createdAt))} ago
                </p>
              </div>
            </div>
            {user?.id === reply.author.id && (
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-blue-600">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-4">{reply.content}</p>

          <div className="flex items-center justify-between">
            <button
              className={`inline-flex items-center space-x-1 ${
                reply.userVoted ? 'text-blue-600' : 'text-gray-500'
              } hover:text-blue-600`}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{reply.votes}</span>
            </button>
            <button className="text-gray-500 hover:text-red-600">
              <Flag className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;