import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Conversation } from '../../../store/messageStore';
import { formatDistanceToNow } from 'date-fns';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  currentUserId: string;
  getParticipantInfo: (participantId: string) => {
    name: string;
    avatar: string;
  };
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
  getParticipantInfo
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  useEffect(() => {
    const filtered = conversations.filter(conversation => {
      const otherParticipantId = conversation.participants.find(id => id !== currentUserId) || '';
      const otherParticipant = getParticipantInfo(otherParticipantId);
      return otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredConversations(filtered);
  }, [searchTerm, conversations, currentUserId, getParticipantInfo]);

  return (
    <div className="border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(600px-73px)]">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'No conversations found' : 'No conversations yet'}
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const otherParticipantId = conversation.participants.find(id => id !== currentUserId);
            const otherParticipant = otherParticipantId ? getParticipantInfo(otherParticipantId) : null;
            
            if (!otherParticipant) return null;

            return (
              <button
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedId === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={otherParticipant.avatar}
                    alt={otherParticipant.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-900 truncate">
                        {otherParticipant.name}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && currentUserId !== conversation.participants[0] && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                        {conversation.unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;