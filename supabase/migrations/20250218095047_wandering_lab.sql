-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS solutions CASCADE;
DROP TABLE IF EXISTS custom_requests CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table first
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  avatar text,
  role text,
  bio text,
  company text,
  location text,
  website text,
  settings jsonb DEFAULT '{}'::jsonb,
  billing jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'active',
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create solutions table
CREATE TABLE solutions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  rating decimal(3,2) DEFAULT 0,
  downloads integer DEFAULT 0,
  active_users integer DEFAULT 0,
  verified boolean DEFAULT false,
  subscription boolean DEFAULT false,
  developer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  screenshots jsonb NOT NULL DEFAULT '[]'::jsonb,
  demo_url text,
  documentation_url text,
  release_date timestamptz NOT NULL DEFAULT now(),
  last_update timestamptz NOT NULL DEFAULT now(),
  version text NOT NULL,
  supported_languages jsonb NOT NULL DEFAULT '[]'::jsonb,
  industries jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create custom requests table
CREATE TABLE custom_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  budget text NOT NULL,
  deadline timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'open',
  posted_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  requirements jsonb DEFAULT '[]'::jsonb,
  attachments jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create proposals table
CREATE TABLE proposals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id uuid REFERENCES custom_requests(id) ON DELETE CASCADE,
  developer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  budget decimal(10,2) NOT NULL,
  duration text NOT NULL,
  cover_letter text NOT NULL,
  solution text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  milestones jsonb DEFAULT '[]'::jsonb,
  attachments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  action_label text,
  action_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create necessary indexes
CREATE INDEX profiles_role_idx ON profiles(role);
CREATE INDEX solutions_developer_id_idx ON solutions(developer_id);
CREATE INDEX solutions_category_idx ON solutions(category);
CREATE INDEX custom_requests_posted_by_idx ON custom_requests(posted_by);
CREATE INDEX custom_requests_status_idx ON custom_requests(status);
CREATE INDEX proposals_request_id_idx ON proposals(request_id);
CREATE INDEX proposals_developer_id_idx ON proposals(developer_id);
CREATE INDEX messages_sender_receiver_idx ON messages(sender_id, receiver_id);
CREATE INDEX messages_unread_idx ON messages(receiver_id) WHERE NOT read;
CREATE INDEX notifications_user_id_idx ON notifications(user_id);
CREATE INDEX notifications_unread_idx ON notifications(user_id) WHERE NOT read;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Solutions policies
CREATE POLICY "Solutions are viewable by everyone"
  ON solutions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Developers can create solutions"
  ON solutions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'developer'
    )
  );

CREATE POLICY "Developers can update own solutions"
  ON solutions FOR UPDATE
  TO authenticated
  USING (developer_id = auth.uid());

-- Custom Requests policies
CREATE POLICY "Requests are viewable by everyone"
  ON custom_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Business users can create requests"
  ON custom_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'business'
    )
  );

CREATE POLICY "Users can update own requests"
  ON custom_requests FOR UPDATE
  TO authenticated
  USING (posted_by = auth.uid());

-- Proposals policies
CREATE POLICY "Proposals are viewable by relevant users"
  ON proposals FOR SELECT
  TO authenticated
  USING (
    developer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM custom_requests
      WHERE custom_requests.id = request_id
      AND custom_requests.posted_by = auth.uid()
    )
  );

CREATE POLICY "Developers can create proposals"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'developer'
    )
  );

-- Messages policies
CREATE POLICY "Users can view their messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    name,
    avatar,
    role
  )
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar',
    new.raw_user_meta_data->>'role'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  
  -- Update auth.users metadata
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_build_object(
    'name', NEW.name,
    'avatar', NEW.avatar,
    'role', NEW.role,
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
  EXECUTE FUNCTION handle_profile_update();