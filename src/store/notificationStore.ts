import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  expiresAt?: string;
  action?: {
    label: string;
    url: string;
  };
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: (userId: string) => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  deleteExpiredNotifications: (userId: string) => Promise<void>;
  getUserNotifications: (userId: string) => Notification[];
  getUnreadCount: (userId: string) => number;
  fetchNotifications: (userId: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      loading: false,
      error: null,

      addNotification: async (notification) => {
        try {
          // Check if userId is a valid UUID
          if (!isValidUUID(notification.userId)) {
            // For mock data, create a mock notification
            const newNotification: Notification = {
              id: uuidv4(),
              userId: notification.userId,
              type: notification.type,
              title: notification.title,
              message: notification.message,
              read: false,
              timestamp: new Date().toISOString(),
              priority: notification.priority || 'normal',
              expiresAt: notification.expiresAt,
              action: notification.action
            };

            set((state) => ({
              notifications: [newNotification, ...state.notifications]
            }));
            return;
          }

          const { data, error } = await supabase
            .from('notifications')
            .insert([{
              user_id: notification.userId,
              type: notification.type,
              title: notification.title,
              message: notification.message,
              priority: notification.priority || 'normal',
              expires_at: notification.expiresAt,
              action_label: notification.action?.label,
              action_url: notification.action?.url,
              read: false
            }])
            .select()
            .single();

          if (error) throw error;

          const newNotification: Notification = {
            id: data.id,
            userId: data.user_id,
            type: data.type,
            title: data.title,
            message: data.message,
            read: false,
            timestamp: data.created_at,
            priority: data.priority,
            expiresAt: data.expires_at,
            action: data.action_label ? {
              label: data.action_label,
              url: data.action_url
            } : undefined
          };

          set((state) => ({
            notifications: [newNotification, ...state.notifications]
          }));
        } catch (error) {
          console.error('Failed to add notification:', error);
        }
      },

      markAsRead: async (notificationId: string) => {
        try {
          // For mock data, update locally
          if (!isValidUUID(notificationId)) {
            set(state => ({
              notifications: state.notifications.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
              )
            }));
            return;
          }

          const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId);

          if (error) throw error;

          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            )
          }));
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
        }
      },

      markAllAsRead: async (userId: string) => {
        try {
          // For mock data, update locally
          if (!isValidUUID(userId)) {
            set(state => ({
              notifications: state.notifications.map(n =>
                n.userId === userId ? { ...n, read: true } : n
              )
            }));
            return;
          }

          const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId);

          if (error) throw error;

          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.userId === userId ? { ...n, read: true } : n
            )
          }));
        } catch (error) {
          console.error('Failed to mark all notifications as read:', error);
        }
      },

      deleteNotification: async (notificationId: string) => {
        try {
          // For mock data, update locally
          if (!isValidUUID(notificationId)) {
            set(state => ({
              notifications: state.notifications.filter(n => n.id !== notificationId)
            }));
            return;
          }

          const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', notificationId);

          if (error) throw error;

          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== notificationId)
          }));
        } catch (error) {
          console.error('Failed to delete notification:', error);
        }
      },

      deleteExpiredNotifications: async (userId: string) => {
        try {
          // For mock data, update locally
          if (!isValidUUID(userId)) {
            const now = new Date().toISOString();
            set(state => ({
              notifications: state.notifications.filter(n => 
                n.userId !== userId || !n.expiresAt || new Date(n.expiresAt) > new Date(now)
              )
            }));
            return;
          }

          const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('user_id', userId)
            .lt('expires_at', new Date().toISOString());

          if (error) throw error;

          set((state) => ({
            notifications: state.notifications.filter((n) => 
              n.userId !== userId || !n.expiresAt || new Date(n.expiresAt) > new Date()
            )
          }));
        } catch (error) {
          console.error('Failed to delete expired notifications:', error);
        }
      },

      getUserNotifications: (userId: string) => {
        // Filter out expired notifications
        const now = new Date().toISOString();
        return get().notifications
          .filter((n) => n.userId === userId && (!n.expiresAt || new Date(n.expiresAt) > new Date(now)))
          .sort((a, b) => {
            // Sort by priority first
            const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
            const aPriority = a.priority ? priorityOrder[a.priority] : priorityOrder.normal;
            const bPriority = b.priority ? priorityOrder[b.priority] : priorityOrder.normal;
            
            if (aPriority !== bPriority) {
              return aPriority - bPriority;
            }
            
            // Then sort by timestamp (newest first)
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
      },

      getUnreadCount: (userId: string) => {
        // Count only unexpired notifications
        const now = new Date().toISOString();
        return get().notifications.filter(n => 
          n.userId === userId && 
          !n.read && 
          (!n.expiresAt || new Date(n.expiresAt) > new Date(now))
        ).length;
      },

      fetchNotifications: async (userId: string) => {
        set({ loading: true });
        try {
          // Check if userId is a valid UUID
          if (!isValidUUID(userId)) {
            // For mock data, create mock notifications
            const mockNotifications = createMockNotifications(userId);
            set({ 
              notifications: mockNotifications,
              loading: false
            });
            return;
          }

          const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('priority', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) throw error;

          if (data) {
            const formattedNotifications: Notification[] = data
              .filter(n => !n.expires_at || new Date(n.expires_at) > new Date())
              .map(n => ({
                id: n.id,
                userId: n.user_id,
                type: n.type as 'info' | 'success' | 'warning' | 'error',
                title: n.title,
                message: n.message,
                read: n.read,
                timestamp: n.created_at,
                priority: n.priority,
                expiresAt: n.expires_at,
                action: n.action_label ? {
                  label: n.action_label,
                  url: n.action_url
                } : undefined
              }));

            set({ notifications: formattedNotifications });
          }
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
          
          // Fallback to mock data
          const mockNotifications = createMockNotifications(userId);
          set({ 
            notifications: mockNotifications,
            error: 'Failed to fetch notifications from server, using mock data'
          });
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({
        notifications: state.notifications,
      }),
    }
  )
);

// Helper function to check if a string is a valid UUID
function isValidUUID(id: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// Helper function to create mock notifications
function createMockNotifications(userId: string): Notification[] {
  return [
    {
      id: uuidv4(),
      userId,
      type: 'info',
      title: 'Welcome to CodeNautica',
      message: 'Thank you for joining our platform. Explore our marketplace to find the perfect solutions for your business.',
      read: true,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'normal',
      action: {
        label: 'Explore Marketplace',
        url: '/marketplace'
      }
    },
    {
      id: uuidv4(),
      userId,
      type: 'success',
      title: 'Profile Completed',
      message: 'Your profile has been successfully completed. You can now access all features of the platform.',
      read: true,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'normal'
    },
    {
      id: uuidv4(),
      userId,
      type: 'info',
      title: 'New Solution Available',
      message: 'A new solution matching your interests has been added to the marketplace.',
      read: false,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      action: {
        label: 'View Solution',
        url: '/marketplace/solutions/00000000-0000-0000-0000-000000000101'
      }
    },
    {
      id: uuidv4(),
      userId,
      type: 'warning',
      title: 'Subscription Expiring',
      message: 'Your subscription will expire in 7 days. Please renew to continue using our services.',
      read: false,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'urgent',
      action: {
        label: 'Renew Subscription',
        url: '/settings/billing'
      }
    }
  ];
}

// Set up real-time notifications
supabase
  .channel('notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications'
    },
    (payload) => {
      const notification = payload.new;
      const formattedNotification: Notification = {
        id: notification.id,
        userId: notification.user_id,
        type: notification.type as 'info' | 'success' | 'warning' | 'error',
        title: notification.title,
        message: notification.message,
        read: notification.read,
        timestamp: notification.created_at,
        priority: notification.priority || 'normal',
        expiresAt: notification.expires_at,
        action: notification.action_label ? {
          label: notification.action_label,
          url: notification.action_url
        } : undefined
      };

      // Only add if not expired
      if (!notification.expires_at || new Date(notification.expires_at) > new Date()) {
        useNotificationStore.getState().notifications.unshift(formattedNotification);
      }
    }
  )
  .subscribe();