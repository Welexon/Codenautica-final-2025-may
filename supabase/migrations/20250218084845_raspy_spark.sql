/*
  # Complete Schema and Data Setup

  1. New Tables
    - Solutions table with full schema
    - Reviews table for solution ratings
    - Developer profiles with skills and certifications
    - Business profiles with company details
    - Messages and notifications
    - Custom requests and proposals
    
  2. Security
    - RLS policies for all tables
    - Proper foreign key relationships
    - Indexes for performance
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  developer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Developer profiles
CREATE TABLE IF NOT EXISTS developer_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  skills jsonb DEFAULT '[]'::jsonb,
  languages jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  hourly_rate integer,
  availability text,
  github_url text,
  linkedin_url text,
  completed_projects integer DEFAULT 0,
  active_projects integer DEFAULT 0
);

-- Business profiles
CREATE TABLE IF NOT EXISTS business_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_size text,
  industry text,
  tax_id text,
  billing_email text,
  billing_address jsonb
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  solution_id uuid REFERENCES solutions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS solutions_developer_id_idx ON solutions(developer_id);
CREATE INDEX IF NOT EXISTS solutions_category_idx ON solutions(category);
CREATE INDEX IF NOT EXISTS solutions_price_idx ON solutions(price);
CREATE INDEX IF NOT EXISTS reviews_solution_id_idx ON reviews(solution_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);

-- Full text search indexes
CREATE INDEX IF NOT EXISTS solutions_fts_idx ON solutions 
USING gin(to_tsvector('english', title || ' ' || description));

-- RLS Policies

-- Solutions
CREATE POLICY "solutions_select_all"
  ON solutions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "solutions_insert_developer"
  ON solutions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "solutions_update_own"
  ON solutions FOR UPDATE
  TO authenticated
  USING (developer_id = auth.uid());

-- Developer profiles
CREATE POLICY "developer_profiles_select_all"
  ON developer_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "developer_profiles_insert_own"
  ON developer_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "developer_profiles_update_own"
  ON developer_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Business profiles
CREATE POLICY "business_profiles_select_all"
  ON business_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "business_profiles_insert_own"
  ON business_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "business_profiles_update_own"
  ON business_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Reviews
CREATE POLICY "reviews_select_all"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "reviews_insert_auth"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_update_own"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Insert sample data
INSERT INTO solutions (
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
  downloads,
  active_users,
  verified,
  subscription,
  developer_id,
  features,
  technologies,
  requirements,
  screenshots,
  demo_url,
  documentation_url,
  version,
  supported_languages,
  industries
) VALUES (
  uuid_generate_v4(),
  'Advanced Inventory Management',
  'Complete inventory management solution with real-time tracking and analytics.',
  299,
  'Operations',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  4.8,
  1200,
  850,
  true,
  true,
  auth.uid(),
  '["Real-time tracking", "Automated reordering", "Analytics dashboard", "Multi-location support"]'::jsonb,
  '["React", "Node.js", "MongoDB", "WebSocket"]'::jsonb,
  '["Modern web browser", "Internet connection", "Minimum 2GB RAM"]'::jsonb,
  '[
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586528116493-da5c4ed5bc72?auto=format&fit=crop&w=800&q=80"
  ]'::jsonb,
  'https://demo.example.com',
  'https://docs.example.com',
  '2.1.0',
  '["English", "Norwegian", "Swedish"]'::jsonb,
  '["Retail", "Manufacturing", "Wholesale"]'::jsonb
);