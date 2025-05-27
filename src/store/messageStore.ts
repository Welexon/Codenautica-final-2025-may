import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { useNotificationStore } from './notificationStore';
import { useActivityStore } from './activityStore';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface MessageState {
  messages: Message[];
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
  sendMessage: (senderId: string, receiverId: string, content: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  markConversationAsRead: (conversationId: string, userId: string) => Promise<void>;
  getConversation: (userId1: string, userId2: string) => Message[];
  getConversations: (userId: string) => Conversation[];
  deleteMessage: (messageId: string) => Promise<void>;
  getUnreadCount: (userId: string) => number;
  fetchMessages: (userId: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      messages: [],
      conversations: [],
      loading: false,
      error: null,

      fetchMessages: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          // Check if userId is a valid UUID
          if (!isValidUUID(userId)) {
            // For mock data, create mock messages
            const mockMessages = createMockMessages(userId);
            const mockConversations = createMockConversations(userId, mockMessages);
            
            set({
              messages: mockMessages,
              conversations: mockConversations,
              loading: false
            });
            return;
          }

          const { data, error } = await supabase
            .from('messages')
            .select(`
              id,
              sender_id,
              receiver_id,
              content,
              created_at,
              read
            `)
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });

          if (error) throw error;

          if (data) {
            const messages: Message[] = data.map(msg => ({
              id: msg.id,
              senderId: msg.sender_id,
              receiverId: msg.receiver_id,
              content: msg.content,
              timestamp: msg.created_at,
              read: msg.read
            }));

            // Build conversations from messages
            const conversationsMap = new Map<string, Conversation>();
            messages.forEach(msg => {
              const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
              const conversationId = [userId, otherUserId].sort().join('-');

              if (!conversationsMap.has(conversationId)) {
                conversationsMap.set(conversationId, {
                  id: conversationId,
                  participants: [userId, otherUserId],
                  lastMessage: msg.content,
                  timestamp: msg.timestamp,
                  unreadCount: msg.receiverId === userId && !msg.read ? 1 : 0
                });
              } else {
                const conversation = conversationsMap.get(conversationId)!;
                const msgTime = new Date(msg.timestamp).getTime();
                const convTime = new Date(conversation.timestamp).getTime();
                
                // Update last message if this one is newer
                if (msgTime > convTime) {
                  conversation.lastMessage = msg.content;
                  conversation.timestamp = msg.timestamp;
                }
                
                // Count unread messages
                if (msg.receiverId === userId && !msg.read) {
                  conversation.unreadCount++;
                }
              }
            });

            set({
              messages,
              conversations: Array.from(conversationsMap.values())
            });
          }
        } catch (error) {
          console.error('Failed to fetch messages:', error);
          
          // Fallback to mock data
          const mockMessages = createMockMessages(userId);
          const mockConversations = createMockConversations(userId, mockMessages);
          
          set({
            messages: mockMessages,
            conversations: mockConversations,
            error: 'Failed to fetch messages from server, using mock data'
          });
        } finally {
          set({ loading: false });
        }
      },

      sendMessage: async (senderId: string, receiverId: string, content: string) => {
        if (!content.trim()) {
          console.error('Message content cannot be empty');
          return;
        }
        
        set({ loading: true, error: null });
        try {
          // Check if both IDs are valid UUIDs
          if (!isValidUUID(senderId) || !isValidUUID(receiverId)) {
            // For mock data, create a mock message
            const newMessage: Message = {
              id: uuidv4(),
              senderId,
              receiverId,
              content,
              timestamp: new Date().toISOString(),
              read: false
            };

            // Update messages
            set(state => ({
              messages: [newMessage, ...state.messages]
            }));

            // Update conversations
            const conversationId = [senderId, receiverId].sort().join('-');
            set(state => {
              const existingConversation = state.conversations.find(c => c.id === conversationId);
              
              if (existingConversation) {
                return {
                  conversations: state.conversations.map(c =>
                    c.id === conversationId
                      ? {
                          ...c,
                          lastMessage: content,
                          timestamp: newMessage.timestamp,
                          unreadCount: c.unreadCount + 1
                        }
                      : c
                  )
                };
              } else {
                return {
                  conversations: [
                    {
                      id: conversationId,
                      participants: [senderId, receiverId],
                      lastMessage: content,
                      timestamp: newMessage.timestamp,
                      unreadCount: 1
                    },
                    ...state.conversations
                  ]
                };
              }
            });

            // Log activity
            useActivityStore.getState().addActivity({
              userId: senderId,
              type: 'message_send',
              details: {
                receiverId,
                messageId: newMessage.id
              }
            });

            // Send notification
            useNotificationStore.getState().addNotification({
              userId: receiverId,
              type: 'info',
              title: 'New Message',
              message: 'You have received a new message',
              priority: 'high',
              action: {
                label: 'View Message',
                url: '/messages'
              }
            });
            
            set({ loading: false });
            return;
          }

          const { data, error } = await supabase
            .from('messages')
            .insert([{
              sender_id: senderId,
              receiver_id: receiverId,
              content,
              read: false
            }])
            .select()
            .single();

          if (error) throw error;

          const newMessage: Message = {
            id: data.id,
            senderId: data.sender_id,
            receiverId: data.receiver_id,
            content: data.content,
            timestamp: data.created_at,
            read: false
          };

          // Update messages
          set(state => ({
            messages: [newMessage, ...state.messages]
          }));

          // Update conversations
          const conversationId = [senderId, receiverId].sort().join('-');
          set(state => {
            const existingConversation = state.conversations.find(c => c.id === conversationId);
            
            if (existingConversation) {
              return {
                conversations: state.conversations.map(c =>
                  c.id === conversationId
                    ? {
                        ...c,
                        lastMessage: content,
                        timestamp: data.created_at,
                        unreadCount: c.unreadCount + 1
                      }
                    : c
                )
              };
            } else {
              return {
                conversations: [
                  {
                    id: conversationId,
                    participants: [senderId, receiverId],
                    lastMessage: content,
                    timestamp: data.created_at,
                    unreadCount: 1
                  },
                  ...state.conversations
                ]
              };
            }
          });

          // Log activity
          useActivityStore.getState().addActivity({
            userId: senderId,
            type: 'message_send',
            details: {
              receiverId,
              messageId: data.id
            }
          });

          // Send notification
          useNotificationStore.getState().addNotification({
            userId: receiverId,
            type: 'info',
            title: 'New Message',
            message: 'You have received a new message',
            priority: 'high',
            action: {
              label: 'View Message',
              url: '/messages'
            }
          });
        } catch (error) {
          console.error('Failed to send message:', error);
          set({ error: handleSupabaseError(error).message });
        } finally {
          set({ loading: false });
        }
      },

      markAsRead: async (messageId: string) => {
        try {
          // For mock data, update locally
          if (!isValidUUID(messageId)) {
            set(state => ({
              messages: state.messages.map(msg =>
                msg.id === messageId ? { ...msg, read: true } : msg
              )
            }));
            return;
          }

          const { error } = await supabase
            .from('messages')
            .update({ read: true })
            .eq('id', messageId);

          if (error) throw error;

          set(state => ({
            messages: state.messages.map(msg =>
              msg.id === messageId ? { ...msg, read: true } : msg
            )
          }));
        } catch (error) {
          console.error('Failed to mark message as read:', error);
        }
      },

      markConversationAsRead: async (conversationId: string, userId: string) => {
        try {
          const [user1, user2] = conversationId.split('-');
          const otherUserId = user1 === userId ? user2 : user1;

          // For mock data, update locally
          if (!isValidUUID(userId) || !isValidUUID(otherUserId)) {
            set(state => {
              // Update messages
              const updatedMessages = state.messages.map(msg =>
                msg.receiverId === userId && msg.senderId === otherUserId
                  ? { ...msg, read: true }
                  : msg
              );
              
              // Update conversation unread count
              const updatedConversations = state.conversations.map(conv =>
                conv.id === conversationId
                  ? { ...conv, unreadCount: 0 }
                  : conv
              );
              
              return {
                messages: updatedMessages,
                conversations: updatedConversations
              };
            });
            return;
          }

          const { error } = await supabase
            .from('messages')
            .update({ read: true })
            .eq('sender_id', otherUserId)
            .eq('receiver_id', userId)
            .eq('read', false);

          if (error) throw error;

          set(state => {
            // Update messages
            const updatedMessages = state.messages.map(msg =>
              msg.receiverId === userId && msg.senderId === otherUserId
                ? { ...msg, read: true }
                : msg
            );
            
            // Update conversation unread count
            const updatedConversations = state.conversations.map(conv =>
              conv.id === conversationId
                ? { ...conv, unreadCount: 0 }
                : conv
            );
            
            return {
              messages: updatedMessages,
              conversations: updatedConversations
            };
          });
        } catch (error) {
          console.error('Failed to mark conversation as read:', error);
        }
      },

      getConversation: (userId1: string, userId2: string) => {
        return get().messages
          .filter(msg =>
            (msg.senderId === userId1 && msg.receiverId === userId2) ||
            (msg.senderId === userId2 && msg.receiverId === userId1)
          )
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      },

      getConversations: (userId: string) => {
        return get().conversations
          .filter(conv => conv.participants.includes(userId))
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },

      deleteMessage: async (messageId: string) => {
        try {
          // For mock data, update locally
          if (!isValidUUID(messageId)) {
            set(state => ({
              messages: state.messages.filter(msg => msg.id !== messageId)
            }));
            return;
          }

          const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', messageId);

          if (error) throw error;

          set(state => ({
            messages: state.messages.filter(msg => msg.id !== messageId)
          }));
        } catch (error) {
          console.error('Failed to delete message:', error);
        }
      },

      getUnreadCount: (userId: string) => {
        return get().messages.filter(msg => msg.receiverId === userId && !msg.read).length;
      }
    }),
    {
      name: 'message-storage',
      partialize: (state) => ({
        messages: state.messages,
        conversations: state.conversations,
      }),
    }
  )
);

