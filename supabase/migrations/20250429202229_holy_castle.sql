/*
  # Add Developer Profile Fields

  1. New Fields
    - Add developer-specific fields to profiles table
    - Add business-specific fields to profiles table
    
  2. Changes
    - Add skills, languages, certifications fields as JSONB arrays
    - Add hourly_rate, availability fields for developers
    - Add company_size, industry fields for businesses
    
  3. Security
    - Maintain existing RLS policies
*/

-- Add developer-specific fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS certifications jsonb DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hourly_rate integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS availability text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS github_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS completed_projects integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS active_projects integer DEFAULT 0;

-- Add business-specific fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_size text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS industry text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tax_id text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_email text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_address jsonb;

-- Create index for role-based queries
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- Update sync_profile_changes function to include new fields
CREATE OR REPLACE FUNCTION sync_profile_changes()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  
  -- Update auth.users metadata with core fields
  -- Note: We don't include all fields to avoid metadata size limitations
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_build_object(
    'name', NEW.name,
    'avatar', NEW.avatar,
    'role', NEW.role,
    'email', NEW.email,
    'bio', NEW.bio,
    'company', NEW.company,
    'location', NEW.location,
    'website', NEW.website
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ language plpgsql security definer;