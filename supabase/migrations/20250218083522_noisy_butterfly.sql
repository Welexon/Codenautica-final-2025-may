/*
  # Custom Requests and Proposals Schema

  1. New Tables
    - custom_requests: For storing business project requests
    - proposals: For storing developer proposals
    
  2. Features
    - Custom project request management
    - Proposal submission and tracking
    - Rich metadata support (requirements, skills, attachments)
    
  3. Security
    - Row Level Security enabled
    - Role-based access control
    - Data integrity protection
*/

-- Create extension for UUID support if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom Requests Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS custom_requests (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text NOT NULL,
    budget text NOT NULL,
    deadline timestamptz NOT NULL,
    status text NOT NULL DEFAULT 'open',
    posted_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    requirements jsonb DEFAULT '[]'::jsonb,
    attachments jsonb DEFAULT '[]'::jsonb,
    skills jsonb DEFAULT '[]'::jsonb
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Proposals Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS proposals (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id uuid REFERENCES custom_requests(id) ON DELETE CASCADE,
    developer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    budget decimal(10,2) NOT NULL,
    duration text NOT NULL,
    cover_letter text NOT NULL,
    solution text NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamptz DEFAULT now(),
    milestones jsonb DEFAULT '[]'::jsonb,
    attachments jsonb DEFAULT '[]'::jsonb
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable Row Level Security
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create indexes if they don't exist
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS custom_requests_posted_by_idx ON custom_requests(posted_by);
  CREATE INDEX IF NOT EXISTS custom_requests_status_idx ON custom_requests(status);
  CREATE INDEX IF NOT EXISTS proposals_request_id_idx ON proposals(request_id);
  CREATE INDEX IF NOT EXISTS proposals_developer_id_idx ON proposals(developer_id);
  CREATE INDEX IF NOT EXISTS proposals_status_idx ON proposals(status);
  
  -- Full text search index
  CREATE INDEX IF NOT EXISTS custom_requests_fts_idx ON custom_requests 
  USING gin(to_tsvector('english', title || ' ' || description));
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "custom_requests_select" ON custom_requests;
  DROP POLICY IF EXISTS "custom_requests_insert" ON custom_requests;
  DROP POLICY IF EXISTS "custom_requests_update" ON custom_requests;
  DROP POLICY IF EXISTS "custom_requests_delete" ON custom_requests;
  
  DROP POLICY IF EXISTS "proposals_select" ON proposals;
  DROP POLICY IF EXISTS "proposals_insert" ON proposals;
  DROP POLICY IF EXISTS "proposals_update" ON proposals;
  DROP POLICY IF EXISTS "proposals_delete" ON proposals;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create new RLS policies for custom_requests
CREATE POLICY "custom_requests_select"
  ON custom_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "custom_requests_insert"
  ON custom_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'business'
    )
  );

CREATE POLICY "custom_requests_update"
  ON custom_requests FOR UPDATE
  TO authenticated
  USING (posted_by = auth.uid())
  WITH CHECK (posted_by = auth.uid());

CREATE POLICY "custom_requests_delete"
  ON custom_requests FOR DELETE
  TO authenticated
  USING (posted_by = auth.uid());

-- Create new RLS policies for proposals
CREATE POLICY "proposals_select"
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

CREATE POLICY "proposals_insert"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "proposals_update"
  ON proposals FOR UPDATE
  TO authenticated
  USING (
    developer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM custom_requests
      WHERE custom_requests.id = request_id
      AND custom_requests.posted_by = auth.uid()
    )
  );

CREATE POLICY "proposals_delete"
  ON proposals FOR DELETE
  TO authenticated
  USING (developer_id = auth.uid());