// Helper function to check if a string is a valid UUID
function isValidUUID(id: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// Helper function to create mock messages for a user
function createMockMessages(userId: string): Message[] {
  // Create some mock messages between this user and other users
  const mockUsers = [
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003'
  ];
  
  const messages: Message[] = [];
  
  mockUsers.forEach(otherUserId => {
    // Skip if this is the current user
    if (otherUserId === userId) return;
    
    // Add some messages from the other user to this user
    for (let i = 0; i < 3; i++) {
      messages.push({
        id: uuidv4(),
        senderId: otherUserId,
        receiverId: userId,
        content: `This is message ${i+1} from user ${otherUserId} to you`,
        timestamp: new Date(Date.now() - (i * 3600000)).toISOString(), // Staggered times
        read: i > 0 // First message unread, others read
      });
    }
    
    // Add some messages from this user to the other user
    for (let i = 0; i < 2; i++) {
      messages.push({
        id: uuidv4(),
        senderId: userId,
        receiverId: otherUserId,
        content: `This is message ${i+1} from you to user ${otherUserId}`,
        timestamp: new Date(Date.now() - ((i+1) * 1800000)).toISOString(), // Staggered times
        read: true
      });
    }
  });
  
  // Sort by timestamp, newest first
  return messages.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

// Helper function to create mock conversations from messages
function createMockConversations(userId: string, messages: Message[]): Conversation[] {
  const conversationsMap = new Map<string, Conversation>();
  
  messages.forEach(msg => {
    const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
    const conversationId = [userId, otherUserId].sort().join('-');
    
    if (!conversationsMap.has(conversationId)) {
      conversationsMap.set(conversationId, {
        id: conversationId,
        participants: [userId, otherUserId],
        lastMessage: msg.content,
        timestamp: msg.timestamp,
        unreadCount: msg.receiverId === userId && !msg.read ? 1 : 0
      });
    } else {
      const conversation = conversationsMap.get(conversationId)!;
      const msgTime = new Date(msg.timestamp).getTime();
      const convTime = new Date(conversation.timestamp).getTime();
      
      // Update last message if this one is newer
      if (msgTime > convTime) {
        conversation.lastMessage = msg.content;
        conversation.timestamp = msg.timestamp;
      }
      
      // Count unread messages
      if (msg.receiverId === userId && !msg.read) {
        conversation.unreadCount++;
      }
    }
  });
  
  return Array.from(conversationsMap.values())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Set up real-time messages subscription
supabase
  .channel('messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages'
    },
    (payload) => {
      const message = payload.new;
      const newMessage: Message = {
        id: message.id,
        senderId: message.sender_id,
        receiverId: message.receiver_id,
        content: message.content,
        timestamp: message.created_at,
        read: message.read
      };

      const store = useMessageStore.getState();
      
      // Update messages
      store.messages = [newMessage, ...store.messages];

      // Update conversations
      const conversationId = [message.sender_id, message.receiver_id].sort().join('-');
      const existingConversation = store.conversations.find(c => c.id === conversationId);

      if (existingConversation) {
        store.conversations = store.conversations.map(c =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: message.content,
                timestamp: message.created_at,
                unreadCount: message.receiver_id === c.participants.find(p => p !== message.sender_id) 
                  ? c.unreadCount + 1 
                  : c.unreadCount
              }
            : c
        );
      } else {
        store.conversations = [
          {
            id: conversationId,
            participants: [message.sender_id, message.receiver_id],
            lastMessage: message.content,
            timestamp: message.created_at,
            unreadCount: 1
          },
          ...store.conversations
        ];
      }
    }
  )
  .subscribe();