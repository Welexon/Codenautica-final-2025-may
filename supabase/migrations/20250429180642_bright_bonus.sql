/*
  # Optimize Notifications Table

  1. New Indexes
    - Add composite index for faster notification queries
    - Add type-specific index for filtering by notification type
  
  2. Constraints
    - Add check constraint for notification type validation
    - Add not null constraints for critical fields
  
  3. Changes
    - Add notification priority field for better sorting
    - Add expiration date for temporary notifications
*/

-- Add new columns to notifications table
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS priority text DEFAULT 'normal';
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Add check constraint for priority
ALTER TABLE notifications ADD CONSTRAINT notifications_priority_check 
  CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

-- Add check constraint for type (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'notifications_type_check'
  ) THEN
    ALTER TABLE notifications 
      ADD CONSTRAINT notifications_type_check 
      CHECK (type IN ('info', 'success', 'warning', 'error'));
  END IF;
END $$;

-- Add composite index for faster notification queries
CREATE INDEX IF NOT EXISTS notifications_user_type_read_idx 
  ON notifications(user_id, type, read);

-- Add index for filtering by notification priority
CREATE INDEX IF NOT EXISTS notifications_priority_idx 
  ON notifications(priority);

-- Add index for expiring notifications
CREATE INDEX IF NOT EXISTS notifications_expires_at_idx 
  ON notifications(expires_at)
  WHERE expires_at IS NOT NULL;

-- Create function to automatically clean up expired notifications
CREATE OR REPLACE FUNCTION clean_expired_notifications()
RETURNS trigger AS $$
BEGIN
  DELETE FROM notifications
  WHERE expires_at < NOW();
  RETURN NULL;
END;
$$ language plpgsql;

-- Create trigger to clean up expired notifications
DROP TRIGGER IF EXISTS clean_expired_notifications_trigger ON notifications;
CREATE TRIGGER clean_expired_notifications_trigger
  AFTER INSERT OR UPDATE ON notifications
  EXECUTE FUNCTION clean_expired_notifications();