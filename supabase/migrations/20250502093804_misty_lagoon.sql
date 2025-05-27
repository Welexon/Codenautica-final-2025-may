/*
  # Fix Auth Redirection and Profile Creation

  1. Changes
    - Improve the handle_new_user function to be more reliable
    - Add better error handling to prevent failures
    - Ensure proper data synchronization between auth and profiles tables
    
  2. Features
    - More reliable user profile creation
    - Better error handling in database triggers
    - Improved metadata synchronization
    
  3. Security
    - Maintains security definer for proper permissions
*/

-- Create improved function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert the new profile
  INSERT INTO public.profiles (
    id,
    email,
    name,
    avatar,
    role,
    status,
    settings,
    billing,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'New User'),
    COALESCE(
      new.raw_user_meta_data->>'avatar', 
      'https://ui-avatars.com/api/?name=' || 
      COALESCE(new.raw_user_meta_data->>'name', 'New+User') || 
      '&background=3B82F6&color=fff'
    ),
    COALESCE(new.raw_user_meta_data->>'role', 'business'),
    'active',
    jsonb_build_object(
      'notifications', true,
      'emailUpdates', true,
      'twoFactorEnabled', false
    ),
    jsonb_build_object(
      'plan', 'starter'
    ),
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    avatar = EXCLUDED.avatar,
    role = EXCLUDED.role,
    updated_at = now();
    
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the trigger
    RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ language plpgsql security definer;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to sync profile changes back to auth metadata
CREATE OR REPLACE FUNCTION public.sync_profile_to_auth()
RETURNS trigger AS $$
BEGIN
  -- Update auth.users metadata with profile changes
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_build_object(
    'name', NEW.name,
    'avatar', NEW.avatar,
    'role', NEW.role,
    'bio', NEW.bio,
    'company', NEW.company,
    'location', NEW.location,
    'website', NEW.website
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the trigger
    RAISE WARNING 'Error syncing profile to auth for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON profiles;
CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_to_auth();