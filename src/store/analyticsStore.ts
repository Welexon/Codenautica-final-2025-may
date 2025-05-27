import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity } from './activityStore';

interface AnalyticsData {
  id: string;
  type: 'user_growth' | 'revenue' | 'solution_usage' | 'engagement';
  data: Record<string, any>;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  timestamp: string;
}

interface AnalyticsState {
  data: AnalyticsData[];
  addAnalytics: (data: Omit<AnalyticsData, 'id' | 'timestamp'>) => void;
  getAnalyticsByType: (type: AnalyticsData['type']) => AnalyticsData[];
  getAnalyticsByPeriod: (period: AnalyticsData['period']) => AnalyticsData[];
  processActivity: (activity: Activity) => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      data: [],

      addAnalytics: (analyticsData) => {
        const newData: AnalyticsData = {
          ...analyticsData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          data: [...state.data, newData],
        }));
      },

      getAnalyticsByType: (type) => {
        return get().data.filter((d) => d.type === type);
      },

      getAnalyticsByPeriod: (period) => {
        return get().data.filter((d) => d.period === period);
      },

      processActivity: (activity) => {
        // Process activity and generate analytics data
        const analyticsData = {
          type: 'engagement' as const,
          data: {
            activityType: activity.type,
            userId: activity.userId,
            details: activity.details,
          },
          period: 'daily' as const,
        };

        get().addAnalytics(analyticsData);
      },
    }),
    {
      name: 'analytics-storage',
      partialize: (state) => ({
        data: state.data,
      }),
    }
  )
);