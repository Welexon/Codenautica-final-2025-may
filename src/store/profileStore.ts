import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { useActivityStore } from './activityStore';
import { useNotificationStore } from './notificationStore';

interface ProfileState {
  loading: boolean;
  error: string | null;
  uploadAvatar: (userId: string, file: File) => Promise<string>;
  updateProfile: (userId: string, data: any) => Promise<void>;
  updateSettings: (userId: string, settings: any) => Promise<void>;
  updateBillingInfo: (userId: string, billingInfo: any) => Promise<void>;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      loading: false,
      error: null,

      uploadAvatar: async (userId: string, file: File) => {
        set({ loading: true, error: null });
        try {
          console.log('Uploading avatar for user:', userId);
          // Create a unique file name
          const fileExt = file.name.split('.').pop();
          const fileName = `${userId}/${Date.now()}.${fileExt}`;

          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);

          // Update profile with new avatar URL
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              avatar: publicUrl,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          if (updateError) throw updateError;

          // We'll handle this through the auth state change listener

          // Log activity
          useActivityStore.getState().addActivity({
            userId,
            type: 'profile_update',
            details: {
              action: 'avatar_update',
              timestamp: new Date().toISOString()
            }
          });

          return publicUrl;
        } catch (error) {
          console.error('Failed to upload avatar:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (userId: string, data: any) => {
        set({ loading: true, error: null });
        try {
          console.log('Updating profile for user:', userId, 'with data:', data);
          const { error } = await supabase
            .from('profiles')
            .update({
              ...data,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          if (error) throw error;

          // The auth state change listener will update the user state

          // Log activity
          useActivityStore.getState().addActivity({
            userId,
            type: 'profile_update',
            details: {
              updates: Object.keys(data),
              timestamp: new Date().toISOString()
            }
          });

          // Send notification
          useNotificationStore.getState().addNotification({
            userId,
            type: 'success',
            title: 'Profile Updated',
            message: 'Your profile has been successfully updated.',
          });
        } catch (error) {
          console.error('Failed to update profile:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateSettings: async (userId: string, settings: any) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ 
              settings,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          if (error) throw error;

          // Log activity
          useActivityStore.getState().addActivity({
            userId,
            type: 'settings_update',
            details: {
              updates: Object.keys(settings),
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Failed to update settings:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateBillingInfo: async (userId: string, billingInfo: any) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ 
              billing: billingInfo,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);

          if (error) throw error;

          // Log activity
          useActivityStore.getState().addActivity({
            userId,
            type: 'billing_update',
            details: {
              updates: Object.keys(billingInfo),
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Failed to update billing info:', error);
          set({ error: handleSupabaseError(error).message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({
        error: state.error,
      }),
    }
  )
);