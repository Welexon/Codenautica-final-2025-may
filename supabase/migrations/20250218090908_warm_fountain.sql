-- Drop existing storage policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Upload Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Update Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Delete Access" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

-- Create new storage policies with simplified access rules
CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update avatars"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete avatars"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

-- Update profiles policies
DROP POLICY IF EXISTS "Own Profile Update" ON profiles;

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Create function to handle avatar updates
CREATE OR REPLACE FUNCTION handle_avatar_update()
RETURNS trigger AS $$
BEGIN
  -- Update last_update timestamp
  NEW.updated_at = now();
  
  -- If avatar URL changed, update auth.users metadata
  IF NEW.avatar IS DISTINCT FROM OLD.avatar THEN
    UPDATE auth.users
    SET raw_user_meta_data = 
      jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{avatar}',
        to_jsonb(NEW.avatar)
      )
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for avatar updates
DROP TRIGGER IF EXISTS on_avatar_update ON profiles;

CREATE TRIGGER on_avatar_update
  BEFORE UPDATE OF avatar ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_avatar_update();