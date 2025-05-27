/*
  # Fix Auth System and Profile Management

  1. Changes
    - Improve user creation and profile management
    - Fix synchronization between auth and profiles
    - Add better error handling
    - Add developer and business specific fields
    
  2. Features
    - More reliable user registration
    - Better profile data management
    - Improved error handling
    
  3. Security
    - Maintain existing security model
*/

-- Create improved function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  profile_exists boolean;
  role_value text;
BEGIN
  -- Get role from metadata or default to 'business'
  role_value := COALESCE(new.raw_user_meta_data->>'role', 'business');
  
  -- Check if profile already exists
  SELECT EXISTS(SELECT 1 FROM profiles WHERE id = new.id) INTO profile_exists;
  
  IF profile_exists THEN
    -- Update existing profile
    UPDATE profiles
    SET
      email = new.email,
      name = COALESCE(new.raw_user_meta_data->>'name', profiles.name, 'New User'),
      avatar = COALESCE(
        new.raw_user_meta_data->>'avatar', 
        profiles.avatar, 
        'https://ui-avatars.com/api/?name=' || 
        COALESCE(new.raw_user_meta_data->>'name', 'New+User') || 
        '&background=3B82F6&color=fff'
      ),
      role = role_value,
      updated_at = now()
    WHERE id = new.id;
  ELSE
    -- Create new profile
    BEGIN
      INSERT INTO profiles (
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
        role_value,
        'active',
        jsonb_build_object(
          'notifications', true,
          'emailUpdates', true,
          'twoFactorEnabled', false,
          'permissions', jsonb_build_object(
            'canManageUsers', false,
            'canManageSolutions', role_value = 'developer',
            'canManageContent', false,
            'canViewAnalytics', true,
            'canManageBilling', true,
            'canManageSettings', true
          )
        ),
        jsonb_build_object(
          'plan', 'starter'
        ),
        now(),
        now()
      );
    EXCEPTION
      WHEN unique_violation THEN
        -- If there's a race condition and the profile was created between our check and insert
        UPDATE profiles
        SET
          email = new.email,
          name = COALESCE(new.raw_user_meta_data->>'name', 'New User'),
          avatar = COALESCE(
            new.raw_user_meta_data->>'avatar', 
            'https://ui-avatars.com/api/?name=' || 
            COALESCE(new.raw_user_meta_data->>'name', 'New+User') || 
            '&background=3B82F6&color=fff'
          ),
          role = role_value,
          updated_at = now()
        WHERE id = new.id;
      WHEN OTHERS THEN
        -- Log the error but don't fail the trigger
        RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
    END;
  END IF;
    
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
  -- Set updated_at timestamp
  NEW.updated_at = now();
  
  -- Update auth.users metadata with profile changes
  BEGIN
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_build_object(
      'name', NEW.name,
      'avatar', NEW.avatar,
      'role', NEW.role,
      'bio', NEW.bio,
      'company', NEW.company,
      'location', NEW.location,
      'website', NEW.website,
      'hourly_rate', NEW.hourly_rate,
      'availability', NEW.availability,
      'github_url', NEW.github_url,
      'linkedin_url', NEW.linkedin_url,
      'company_size', NEW.company_size,
      'industry', NEW.industry
    )
    WHERE id = NEW.id;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log the error but don't fail the trigger
      RAISE WARNING 'Error syncing profile to auth for user %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON profiles;
CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_profile_to_auth();

-- Create function to handle profile timestamp updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for profile timestamp updates
DROP TRIGGER IF EXISTS update_profile_timestamp ON profiles;
CREATE TRIGGER update_profile_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();

-- Create function to handle message updates
CREATE OR REPLACE FUNCTION handle_message_update()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for message updates
DROP TRIGGER IF EXISTS handle_message_update ON messages;
CREATE TRIGGER handle_message_update
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_message_update();

-- Enable realtime for messages and notifications (only if not already enabled)
DO $$
BEGIN
  -- Check if messages table is already in the publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
  
  -- Check if notifications table is already in the publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error adding tables to publication: %', SQLERRM;
END $$;

-- Add developer-specific fields to profiles table if they don't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS certifications jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hourly_rate integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS github_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS completed_projects integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS active_projects integer DEFAULT 0;

-- Add business-specific fields to profiles table if they don't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_size text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tax_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_email text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_address jsonb;

-- Create index for role-based queries if it doesn't exist
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);