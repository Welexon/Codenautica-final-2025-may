/*
  # Fix Profile Update Trigger

  1. Changes
    - Improve profile update trigger to properly handle updates
    - Fix sync between profile and auth metadata
    - Add better error handling
    
  2. Features
    - Ensures profile changes are properly saved
    - Maintains data consistency between profile and auth
    - Provides better error logging
*/

-- Create improved function to sync profile changes back to auth metadata
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