import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { useMessageStore } from '../../../store/messageStore';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message, Conversation } from '../../../store/messageStore';

const MessageCenter = () => {
  const { user } = useAuthStore();
  const { 
    messages,
    conversations,
    loading,
    error,
    sendMessage,
    markConversationAsRead,
    fetchMessages
  } = useMessageStore();
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchMessages(user.id);
    }
  }, [user, fetchMessages]);

  useEffect(() => {
    if (selectedConversation && user) {
      markConversationAsRead(selectedConversation, user.id);
    }
  }, [selectedConversation, user, markConversationAsRead]);

  if (!user) {
    navigate('/login', { 
      state: { 
        returnTo: '/messages',
        message: 'Please log in to access messages'
      }
    });
    return null;
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || !user) return;
    
    const [userId1, userId2] = selectedConversation.split('-');
    const receiverId = userId1 === user.id ? userId2 : userId1;
    
    try {
      await sendMessage(user.id, receiverId, content);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getParticipantInfo = (participantId: string) => {
    // In a real app, this would fetch user info from the database
    return {
      name: participantId === user.id ? 'You' : `User ${participantId}`,
      avatar: `https://ui-avatars.com/api/?name=${participantId}&background=random`
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-white rounded-lg shadow">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-white rounded-lg shadow">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-3 h-[600px]">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
          currentUserId={user.id}
          getParticipantInfo={getParticipantInfo}
        />

        <div className="col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200">
                {selectedConversation && (
                  <div className="flex items-center">
                    {(() => {
                      const [userId1, userId2] = selectedConversation.split('-');
                      const otherUserId = userId1 === user.id ? userId2 : userId1;
                      const otherUser = getParticipantInfo(otherUserId);
                      return (
                        <>
                          <img
                            src={otherUser.avatar}
                            alt={otherUser.name}
                            className="h-8 w-8 rounded-full mr-3"
                          />
                          <h2 className="font-medium text-gray-900">
                            {otherUser.name}
                          </h2>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>

              <MessageList 
                messages={messages.filter(msg => 
                  msg.senderId === user.id || msg.receiverId === user.id
                )} 
                currentUserId={user.id}
                getParticipantInfo={getParticipantInfo}
              />
              <MessageInput onSend={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;