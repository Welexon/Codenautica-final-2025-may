import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, RegisterData, User } from '../types/auth';
import { supabase, checkSupabaseConnection } from '../lib/supabase';

interface ExtendedAuthState extends AuthState {
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateSettings: (settings: Partial<User['settings']>) => Promise<void>;
  updateBilling: (billing: Partial<User['billing']>) => Promise<void>;
  addSubscription: (solutionId: string) => Promise<void>;
  removeSubscription: (solutionId: string) => Promise<void>;
  updateUser: (userId: string, data: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  suspendUser: (userId: string) => Promise<void>;
  activateUser: (userId: string) => Promise<void>;
}

// Helper function to format user data from Supabase
const formatUserData = (userData: any): User => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name || '',
    role: userData.role || 'business',
    avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=3B82F6&color=fff`,
    bio: userData.bio || '',
    company: userData.company || '',
    location: userData.location || '',
    website: userData.website || '',
    status: userData.status || 'active',
    settings: userData.settings || {
      notifications: true,
      emailUpdates: true,
      twoFactorEnabled: false
    },
    billing: userData.billing || {
      plan: 'starter',
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    skills: userData.skills || [],
    languages: userData.languages || [],
    certifications: userData.certifications || [],
    subscriptions: userData.subscriptions || []
  };
};

// Helper function to fetch profile with retries
async function fetchProfileWithRetry(userId: string, maxRetries = 3, delayMs = 500): Promise<User | null> {
  console.log(`Starting profile fetch for user ${userId} with ${maxRetries} retries and ${delayMs}ms delay`);
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Profile fetch attempt ${attempt}/${maxRetries}`);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error(`Profile fetch attempt ${attempt} failed:`, error.message);
        if (attempt === maxRetries) throw error;
        console.log(`Waiting ${delayMs}ms before retry attempt ${attempt + 1}...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }

      console.log('Profile fetch successful for user:', userId);
      return profile as User;
    } catch (error) {
      console.error(`Profile fetch attempt ${attempt} failed with exception:`, error);
      if (attempt === maxRetries) throw error;
      console.log(`Waiting ${delayMs}ms before retry attempt ${attempt + 1}...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return null;
}

