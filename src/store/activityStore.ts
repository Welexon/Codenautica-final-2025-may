import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Activity {
  id: string;
  userId: string;
  type: 'login' | 'register' | 'solution_create' | 'solution_update' | 'solution_delete' | 
        'message_send' | 'meeting_schedule' | 'meeting_cancel' | 'profile_update' | 
        'subscription_add' | 'subscription_cancel' | 'payment_process';
  details: Record<string, any>;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  getUserActivities: (userId: string) => Activity[];
  getActivitiesByType: (type: Activity['type']) => Activity[];
  clearActivities: (userId: string) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: uuidv4(),
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          activities: [...state.activities, newActivity],
        }));
      },

      getUserActivities: (userId: string) => {
        return get().activities.filter((a) => a.userId === userId);
      },

      getActivitiesByType: (type: Activity['type']) => {
        return get().activities.filter((a) => a.type === type);
      },

      clearActivities: (userId: string) => {
        set((state) => ({
          activities: state.activities.filter((a) => a.userId !== userId),
        }));
      },
    }),
    {
      name: 'activity-storage',
      partialize: (state) => ({
        activities: state.activities,
      }),
    }
  )
);