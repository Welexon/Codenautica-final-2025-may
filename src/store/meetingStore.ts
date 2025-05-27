import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'in-person';
  organizer: string;
  attendees: string[];
  status: 'scheduled' | 'cancelled' | 'completed';
  location?: string;
  meetingLink?: string;
}

interface MeetingState {
  meetings: Meeting[];
  scheduleMeeting: (meeting: Omit<Meeting, 'id'>) => Promise<void>;
  updateMeeting: (id: string, updates: Partial<Meeting>) => Promise<void>;
  cancelMeeting: (id: string) => Promise<void>;
  getUserMeetings: (userId: string) => Meeting[];
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set, get) => ({
      meetings: [],

      scheduleMeeting: async (meeting: Omit<Meeting, 'id'>) => {
        try {
          const newMeeting: Meeting = {
            ...meeting,
            id: uuidv4(),
          };

          set((state) => ({
            meetings: [...state.meetings, newMeeting],
          }));
        } catch (error) {
          console.error('Failed to schedule meeting:', error);
          throw error;
        }
      },

      updateMeeting: async (id: string, updates: Partial<Meeting>) => {
        try {
          set((state) => ({
            meetings: state.meetings.map((m) =>
              m.id === id ? { ...m, ...updates } : m
            ),
          }));
        } catch (error) {
          console.error('Failed to update meeting:', error);
          throw error;
        }
      },

      cancelMeeting: async (id: string) => {
        try {
          set((state) => ({
            meetings: state.meetings.map((m) =>
              m.id === id ? { ...m, status: 'cancelled' } : m
            ),
          }));
        } catch (error) {
          console.error('Failed to cancel meeting:', error);
          throw error;
        }
      },

      getUserMeetings: (userId: string) => {
        return get().meetings.filter(
          (m) =>
            m.organizer === userId || m.attendees.includes(userId)
        );
      },
    }),
    {
      name: 'meeting-storage',
      partialize: (state) => ({
        meetings: state.meetings,
      }),
    }
  )
);