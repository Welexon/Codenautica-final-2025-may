/*
  # Fix RLS Policies for User Registration

  1. Changes:
    - Drop existing policies to avoid conflicts
    - Add new policies for user registration and management
  
  2. Security:
    - Allow new users to create their profile after registration
    - Maintain data privacy by restricting access to own data
    - Enable admin access for user management
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop user policies
  DROP POLICY IF EXISTS "Users can create their own profile" ON users;
  DROP POLICY IF EXISTS "Users can view their own profile" ON users;
  DROP POLICY IF EXISTS "Users can update their own profile" ON users;
  DROP POLICY IF EXISTS "Admins can manage all profiles" ON users;
END $$;

-- Add new policies
CREATE POLICY "Enable insert for authenticated users"
  ON users FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on id"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Enable update for users based on id"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR role = 'admin')
  WITH CHECK (auth.uid() = id OR role = 'admin');

CREATE POLICY "Enable delete for admins only"
  ON users FOR DELETE
  TO authenticated
  USING (role = 'admin');