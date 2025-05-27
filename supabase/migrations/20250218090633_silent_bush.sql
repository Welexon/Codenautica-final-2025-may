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

-- Drop all existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Upload Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Update Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Delete Access" ON storage.objects;
  DROP POLICY IF EXISTS "Solution Image Upload Access" ON storage.objects;
  DROP POLICY IF EXISTS "Solution Image Update Access" ON storage.objects;
  DROP POLICY IF EXISTS "Solution Image Delete Access" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create new storage policies with proper permissions
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('avatars', 'solutions'));

CREATE POLICY "Avatar Upload Access"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Avatar Update Access"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Avatar Delete Access"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Solution Image Upload Access"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'solutions' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Solution Image Update Access"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'solutions' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Solution Image Delete Access"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'solutions' AND
    auth.role() = 'authenticated'
  );

-- Update profiles RLS policies
DROP POLICY IF EXISTS "Public Profile Access" ON profiles;
DROP POLICY IF EXISTS "Own Profile Update" ON profiles;
DROP POLICY IF EXISTS "Profile Insert" ON profiles;

CREATE POLICY "Public Profile Access"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Profile Insert"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Own Profile Update"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Ensure all required columns exist in profiles table
DO $$ 
BEGIN
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio text;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company text;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location text;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website text;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS settings jsonb DEFAULT '{}'::jsonb;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing jsonb DEFAULT '{}'::jsonb;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login timestamptz;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;