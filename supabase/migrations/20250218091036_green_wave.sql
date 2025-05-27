-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Avatars are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update avatars" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete avatars" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create simplified storage policies
CREATE POLICY "Avatar public access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Avatar upload access"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Avatar update access"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Avatar delete access"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

-- Add updated_at column to profiles if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create function to sync profile updates with auth.users
CREATE OR REPLACE FUNCTION sync_profile_to_auth()
RETURNS trigger AS $$
BEGIN
  -- Update auth.users metadata
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_build_object(
    'name', NEW.name,
    'avatar', NEW.avatar,
    'role', NEW.role
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for profile updates
DROP TRIGGER IF EXISTS on_profile_update ON profiles;

CREATE TRIGGER on_profile_update
  AFTER UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_profile_to_auth();