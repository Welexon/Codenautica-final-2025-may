/*
  # Fix Profile Update Trigger

  1. Changes
    - Improve the profile update trigger to properly sync with auth
    - Fix issues with profile updates not being reflected in the UI
    - Ensure all profile fields are properly updated
    
  2. Features
    - Better error handling in triggers
    - More comprehensive metadata syncing
    - Support for all profile fields
    
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
  EXECUTE FUNCTION sync_profile_to_auth();

-- Create function to handle profile changes
CREATE OR REPLACE FUNCTION handle_profile_update()
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
  EXECUTE FUNCTION handle_profile_update();