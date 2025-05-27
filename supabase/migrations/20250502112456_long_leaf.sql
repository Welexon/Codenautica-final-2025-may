/*
  # Fix Auth System and Database Issues

  1. Changes
    - Fix issues with user registration and login
    - Improve profile creation and synchronization
    - Add proper error handling
    
  2. Features
    - More reliable user authentication
    - Better profile management
    - Improved error recovery
    
  3. Security
    - Maintain existing security model
*/

-- Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS sync_user_email_trigger ON auth.users;
DROP TRIGGER IF EXISTS on_profile_update ON profiles;
DROP TRIGGER IF EXISTS update_profile_timestamp ON profiles;
DROP TRIGGER IF EXISTS handle_message_update ON messages;

-- Drop existing functions to recreate them
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.sync_user_email();
DROP FUNCTION IF EXISTS public.sync_profile_to_auth();
DROP FUNCTION IF EXISTS public.handle_profile_update();
DROP FUNCTION IF EXISTS public.handle_message_update();

-- Create improved function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create new profile with proper error handling
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
  EXCEPTION
    WHEN OTHERS THEN
      -- Log the error but don't fail the trigger
      RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
  END;
    
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to sync email changes
CREATE OR REPLACE FUNCTION public.sync_user_email()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    email = NEW.email,
    updated_at = now()
  WHERE id = NEW.id;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the trigger
    RAISE WARNING 'Error syncing email for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger to sync email changes
CREATE TRIGGER sync_user_email_trigger
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_email();

-- Create function to sync profile changes to auth
CREATE OR REPLACE FUNCTION public.sync_profile_to_auth()
RETURNS trigger AS $$
BEGIN
  -- Update auth.users metadata with profile changes
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_build_object(
    'name', NEW.name,
    'avatar', NEW.avatar,
    'role', NEW.role
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
CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_to_auth();

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for profile updates
CREATE TRIGGER update_profile_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_profile_update();

-- Create function to handle message updates
CREATE OR REPLACE FUNCTION public.handle_message_update()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for message updates
CREATE TRIGGER handle_message_update
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_message_update();

-- Fix realtime publication for messages and notifications
DO $$
BEGIN
  -- Check if the publication exists
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    -- Check if messages table is already in the publication
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'messages'
    ) THEN
      -- Add messages table to publication
      EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.messages';
    END IF;
    
    -- Check if notifications table is already in the publication
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'notifications'
    ) THEN
      -- Add notifications table to publication
      EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications';
    END IF;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error configuring realtime publication: %', SQLERRM;
END $$;