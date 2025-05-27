import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: Record<string, any>;
  ip?: string;
  userAgent?: string;
  timestamp: string;
  status: 'success' | 'failure';
  errorDetails?: string;
}

interface AuditState {
  logs: AuditLog[];
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  getUserLogs: (userId: string) => AuditLog[];
  getLogsByAction: (action: string) => AuditLog[];
  getLogsByStatus: (status: AuditLog['status']) => AuditLog[];
  clearLogs: (userId: string) => void;
}

export const useAuditStore = create<AuditState>()(
  persist(
    (set, get) => ({
      logs: [],

      addLog: (log) => {
        const newLog: AuditLog = {
          ...log,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          logs: [...state.logs, newLog],
        }));
      },

      getUserLogs: (userId) => {
        return get().logs.filter((log) => log.userId === userId);
      },

      getLogsByAction: (action) => {
        return get().logs.filter((log) => log.action === action);
      },

      getLogsByStatus: (status) => {
        return get().logs.filter((log) => log.status === status);
      },

      clearLogs: (userId) => {
        set((state) => ({
          logs: state.logs.filter((log) => log.userId !== userId),
        }));
      },
    }),
    {
      name: 'audit-storage',
      partialize: (state) => ({
        logs: state.logs,
      }),
    }
  )
);