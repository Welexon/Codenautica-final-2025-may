-- Drop existing tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS custom_requests CASCADE;
DROP TABLE IF EXISTS solutions CASCADE;
DROP TABLE IF EXISTS developer_profiles CASCADE;
DROP TABLE IF EXISTS business_profiles CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;

-- Create profiles table for user metadata
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  avatar text,
  role text,
  created_at timestamptz DEFAULT now()
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
  created_at timestamptz DEFAULT now()
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
  created_at timestamptz DEFAULT now(),
  requirements jsonb DEFAULT '[]'::jsonb,
  attachments jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb
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
  created_at timestamptz DEFAULT now(),
  milestones jsonb DEFAULT '[]'::jsonb,
  attachments jsonb DEFAULT '[]'::jsonb
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX solutions_developer_id_idx ON solutions(developer_id);
CREATE INDEX custom_requests_posted_by_idx ON custom_requests(posted_by);
CREATE INDEX proposals_request_id_idx ON proposals(request_id);
CREATE INDEX proposals_developer_id_idx ON proposals(developer_id);

-- RLS Policies

-- Profiles
CREATE POLICY "profiles_select_all" 
  ON profiles FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "profiles_update_own" 
  ON profiles FOR UPDATE 
  TO authenticated 
  USING (id = auth.uid());

-- Solutions
CREATE POLICY "solutions_select_all" 
  ON solutions FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "solutions_insert_developer" 
  ON solutions FOR INSERT 
  TO authenticated 
  WITH CHECK (developer_id = auth.uid());

CREATE POLICY "solutions_update_own" 
  ON solutions FOR UPDATE 
  TO authenticated 
  USING (developer_id = auth.uid());

-- Custom Requests
CREATE POLICY "custom_requests_select_all" 
  ON custom_requests FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "custom_requests_insert_business" 
  ON custom_requests FOR INSERT 
  TO authenticated 
  WITH CHECK (posted_by = auth.uid());

CREATE POLICY "custom_requests_update_own" 
  ON custom_requests FOR UPDATE 
  TO authenticated 
  USING (posted_by = auth.uid());

-- Proposals
CREATE POLICY "proposals_select_relevant" 
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

CREATE POLICY "proposals_insert_developer" 
  ON proposals FOR INSERT 
  TO authenticated 
  WITH CHECK (developer_id = auth.uid());

CREATE POLICY "proposals_update_own" 
  ON proposals FOR UPDATE 
  TO authenticated 
  USING (developer_id = auth.uid());

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar',
    new.raw_user_meta_data->>'role'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();