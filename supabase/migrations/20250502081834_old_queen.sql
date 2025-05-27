/*
  # Fix Profile Update and Messaging

  1. Changes
    - Improve profile update trigger function
    - Fix sync between profile and auth
    - Add better error handling
    - Ensure timestamps are properly updated
    
  2. Features
    - More reliable profile updates
    - Better error handling for database operations
    - Improved timestamp management
    
  3. Security
    - Maintain existing RLS policies
*/

-- Create improved function to sync profile changes back to auth metadata
CREATE OR REPLACE FUNCTION public.sync_profile_to_auth()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  
  -- Update auth.users metadata with profile changes
  -- Include all relevant fields but keep the structure manageable
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

-- Enable realtime for messages and notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;