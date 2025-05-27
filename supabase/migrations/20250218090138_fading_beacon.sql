-- Create storage buckets for profile avatars and solution images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('solutions', 'solutions', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Set up storage policies for solutions bucket
CREATE POLICY "Solution images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'solutions');

CREATE POLICY "Developers can upload solution images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'solutions' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "Developers can update their solution images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'solutions' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "Developers can delete their solution images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'solutions' AND
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );