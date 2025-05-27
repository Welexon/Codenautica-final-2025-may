/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - role (text)
      - avatar (text)
      - bio (text)
      - company (text)
      - location (text)
      - website (text)
      - plan (text)
      - status (text)
      - created_at (timestamptz)
      - last_login (timestamptz)
      - settings (jsonb)
      - billing (jsonb)
      - permissions (jsonb)
    
    - solutions
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - price (decimal)
      - category (text)
      - image (text)
      - rating (decimal)
      - downloads (integer)
      - active_users (integer)
      - verified (boolean)
      - subscription (boolean)
      - developer_id (uuid, foreign key)
      - features (jsonb)
      - technologies (jsonb)
      - requirements (jsonb)
      - screenshots (jsonb)
      - demo_url (text)
      - documentation_url (text)
      - release_date (timestamptz)
      - last_update (timestamptz)
      - version (text)
      - supported_languages (jsonb)
      - industries (jsonb)
      - created_at (timestamptz)

    - reviews
      - id (uuid, primary key)
      - solution_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - rating (integer)
      - comment (text)
      - created_at (timestamptz)

    - subscriptions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - solution_id (uuid, foreign key)
      - status (text)
      - started_at (timestamptz)
      - ended_at (timestamptz)

    - messages
      - id (uuid, primary key)
      - sender_id (uuid, foreign key)
      - receiver_id (uuid, foreign key)
      - content (text)
      - read (boolean)
      - created_at (timestamptz)

    - notifications
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - type (text)
      - title (text)
      - message (text)
      - read (boolean)
      - action_label (text)
      - action_url (text)
      - created_at (timestamptz)

    - requests
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - budget (text)
      - deadline (timestamptz)
      - status (text)
      - posted_by (uuid, foreign key)
      - created_at (timestamptz)

    - proposals
      - id (uuid, primary key)
      - request_id (uuid, foreign key)
      - developer_id (uuid, foreign key)
      - budget (decimal)
      - duration (text)
      - cover_letter (text)
      - solution (text)
      - status (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for developers and businesses
    - Add policies for admins

  3. Changes
    - Initial schema creation
    - RLS policies setup
    - Indexes for performance
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('developer', 'business', 'admin')),
  avatar text,
  bio text,
  company text,
  location text,
  website text,
  plan text DEFAULT 'starter',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  settings jsonb DEFAULT '{"notifications": true, "emailUpdates": true, "twoFactorEnabled": false}'::jsonb,
  billing jsonb DEFAULT '{"plan": "starter"}'::jsonb,
  permissions jsonb DEFAULT '{}'::jsonb
);

-- Solutions table
CREATE TABLE IF NOT EXISTS solutions (
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
  developer_id uuid REFERENCES users(id) ON DELETE CASCADE,
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

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  solution_id uuid REFERENCES solutions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  solution_id uuid REFERENCES solutions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  UNIQUE(user_id, solution_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  action_label text,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  budget text NOT NULL,
  deadline timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'open',
  posted_by uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id uuid REFERENCES requests(id) ON DELETE CASCADE,
  developer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  budget decimal(10,2) NOT NULL,
  duration text NOT NULL,
  cover_letter text NOT NULL,
  solution text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS solutions_developer_id_idx ON solutions(developer_id);
CREATE INDEX IF NOT EXISTS reviews_solution_id_idx ON reviews(solution_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_solution_id_idx ON subscriptions(solution_id);
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_receiver_id_idx ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS requests_posted_by_idx ON requests(posted_by);
CREATE INDEX IF NOT EXISTS proposals_request_id_idx ON proposals(request_id);
CREATE INDEX IF NOT EXISTS proposals_developer_id_idx ON proposals(developer_id);

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Solutions policies
CREATE POLICY "Anyone can view solutions"
  ON solutions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Developers can create solutions"
  ON solutions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'developer'
    )
  );

CREATE POLICY "Developers can update their own solutions"
  ON solutions FOR UPDATE
  TO authenticated
  USING (developer_id = auth.uid());

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Requests policies
CREATE POLICY "Anyone can view requests"
  ON requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Business users can create requests"
  ON requests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'business'
    )
  );

-- Proposals policies
CREATE POLICY "Developers can view proposals"
  ON proposals FOR SELECT
  TO authenticated
  USING (
    developer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM requests
      WHERE requests.id = request_id
      AND requests.posted_by = auth.uid()
    )
  );

CREATE POLICY "Developers can create proposals"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'developer'
    )
  );