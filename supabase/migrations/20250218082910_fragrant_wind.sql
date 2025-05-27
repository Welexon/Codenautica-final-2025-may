/*
  # Custom Requests and Proposals Schema

  1. New Tables
    - custom_requests: For storing business project requests
    - proposals: For storing developer proposals
    
  2. Features
    - Full text search capabilities
    - Proper foreign key relationships
    - JSON storage for complex data
    
  3. Security
    - Row Level Security enabled
    - Granular access control policies
    - Proper data validation
*/

-- Custom Requests Table
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

-- Proposals Table
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

-- Enable Row Level Security
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS custom_requests_posted_by_idx ON custom_requests(posted_by);
CREATE INDEX IF NOT EXISTS custom_requests_status_idx ON custom_requests(status);
CREATE INDEX IF NOT EXISTS proposals_request_id_idx ON proposals(request_id);
CREATE INDEX IF NOT EXISTS proposals_developer_id_idx ON proposals(developer_id);
CREATE INDEX IF NOT EXISTS proposals_status_idx ON proposals(status);

-- Full text search index for custom requests
CREATE INDEX IF NOT EXISTS custom_requests_fts_idx ON custom_requests 
USING gin(to_tsvector('english', title || ' ' || description));

-- RLS Policies for Custom Requests
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

-- RLS Policies for Proposals
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
  )
  WITH CHECK (
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