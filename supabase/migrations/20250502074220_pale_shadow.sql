/*
  # Fix Profile Trigger for User Authentication

  1. Changes
    - Improve the handle_new_user function to be more robust
    - Add better error handling with explicit EXCEPTION block
    - Ensure profile is created with all necessary fields
    
  2. Features
    - More reliable user profile creation
    - Better handling of metadata from auth.users
    - Proper defaults for all required fields
    
  3. Security
    - Function runs with security definer privileges
    - Proper error handling to prevent function failures
*/

-- Create improved function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Try to insert the new profile
  BEGIN
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
      COALESCE(new.raw_user_meta_data->>'avatar', 'https://ui-avatars.com/api/?name=' || COALESCE(new.raw_user_meta_data->>'name', 'New+User') || '&background=3B82F6&color=fff'),
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
    );
  EXCEPTION
    WHEN unique_violation THEN
      -- Profile already exists, update it instead
      UPDATE public.profiles
      SET
        email = new.email,
        name = COALESCE(new.raw_user_meta_data->>'name', profiles.name, 'New User'),
        avatar = COALESCE(new.raw_user_meta_data->>'avatar', profiles.avatar, 'https://ui-avatars.com/api/?name=' || COALESCE(new.raw_user_meta_data->>'name', 'New+User') || '&background=3B82F6&color=fff'),
        role = COALESCE(new.raw_user_meta_data->>'role', profiles.role, 'business'),
        updated_at = now()
      WHERE id = new.id;
    WHEN OTHERS THEN
      -- Log the error but don't fail the trigger
      RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
  END;
    
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
END;
$$ language plpgsql security definer;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON profiles;
CREATE TRIGGER on_profile_update
  AFTER UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_to_auth();