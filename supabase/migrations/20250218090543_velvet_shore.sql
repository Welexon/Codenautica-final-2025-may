-- Add missing columns to profiles table if they don't exist
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'bio') THEN
    ALTER TABLE profiles ADD COLUMN bio text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'company') THEN
    ALTER TABLE profiles ADD COLUMN company text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'location') THEN
    ALTER TABLE profiles ADD COLUMN location text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'website') THEN
    ALTER TABLE profiles ADD COLUMN website text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'settings') THEN
    ALTER TABLE profiles ADD COLUMN settings jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'billing') THEN
    ALTER TABLE profiles ADD COLUMN billing jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'status') THEN
    ALTER TABLE profiles ADD COLUMN status text DEFAULT 'active';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'last_login') THEN
    ALTER TABLE profiles ADD COLUMN last_login timestamptz;
  END IF;
END $$;

-- Drop existing storage policies if they exist
DO $$ 
BEGIN
  EXECUTE format('DROP POLICY IF EXISTS "Public Access" ON storage.objects');
  EXECUTE format('DROP POLICY IF EXISTS "Avatar Upload Access" ON storage.objects');
  EXECUTE format('DROP POLICY IF EXISTS "Avatar Update Access" ON storage.objects');
  EXECUTE format('DROP POLICY IF EXISTS "Avatar Delete Access" ON storage.objects');
  EXECUTE format('DROP POLICY IF EXISTS "Solution Image Upload Access" ON storage.objects');
  EXECUTE format('DROP POLICY IF EXISTS "Solution Image Update Access" ON storage.objects');
  EXECUTE format('DROP POLICY IF EXISTS "Solution Image Delete Access" ON storage.objects');
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create or update storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif']),
  ('solutions', 'solutions', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

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

-- Update profiles RLS policies
DROP POLICY IF EXISTS "Public Profile Access" ON profiles;
DROP POLICY IF EXISTS "Own Profile Update" ON profiles;
DROP POLICY IF EXISTS "Profile Insert" ON profiles;

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