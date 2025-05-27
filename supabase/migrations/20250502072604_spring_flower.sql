/*
  # Create Profile Trigger for New Users

  1. New Function
    - Create a function to handle new user creation
    - Automatically create a profile when a new user is created
    
  2. Features
    - Ensures every user has a corresponding profile
    - Copies essential user data to the profile
    - Sets default values for required fields
    
  3. Security
    - Function runs with security definer privileges
    - Ensures data consistency between auth and profiles tables
*/

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    name,
    avatar,
    role,
    status,
    settings,
    billing,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'New User'),
    COALESCE(new.raw_user_meta_data->>'avatar', 'https://ui-avatars.com/api/?name=New+User&background=0D8ABC&color=fff'),
    COALESCE(new.raw_user_meta_data->>'role', 'business'),
    'active',
    jsonb_build_object(
      'notifications', true,
      'emailUpdates', true,
      'twoFactorEnabled', false
    ),
    jsonb_build_object(
      'plan', 'starter'
    ),
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
    
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to sync email changes
CREATE OR REPLACE FUNCTION public.sync_user_email()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    email = NEW.email,
    updated_at = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger to sync email changes
DROP TRIGGER IF EXISTS sync_user_email_trigger ON auth.users;
CREATE TRIGGER sync_user_email_trigger
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_email();