export const useAuthStore = create<ExtendedAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      isAdmin: () => get().user?.role === 'admin',

      login: async (email: string, password: string) => {
        try {
          console.log(`Attempting to sign in with email: ${email} at ${new Date().toISOString()}`);

          // Check Supabase connection first
          const isConnected = await checkSupabaseConnection();
          if (!isConnected) {
            throw new Error('Unable to connect to the database. Please try again later.');
          }

          // Attempt to sign in
          console.log('Calling supabase.auth.signInWithPassword...');
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (error) {
            console.error('Sign in error:', error.message);
            if (error.message === 'Invalid login credentials') {
              throw new Error('Incorrect email or password. Please try again.');
            } else if (error.message.includes('Email not confirmed')) {
              throw new Error('Please verify your email address before logging in.');
            } else {
              throw new Error(`Login failed: ${error.message}`);
            }
          }
          
          if (!data.user) {
            console.error('No user data returned from signInWithPassword');
            throw new Error('Connection to the server failed. Please try again later.');
          }
          
          console.log('User authenticated successfully, fetching profile...');
          
          // Fetch profile with retry mechanism
          let profile = await fetchProfileWithRetry(data.user.id, 5, 1000);
          
          if (!profile) {
            console.error('Profile not found after multiple attempts');
            
            // Try to create profile manually as a fallback
            console.log('Attempting to create profile manually');
            try {
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert([{
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata.name || 'User',
                  role: data.user.user_metadata.role || 'business',
                  avatar: data.user.user_metadata.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.user_metadata.name || 'User')}&background=3B82F6&color=fff`,
                  status: 'active',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }])
                .select();
              
              if (createError) {
                console.error('Failed to create profile manually:', createError);
                throw new Error('Failed to create user profile. Please try again.');
              }
              
              console.log('Profile created manually');
              if (newProfile && newProfile.length > 0) {
                profile = newProfile[0];
              } else {
                throw new Error('Failed to create user profile. Please try again.');
              }
            } catch (createError) {
              console.error('Error creating profile manually:', createError);
              throw new Error('Failed to load or create user profile. Please try again.');
            }
          }

          if (profile.status === 'suspended') {
            throw new Error('This account has been suspended. Please contact support.');
          }

          try {
            // Update last login time in the background
            await supabase
              .from('profiles')
              .update({ 
                last_login: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('id', data.user.id);
          } catch (updateError) {
            console.warn('Failed to update last login time:', updateError);
          }

          const formattedUser = formatUserData(profile);
          console.log('Setting user state:', formattedUser.id, formattedUser.role);
          
          // Set user state
          set({ 
            user: formattedUser, 
            isAuthenticated: true 
          });
          
          console.log('Login completed successfully');
          
          // Force a page reload to ensure the session is properly established
          setTimeout(() => {
            if (window.location.pathname === '/login') {
              window.location.href = '/dashboard';
            }
          }, 100);
          
          return;
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          console.log(`Starting registration process for: ${data.email} with role: ${data.role}`);

          // Check Supabase connection first
          const isConnected = await checkSupabaseConnection();
          if (!isConnected) {
            throw new Error('Unable to connect to the database. Please try again later.');
          }
          
          // Step 1: Prepare user metadata with proper role
          const role = typeof data.role === 'string' ? data.role : 'business';
          const userMetadata = {
            name: data.name,
            role: role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=3B82F6&color=fff`
          };

          console.log('User metadata prepared:', userMetadata);

          // Step 2: Sign up the user with Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email.trim(),
            password: data.password.trim(),
            options: {
              data: userMetadata,
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
          });

          if (authError) {
            console.error('Auth signup error:', authError.message);
            throw new Error(authError.message);
          }

          if (!authData.user) {
            throw new Error('Failed to create user account');
          }

          console.log('User created in auth system with ID:', authData.user.id);

          // Step 3: Wait for profile creation trigger
          console.log('Waiting for profile creation trigger to complete...');
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Step 4: Check if profile was created by trigger
          let profile;
          let profileError;
          
          for (let attempt = 1; attempt <= 3; attempt++) {
            console.log(`Checking for profile creation, attempt ${attempt}/3`);
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authData.user.id)
              .single();
              
            if (data) {
              profile = data;
              break;
            }
            
            profileError = error;
            
            if (attempt < 3) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }

          if (profileError || !profile) {
            console.log('Profile not created by trigger, creating manually');
            
            // Step 5: Create profile manually if trigger failed
            const profileData = {
              id: authData.user.id,
              email: data.email,
              name: data.name || 'New User',
              role: data.role,
              avatar: userMetadata.avatar,
              status: 'active',
              settings: {
                notifications: true,
                emailUpdates: true,
                twoFactorEnabled: false
              },
              billing: {
                plan: 'starter'
              },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };

            console.log('Creating profile manually with data:', profileData);
            const { data: newProfiles, error: insertError } = await supabase
              .from('profiles')
              .insert([profileData])
              .select();

            if (insertError) {
              console.error('Manual profile creation error:', insertError);
              throw new Error('Failed to create user profile. Please try again.');
            } else {
              console.log('Profile created manually:', newProfiles?.[0]?.id);
              set({ 
                user: newProfiles && newProfiles.length > 0 ? formatUserData(newProfiles[0]) : null, 
                isAuthenticated: true
              });
            }
          } else {
            console.log('Profile created by trigger:', profile.id);
            set({ 
              user: formatUserData(profile), 
              isAuthenticated: true
            });
          }
          
          // Step 6: Sign in the user to create a session
          console.log('Signing in the user to create a session');
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.email.trim(),
            password: data.password.trim()
          });
          
          if (signInError) {
            console.error('Error signing in after registration:', signInError);
            // Continue anyway since the account was created
          } else {
            console.log('User signed in successfully after registration', signInData.session ? 'with session' : 'without session');
            
            // Force a redirect to ensure the session is properly established
            console.log('Redirecting to onboarding page');
            setTimeout(() => {
              window.location.href = '/onboarding';
            }, 100);
          }
          
          console.log('User registration completed successfully');
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          console.log('Starting logout process');
          // First clear the local state to ensure UI updates immediately
          set({ user: null, isAuthenticated: false });
          console.log('Local state cleared, user logged out in UI');

          // Then sign out from Supabase
          try {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.error('Supabase signOut error:', error);
              // We've already cleared the local state, so just log the error
            } else {
              console.log('Supabase signOut successful');
            }
          } catch (signOutError) {
            console.error('Exception during Supabase signOut:', signOutError);
            // We've already cleared the local state, so just log the error
          }
        } catch (error) {
          console.error('Error during logout:', error);
          // Make absolutely sure the state is reset even if there's an error
          set({ user: null, isAuthenticated: false });
        }
        console.log('Logout process complete');
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          const currentUser = get().user;
          if (!currentUser) {
            console.error('No user logged in');
            throw new Error('No user logged in');
          }

          console.log('Updating profile with data:', data);
          // Convert array fields to JSONB for Supabase
          const supabaseData: any = { ...data };
          
          // Handle nested objects
          if (data.billingAddress) supabaseData.billing_address = data.billingAddress;

          // Map camelCase to snake_case for specific fields
          if (data.hourlyRate !== undefined) supabaseData.hourly_rate = data.hourlyRate;
          if (data.githubUrl !== undefined) supabaseData.github_url = data.githubUrl;
          if (data.linkedinUrl !== undefined) supabaseData.linkedin_url = data.linkedinUrl;
          if (data.completedProjects !== undefined) supabaseData.completed_projects = data.completedProjects;
          if (data.activeProjects !== undefined) supabaseData.active_projects = data.activeProjects;
          if (data.companySize !== undefined) supabaseData.company_size = data.companySize;
          if (data.taxId !== undefined) supabaseData.tax_id = data.taxId;
          if (data.billingEmail !== undefined) supabaseData.billing_email = data.billingEmail;

          // Add updated_at timestamp
          supabaseData.updated_at = new Date().toISOString();

          console.log('Sending update to Supabase:', supabaseData);
          const { data: updatedProfile, error } = await supabase
            .from('profiles')
            .update(supabaseData)
            .eq('id', currentUser.id)
            .select()
            .single();

          if (error) {
            console.error('Supabase update error:', error);
            throw error;
          }
          
          console.log('Profile updated successfully:', updatedProfile);

          // Convert snake_case back to camelCase for specific fields
          const updatedUser = { ...currentUser, ...updatedProfile };
          if (updatedProfile.hourly_rate !== undefined) updatedUser.hourlyRate = updatedProfile.hourly_rate;
          if (updatedProfile.github_url !== undefined) updatedUser.githubUrl = updatedProfile.github_url;
          if (updatedProfile.linkedin_url !== undefined) updatedUser.linkedinUrl = updatedProfile.linkedin_url;
          if (updatedProfile.completed_projects !== undefined) updatedUser.completedProjects = updatedProfile.completed_projects;
          if (updatedProfile.active_projects !== undefined) updatedUser.activeProjects = updatedProfile.active_projects;
          if (updatedProfile.company_size !== undefined) updatedUser.companySize = updatedProfile.company_size;
          if (updatedProfile.tax_id !== undefined) updatedUser.taxId = updatedProfile.tax_id;
          if (updatedProfile.billing_email !== undefined) updatedUser.billingEmail = updatedProfile.billing_email;
          if (updatedProfile.billing_address !== undefined) updatedUser.billingAddress = updatedProfile.billing_address;

          const formattedUser = formatUserData(updatedUser);
          console.log('Setting updated user state:', formattedUser);
          set({ user: formattedUser });
        } catch (error) {
          console.error('Profile update failed:', error);
          throw error;
        }
      },

      updateSettings: async (settings: Partial<User['settings']>) => {
        try {
          const currentUser = get().user;
          if (!currentUser) {
            console.error('No user logged in');
            throw new Error('No user logged in');
          }

          console.log('Updating settings:', settings);
          const updatedSettings = { ...currentUser.settings, ...settings };

          // Convert to JSONB for Supabase
          const { data, error } = await supabase
            .from('profiles')
            .update({
              settings: updatedSettings,
              updated_at: new Date().toISOString()
            })
            .eq('id', currentUser.id)
            .select()
            .single();

          if (error) {
            console.error('Supabase settings update error:', error);
            throw error;
          }

          console.log('Settings updated successfully');
          set({ user: { ...currentUser, settings: updatedSettings } as User });
        } catch (error) {
          console.error('Settings update failed:', error);
          throw error;
        }
      },

      updateBilling: async (billing: Partial<User['billing']>) => {
        try {
          const currentUser = get().user;
          if (!currentUser) throw new Error('No user logged in');

          const updatedBilling = { ...currentUser.billing, ...billing };

          // Convert to JSONB for Supabase
          const { data: updatedUser, error } = await supabase
            .from('profiles')
            .update({
              billing: updatedBilling,
              updated_at: new Date().toISOString()
            })
            .eq('id', currentUser.id)
            .select()
            .single();

          if (error) throw error;

          set({ user: { ...currentUser, billing: updatedBilling } as User });
        } catch (error) {
          console.error('Billing update failed:', error);
          throw error;
        }
      },

      addSubscription: async (solutionId: string) => {
        try {
          const currentUser = get().user;
          if (!currentUser) throw new Error('No user logged in');

          // Update user subscriptions
          const updatedUser = { 
            ...currentUser, 
            subscriptions: [...(currentUser.subscriptions || []), solutionId] 
          };
          set({ user: updatedUser });
        } catch (error) {
          console.error('Add subscription failed:', error);
          throw error;
        }
      },

      removeSubscription: async (solutionId: string) => {
        try {
          const currentUser = get().user;
          if (!currentUser) throw new Error('No user logged in');

          // Update user subscriptions
          const updatedUser = { 
            ...currentUser, 
            subscriptions: currentUser.subscriptions?.filter(id => id !== solutionId) || [] 
          };
          set({ user: updatedUser });
        } catch (error) {
          console.error('Remove subscription failed:', error);
          throw error;
        }
      },

      updateUser: async (userId: string, data: Partial<User>) => {
        try {
          const currentUser = get().user;
          if (!currentUser?.permissions?.canManageUsers && currentUser?.id !== userId) {
            throw new Error('Unauthorized');
          }

          const { data: updatedUser, error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', userId)
            .select()
            .single();

          if (error) throw error;

          if (currentUser.id === userId) {
            set({ user: { ...currentUser, ...updatedUser } as User });
          }
        } catch (error) {
          console.error('Update user failed:', error);
          throw error;
        }
      },

      deleteUser: async (userId: string) => {
        try {
          const currentUser = get().user;
          if (!currentUser?.permissions?.canManageUsers) {
            throw new Error('Unauthorized');
          }

          // Delete user from auth
          const { error } = await supabase.auth.admin.deleteUser(userId);
          if (error) throw error;
        } catch (error) {
          console.error('Delete user failed:', error);
          throw error;
        }
      },

      suspendUser: async (userId: string) => {
        try {
          const currentUser = get().user;
          if (!currentUser?.permissions?.canManageUsers) {
            throw new Error('Unauthorized');
          }

          // Update user status
          const { error } = await supabase
            .from('profiles')
            .update({ status: 'suspended' })
            .eq('id', userId);

          if (error) throw error;
        } catch (error) {
          console.error('Suspend user failed:', error);
          throw error;
        }
      },

      activateUser: async (userId: string) => {
        try {
          const currentUser = get().user;
          if (!currentUser?.permissions?.canManageUsers) {
            throw new Error('Unauthorized');
          }

          // Update user status
          const { error } = await supabase
            .from('profiles')
            .update({ status: 'active' })
            .eq('id', userId);

          if (error) throw error;
        } catch (error) {
          console.error('Activate user failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Set up auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log(`Auth state changed: ${event} at ${new Date().toISOString()} with session:`, session ? 'Session exists' : 'No session');

  if (event === 'SIGNED_IN' && session?.user) {
    console.log(`Auth state changed: SIGNED_IN, user: ${session.user.id}`);
    try {
      console.log('Fetching profile after sign-in event...');
      // Use the fetchProfileWithRetry function with increased retries
      const profile = await fetchProfileWithRetry(session.user.id, 5, 1000);
      
      if (profile) {
        console.log('Profile loaded successfully in auth state change');
        
        // Update the auth store state
        useAuthStore.setState({ 
          user: formatUserData(profile), 
          isAuthenticated: true 
        });

        // Update last login time
        try {
          await supabase
            .from('profiles')
            .update({ 
              last_login: new Date().toISOString()
            })
            .eq('id', profile.id);
            
          // Check if we're on the login page and should redirect
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/register' || currentPath === '/') {
            console.log('On login/register page after sign-in, redirecting to dashboard');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 100);
          }
        } catch (updateError) {
          console.warn('Failed to update last login time:', updateError);
        }
      } else {
        console.error('Failed to load profile after sign in');
      }
    } catch (error) {
      console.error('Error in auth state change handler:', error);
    }
  } else if (event === 'SIGNED_OUT') {
    console.log('Auth state changed: SIGNED_OUT');
    useAuthStore.setState({
      user: null,
      isAuthenticated: false 
    });
    
    // If on a protected page, redirect to login
    const currentPath = window.location.pathname;
    const protectedPaths = [
      '/dashboard', 
      '/profile', 
      '/settings', 
      '/solutions', 
      '/admin',
      '/messages',
      '/custom-requests',
      '/post-request',
      '/meetings'
    ];
    
    if (protectedPaths.some(path => currentPath.startsWith(path))) {
      console.log('On protected page while signed out, redirecting to login');
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
  } else if (event === 'USER_UPDATED') {
    console.log('Auth state changed: USER_UPDATED');
    // Refresh user data if needed
    if (session?.user) {
      // Refresh user data
      fetchProfileWithRetry(session.user.id, 3, 1000)
        .then(profile => {
          if (profile) {
            useAuthStore.setState({ 
              user: formatUserData(profile), 
              isAuthenticated: true 
            });
          }
        })
        .catch(error => {
          console.error('Error refreshing user data:', error);
        });
    }
  }
});

export { formatUserData }