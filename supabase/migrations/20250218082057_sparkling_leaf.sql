/*
  # Add Essential Indexes and Constraints

  1. New Indexes
    - Add search operation indexes
    - Add filtering and sorting indexes
    - Add composite indexes for related queries
  
  2. Constraints
    - Add check constraints for data validation (if not exists)
    - Add unique indexes for data integrity
  
  3. Security
    - Add RLS policies for data access control
*/

-- Add indexes for search operations
CREATE INDEX IF NOT EXISTS solutions_title_description_idx ON solutions USING GIN (to_tsvector('english', title || ' ' || description));
CREATE INDEX IF NOT EXISTS users_name_email_idx ON users USING GIN (to_tsvector('english', name || ' ' || email));

-- Add indexes for category and status filtering
CREATE INDEX IF NOT EXISTS solutions_category_idx ON solutions(category);
CREATE INDEX IF NOT EXISTS solutions_verified_idx ON solutions(verified);
CREATE INDEX IF NOT EXISTS users_role_status_idx ON users(role, status);

-- Add composite indexes for related queries
CREATE INDEX IF NOT EXISTS subscriptions_user_solution_idx ON subscriptions(user_id, solution_id);
CREATE INDEX IF NOT EXISTS messages_sender_receiver_idx ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON notifications(user_id, read);

-- Add check constraints for data validation (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'solutions_price_check'
  ) THEN
    ALTER TABLE solutions 
      ADD CONSTRAINT solutions_price_check 
      CHECK (price >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'reviews_rating_check'
  ) THEN
    ALTER TABLE reviews 
      ADD CONSTRAINT reviews_rating_check 
      CHECK (rating BETWEEN 1 AND 5);
  END IF;
END $$;

-- Add unique index for active subscriptions
CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_unique_active_idx 
ON subscriptions(user_id, solution_id) 
WHERE status = 'active';

-- Update RLS policies for better security

-- Solutions policies
CREATE POLICY "Developers can only update their own solutions"
  ON solutions FOR UPDATE
  TO authenticated
  USING (developer_id = auth.uid())
  WITH CHECK (developer_id = auth.uid());

-- Reviews policies
CREATE POLICY "Users can only update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Subscriptions policies
CREATE POLICY "Users can only update their own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can only update their own sent messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (sender_id = auth.uid())
  WITH CHECK (sender_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can only update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());