import React, { useEffect, useRef } from 'react';
import { Message } from '../../../store/messageStore';
import { formatDistanceToNow } from 'date-fns';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  getParticipantInfo: (participantId: string) => {
    name: string;
    avatar: string;
  };
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId,
  getParticipantInfo
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageGroup = (message: Message, isConsecutive: boolean) => {
    const isOwnMessage = message.senderId === currentUserId;
    const participant = getParticipantInfo(message.senderId);
    
    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} ${
          isConsecutive ? 'mt-1' : 'mt-4'
        }`}
      >
        {!isOwnMessage && !isConsecutive && (
          <img
            src={participant.avatar}
            alt={participant.name}
            className="h-8 w-8 rounded-full mr-2"
          />
        )}
        <div className={`flex flex-col ${!isOwnMessage && isConsecutive ? 'ml-10' : ''}`}>
          {!isConsecutive && (
            <span className="text-xs text-gray-500 mb-1">
              {isOwnMessage ? 'You' : participant.name}
            </span>
          )}
          <div
            className={`rounded-lg px-4 py-2 max-w-sm md:max-w-md break-words ${
              isOwnMessage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.content}
            <div className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const isConsecutive = prevMessage && 
            prevMessage.senderId === message.senderId &&
            new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 300000; // 5 minutes

          return renderMessageGroup(message, isConsecutive);
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;