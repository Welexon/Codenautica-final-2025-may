/*
  # Fix Custom Requests Schema

  1. Changes
    - Drop existing tables and recreate them with proper references
    - Add correct foreign key relationships
    - Update RLS policies
    - Add necessary indexes

  2. Tables Modified
    - custom_requests
    - proposals

  3. Security
    - Enable RLS
    - Add appropriate policies for access control
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS proposals;
DROP TABLE IF EXISTS custom_requests;

-- Create Custom Requests Table
CREATE TABLE custom_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  budget text NOT NULL,
  deadline timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'open',
  posted_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  requirements jsonb DEFAULT '[]'::jsonb,
  attachments jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT fk_posted_by FOREIGN KEY (posted_by) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create Proposals Table
CREATE TABLE proposals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id uuid NOT NULL,
  developer_id uuid NOT NULL,
  budget decimal(10,2) NOT NULL,
  duration text NOT NULL,
  cover_letter text NOT NULL,
  solution text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  milestones jsonb DEFAULT '[]'::jsonb,
  attachments jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT fk_request FOREIGN KEY (request_id) 
    REFERENCES custom_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_developer FOREIGN KEY (developer_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS custom_requests_posted_by_idx ON custom_requests(posted_by);
CREATE INDEX IF NOT EXISTS custom_requests_status_idx ON custom_requests(status);
CREATE INDEX IF NOT EXISTS custom_requests_created_at_idx ON custom_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS proposals_request_id_idx ON proposals(request_id);
CREATE INDEX IF NOT EXISTS proposals_developer_id_idx ON proposals(developer_id);
CREATE INDEX IF NOT EXISTS proposals_status_idx ON proposals(status);
CREATE INDEX IF NOT EXISTS proposals_created_at_idx ON proposals(created_at DESC);

-- Full text search index for custom requests
CREATE INDEX IF NOT EXISTS custom_requests_fts_idx ON custom_requests 
USING gin(to_tsvector('english', title || ' ' || description));

-- RLS Policies for Custom Requests

-- Anyone can view requests
CREATE POLICY "custom_requests_view_all"
  ON custom_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only business users can create requests
CREATE POLICY "custom_requests_insert_business"
  ON custom_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'role' = 'business'
  );

-- Users can only update their own requests
CREATE POLICY "custom_requests_update_own"
  ON custom_requests FOR UPDATE
  TO authenticated
  USING (posted_by = auth.uid())
  WITH CHECK (posted_by = auth.uid());

-- Users can only delete their own requests
CREATE POLICY "custom_requests_delete_own"
  ON custom_requests FOR DELETE
  TO authenticated
  USING (posted_by = auth.uid());

-- RLS Policies for Proposals

-- Users can view proposals they submitted or received
CREATE POLICY "proposals_view_relevant"
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

-- Only developers can submit proposals
CREATE POLICY "proposals_insert_developer"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'role' = 'developer'
  );

-- Users can update their own proposals or proposals for their requests
CREATE POLICY "proposals_update_own"
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

-- Developers can delete their own proposals
CREATE POLICY "proposals_delete_own"
  ON proposals FOR DELETE
  TO authenticated
  USING (developer_id = auth.uid());