-- Drop existing policies to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Own Profile Update" ON profiles;
  DROP POLICY IF EXISTS "Profile Insert" ON profiles;
  DROP POLICY IF EXISTS "Public Profile Access" ON profiles;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Add missing columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS settings jsonb DEFAULT '{}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing jsonb DEFAULT '{}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create new RLS policies
CREATE POLICY "View profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Create own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Create function to sync profile changes
CREATE OR REPLACE FUNCTION sync_profile_changes()
RETURNS trigger AS $$
BEGIN
  -- Set updated_at timestamp
  NEW.updated_at = now();
  
  -- Update auth.users metadata
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

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON profiles;

CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_profile_changes();

-- Ensure existing profiles have email synced
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
AND p.email IS NULL;