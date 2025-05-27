-- Create storage buckets if they don't exist
DO $$ 
BEGIN
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES 
    ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif']),
    ('solutions', 'solutions', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif'])
  ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;
END $$;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Solution images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Developers can upload solution images" ON storage.objects;
DROP POLICY IF EXISTS "Developers can update their solution images" ON storage.objects;
DROP POLICY IF EXISTS "Developers can delete their solution images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can manage their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('avatars', 'solutions'));

CREATE POLICY "Avatar Upload Access"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Avatar Update Access"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Avatar Delete Access"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Solution Image Upload Access"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'solutions' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "Solution Image Update Access"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'solutions' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "Solution Image Delete Access"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'solutions' AND
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

-- Ensure profiles table has all required columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS settings jsonb DEFAULT '{}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing jsonb DEFAULT '{}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login timestamptz;

-- Update profiles RLS policies
DROP POLICY IF EXISTS "profiles_select_all" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

CREATE POLICY "Public Profile Access"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Own Profile Update"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Profile Insert"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Create or update profile update trigger
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS trigger AS $$
BEGIN
  NEW.last_login = CASE 
    WHEN NEW.last_login IS NULL THEN now()
    ELSE NEW.last_login
  END;
  RETURN NEW;
END;
$$ language plpgsql security definer;

DROP TRIGGER IF EXISTS on_profile_update ON profiles;

CREATE TRIGGER on_profile_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();