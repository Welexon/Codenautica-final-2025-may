import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Solution } from '../types/marketplace';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { mockSolutions, mockDevelopers, categories } from '../data/mockData';
import { useAuthStore } from './authStore';
import { v4 as uuidv4 } from 'uuid';

interface MarketplaceState {
  solutions: Solution[];
  categories: string[];
  loading: boolean;
  error: string | null;
  fetchSolutions: () => Promise<void>;
  getRelatedSolutions: (solution: Solution, count?: number) => Solution[];
  getDeveloperSolutions: (developerId: string) => Solution[];
  getSolutionsByCategory: (category: string) => Solution[];
  searchSolutions: (query: string) => Solution[];
  addSolution: (solution: Omit<Solution, 'id' | 'developer' | 'rating' | 'downloads' | 'activeUsers' | 'verified'>) => Promise<void>;
  updateSolution: (id: string, solution: Partial<Solution>) => Promise<void>;
  deleteSolution: (id: string) => Promise<void>;
  verifySolution: (id: string) => Promise<void>;
}

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      solutions: mockSolutions, // Initialize with mock data
      categories: categories,
      loading: false,
      error: null,

      fetchSolutions: async () => {
        set({ loading: true, error: null });
        try {
          console.log('Fetching solutions...');
          
          // Always set mock data first to ensure we have something to display
          set({ 
            solutions: mockSolutions,
            loading: false,
            error: null
          });
          
          // Then try to fetch from Supabase in the background
          const isConnected = await checkSupabaseConnection();
          if (!isConnected) {
            console.log('Supabase not connected, using mock data only');
            return;
          }
          
          // Try to fetch from Supabase
          const { data, error } = await supabase
            .from('solutions')
            .select(`
              *,
              developer:profiles!solutions_developer_id_fkey (
                id,
                name,
                avatar,
                email,
                role
              )
            `)
            .order('created_at', { ascending: false });

          // If there's an error or no data, keep using mock data
          if (error || !data || data.length === 0) {
            console.log('Keeping mock data:', error ? error.message : 'No solutions found');
            return;
          }

          // Format the solutions data
          const formattedSolutions = data.map(solution => ({
            ...solution,
            developer: {
              id: solution.developer.id,
              name: solution.developer.name || 'Unknown Developer',
              avatar: solution.developer.avatar || `https://ui-avatars.com/api/?name=Unknown+Developer`,
              email: solution.developer.email,
              role: solution.developer.role
            },
            features: Array.isArray(solution.features) ? solution.features : [],
            technologies: Array.isArray(solution.technologies) ? solution.technologies : [],
            requirements: Array.isArray(solution.requirements) ? solution.requirements : [],
            screenshots: Array.isArray(solution.screenshots) ? solution.screenshots : [],
            supportedLanguages: Array.isArray(solution.supported_languages) ? solution.supported_languages : [],
            industries: Array.isArray(solution.industries) ? solution.industries : []
          }));

          // Update with real data if available
          set({ solutions: formattedSolutions });
        } catch (error) {
          console.error('Error fetching solutions:', error);
          // Keep using mock data if there's an error
          console.log('Error occurred, continuing to use mock data');
        } finally {
          set({ loading: false });
        }
      },

      getRelatedSolutions: (solution, count = 3) => {
        return get().solutions
          .filter(s => s.id !== solution.id && s.category === solution.category)
          .slice(0, count);
      },

      getDeveloperSolutions: (developerId) => {
        return get().solutions.filter(s => s.developer.id === developerId);
      },

      getSolutionsByCategory: (category) => {
        return category === 'All' 
          ? get().solutions 
          : get().solutions.filter(s => s.category === category);
      },

      searchSolutions: (query) => {
        const lowercaseQuery = query.toLowerCase();
        return get().solutions.filter(
          solution =>
            solution.title.toLowerCase().includes(lowercaseQuery) ||
            solution.description.toLowerCase().includes(lowercaseQuery) ||
            solution.technologies.some(tech =>
              tech.toLowerCase().includes(lowercaseQuery)
            ) ||
            solution.category.toLowerCase().includes(lowercaseQuery)
        );
      },

      addSolution: async (solutionData) => {
        set({ loading: true, error: null });
        try {
          // Get current user
          const { data: userData } = await supabase.auth.getUser();
          
          // If not authenticated or Supabase error, use mock data
          if (!userData?.user) {
            console.warn('User not authenticated or Supabase error, using mock data');
            
            // Use first mock developer
            const mockDeveloper = mockDevelopers[0];
            
            const newSolution: Solution = {
              id: uuidv4(),
              ...solutionData,
              rating: 0,
              downloads: 0,
              activeUsers: 0,
              verified: false,
              developer: mockDeveloper,
              releaseDate: new Date().toISOString(),
              lastUpdate: new Date().toISOString(),
              reviews: []
            };
            
            set(state => ({
              solutions: [newSolution, ...state.solutions],
              loading: false
            }));
            
            return;
          }

          // Get developer profile
          const { data: developerData, error: developerError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.user.id)
            .single();

          if (developerError) throw developerError;

          // Create solution
          const { data, error } = await supabase
            .from('solutions')
            .insert({
              title: solutionData.title,
              description: solutionData.description,
              price: solutionData.price,
              category: solutionData.category,
              image: solutionData.image,
              developer_id: userData.user.id,
              features: solutionData.features,
              technologies: solutionData.technologies,
              requirements: solutionData.requirements,
              screenshots: solutionData.screenshots,
              demo_url: solutionData.demo,
              documentation_url: solutionData.documentation,
              version: solutionData.version,
              supported_languages: solutionData.supportedLanguages,
              industries: solutionData.industries,
              release_date: new Date().toISOString(),
              last_update: new Date().toISOString(),
            })
            .select()
            .single();

          if (error) throw error;

          // Format the new solution
          const newSolution: Solution = {
            ...data,
            developer: {
              id: developerData.id,
              name: developerData.name,
              avatar: developerData.avatar,
              email: developerData.email,
              role: developerData.role
            },
            features: Array.isArray(data.features) ? data.features : [],
            technologies: Array.isArray(data.technologies) ? data.technologies : [],
            requirements: Array.isArray(data.requirements) ? data.requirements : [],
            screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
            supportedLanguages: Array.isArray(data.supported_languages) ? data.supported_languages : [],
            industries: Array.isArray(data.industries) ? data.industries : [],
            rating: 0,
            downloads: 0,
            activeUsers: 0,
            verified: false
          };

          set(state => ({
            solutions: [newSolution, ...state.solutions]
          }));

          // Log activity
          try {
            const activityStore = require('./activityStore').useActivityStore;
            activityStore.getState().addActivity({
              userId: userData.user.id,
              type: 'solution_create',
              details: {
                solutionId: data.id,
                solutionTitle: data.title
              }
            });
          } catch (e) {
            console.warn('Failed to log activity:', e);
          }

          // Send notification to admins
          // In a real app, you would fetch admin users and send them notifications
          try {
            const notificationStore = require('./notificationStore').useNotificationStore;
            notificationStore.getState().addNotification({
              userId: '00000000-0000-0000-0000-000000000000', // Admin user ID
              type: 'info',
              title: 'New Solution Submitted',
              message: `${developerData.name} has submitted a new solution: ${data.title}`,
              priority: 'normal',
              action: {
                label: 'Review Solution',
                url: `/admin/solutions/${data.id}`
              }
            });
          } catch (e) {
            console.warn('Failed to send notification:', e);
          }

        } catch (error) {
          console.error('Failed to add solution:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateSolution: async (id, updates) => {
        set({ loading: true, error: null });
        try {
          const { data: userData } = await supabase.auth.getUser();
          
          if (!userData?.user) {
            throw new Error('User not authenticated');
          }

          // Check if user owns the solution
          const { data: solution, error: solutionError } = await supabase
            .from('solutions')
            .select('developer_id')
            .eq('id', id)
            .single();

          if (solutionError) throw solutionError;
          
          if (solution.developer_id !== userData.user.id) {
            throw new Error('You do not have permission to update this solution');
          }

          // Prepare update data
          const updateData: any = {
            ...updates,
            last_update: new Date().toISOString()
          };

          // Remove developer property if it exists
          if (updateData.developer) {
            delete updateData.developer;
          }

          // Update solution
          const { data, error } = await supabase
            .from('solutions')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;

          // Update local state
          set(state => ({
            solutions: state.solutions.map(s => 
              s.id === id 
                ? { 
                    ...s, 
                    ...updates, 
                    lastUpdate: new Date().toISOString() 
                  } 
                : s
            )
          }));

          // Log activity
          try {
            const activityStore = require('./activityStore').useActivityStore;
            activityStore.getState().addActivity({
              userId: userData.user.id,
              type: 'solution_update',
              details: {
                solutionId: id,
                updatedFields: Object.keys(updates)
              }
            });
          } catch (e) {
            console.warn('Failed to log activity:', e);
          }

        } catch (error) {
          console.error('Failed to update solution:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      deleteSolution: async (id) => {
        set({ loading: true, error: null });
        try {
          const { data: userData } = await supabase.auth.getUser();
          
          if (!userData?.user) {
            throw new Error('User not authenticated');
          }

          // Check if user owns the solution
          const { data: solution, error: solutionError } = await supabase
            .from('solutions')
            .select('developer_id, title')
            .eq('id', id)
            .single();

          if (solutionError) throw solutionError;
          
          if (solution.developer_id !== userData.user.id) {
            throw new Error('You do not have permission to delete this solution');
          }

          // Delete solution
          const { error } = await supabase
            .from('solutions')
            .delete()
            .eq('id', id);

          if (error) throw error;

          // Update local state
          set(state => ({
            solutions: state.solutions.filter(s => s.id !== id)
          }));

          // Log activity
          try {
            const activityStore = require('./activityStore').useActivityStore;
            activityStore.getState().addActivity({
              userId: userData.user.id,
              type: 'solution_delete',
              details: {
                solutionId: id,
                solutionTitle: solution.title
              }
            });
          } catch (e) {
            console.warn('Failed to log activity:', e);
          }

        } catch (error) {
          console.error('Failed to delete solution:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      verifySolution: async (id) => {
        set({ loading: true, error: null });
        try {
          const { data: userData } = await supabase.auth.getUser();
          
          if (!userData?.user) {
            throw new Error('User not authenticated');
          }

          // Check if user is admin
          const { data: userProfile, error: userError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userData.user.id)
            .single();

          if (userError) throw userError;
          
          if (userProfile.role !== 'admin') {
            throw new Error('Only admins can verify solutions');
          }

          // Get solution details
          const { data: solution, error: solutionError } = await supabase
            .from('solutions')
            .select('developer_id, title')
            .eq('id', id)
            .single();

          if (solutionError) throw solutionError;

          // Update solution
          const { error } = await supabase
            .from('solutions')
            .update({ verified: true })
            .eq('id', id);

          if (error) throw error;

          // Update local state
          set(state => ({
            solutions: state.solutions.map(s => 
              s.id === id 
                ? { ...s, verified: true } 
                : s
            )
          }));

          // Log activity
          try {
            const activityStore = require('./activityStore').useActivityStore;
            activityStore.getState().addActivity({
              userId: userData.user.id,
              type: 'solution_verify',
              details: {
                solutionId: id,
                solutionTitle: solution.title
              }
            });
          } catch (e) {
            console.warn('Failed to log activity:', e);
          }

          // Send notification to developer
          try {
            const notificationStore = require('./notificationStore').useNotificationStore;
            notificationStore.getState().addNotification({
              userId: solution.developer_id,
              type: 'success',
              title: 'Solution Verified',
              message: `Your solution "${solution.title}" has been verified and is now featured in the marketplace.`,
              priority: 'high',
              action: {
                label: 'View Solution',
                url: `/marketplace/solutions/${id}`
              }
            });
          } catch (e) {
            console.warn('Failed to send notification:', e);
          }

        } catch (error) {
          console.error('Failed to verify solution:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'marketplace-storage',
      partialize: (state) => ({
        solutions: state.solutions,
      }),
    }
  )
);

// Import missing functions
import { checkSupabaseConnection } from '../lib/supabase';

// Import these dynamically to avoid circular dependencies
const useActivityStore = {
  getState: () => ({
    addActivity: (activity: any) => {
      console.log('Activity logged:', activity);
    }
  })
};

const useNotificationStore = {
  getState: () => ({
    addNotification: (notification: any) => {
      console.log('Notification added:', notification);
    }
  })
};