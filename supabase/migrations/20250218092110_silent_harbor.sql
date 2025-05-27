-- Drop existing solutions table
DROP TABLE IF EXISTS solutions CASCADE;

-- Create solutions table with proper foreign key relationship
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

-- Enable RLS
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS solutions_developer_id_idx ON solutions(developer_id);
CREATE INDEX IF NOT EXISTS solutions_category_idx ON solutions(category);
CREATE INDEX IF NOT EXISTS solutions_created_at_idx ON solutions(created_at DESC);

-- Create RLS policies
CREATE POLICY "Solutions are viewable by everyone"
  ON solutions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Developers can create solutions"
  ON solutions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'developer'
    )
  );

CREATE POLICY "Developers can update own solutions"
  ON solutions FOR UPDATE
  TO authenticated
  USING (developer_id = auth.uid());

CREATE POLICY "Developers can delete own solutions"
  ON solutions FOR DELETE
  TO authenticated
  USING (developer_id = auth.uid());