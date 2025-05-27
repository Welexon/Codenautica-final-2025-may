import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Solution } from '../types/marketplace';
import { mockSolutions } from '../data/mockData';

interface SolutionState {
  solutions: Solution[];
  userSolutions: Solution[];
  loading: boolean;
  error: string | null;
  addSolution: (solution: Solution) => Promise<void>;
  updateSolution: (id: string, updates: Partial<Solution>) => Promise<void>;
  deleteSolution: (id: string) => Promise<void>;
  updateSolutionImage: (id: string, imageUrl: string) => Promise<void>;
  updateSolutionPrice: (id: string, price: number) => Promise<void>;
  getDeveloperSolutions: (developerId: string) => Solution[];
}

export const useSolutionStore = create<SolutionState>()(
  persist(
    (set, get) => ({
      solutions: mockSolutions,
      userSolutions: [],
      loading: false,
      error: null,

      addSolution: async (solution: Solution) => {
        try {
          set((state) => ({
            solutions: [...state.solutions, solution],
            userSolutions: [...state.userSolutions, solution],
          }));
        } catch (error) {
          console.error('Failed to add solution:', error);
          throw error;
        }
      },

      updateSolution: async (id: string, updates: Partial<Solution>) => {
        try {
          set((state) => ({
            solutions: state.solutions.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
            userSolutions: state.userSolutions.map((s) =>
              s.id === id ? { ...s, ...updates } : s
            ),
          }));
        } catch (error) {
          console.error('Failed to update solution:', error);
          throw error;
        }
      },

      deleteSolution: async (id: string) => {
        try {
          set((state) => ({
            solutions: state.solutions.filter((s) => s.id !== id),
            userSolutions: state.userSolutions.filter((s) => s.id !== id),
          }));
        } catch (error) {
          console.error('Failed to delete solution:', error);
          throw error;
        }
      },

      updateSolutionImage: async (id: string, imageUrl: string) => {
        try {
          set((state) => ({
            solutions: state.solutions.map((s) =>
              s.id === id ? { ...s, image: imageUrl } : s
            ),
            userSolutions: state.userSolutions.map((s) =>
              s.id === id ? { ...s, image: imageUrl } : s
            ),
          }));
        } catch (error) {
          console.error('Failed to update solution image:', error);
          throw error;
        }
      },

      updateSolutionPrice: async (id: string, price: number) => {
        try {
          set((state) => ({
            solutions: state.solutions.map((s) =>
              s.id === id ? { ...s, price } : s
            ),
            userSolutions: state.userSolutions.map((s) =>
              s.id === id ? { ...s, price } : s
            ),
          }));
        } catch (error) {
          console.error('Failed to update solution price:', error);
          throw error;
        }
      },

      getDeveloperSolutions: (developerId: string) => {
        return get().solutions.filter((s) => s.developer.id === developerId);
      },
    }),
    {
      name: 'solution-storage',
      partialize: (state) => ({
        solutions: state.solutions,
        userSolutions: state.userSolutions,
      }),
    }
  )
);