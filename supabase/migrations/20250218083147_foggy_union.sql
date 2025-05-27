/*
  # Messaging and Notifications Schema

  1. New Tables
    - messages: For storing direct messages between users
    - notifications: For storing user notifications
    
  2. Features
    - Real-time messaging capabilities
    - Notification system with actions
    - Message read status tracking
    
  3. Security
    - Row Level Security enabled
    - Proper access control
    - Data privacy protection
*/

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  action_label text,
  action_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_receiver_id_idx ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS messages_conversation_idx ON messages(sender_id, receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS messages_unread_idx ON messages(receiver_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS notifications_unread_idx ON notifications(user_id, read) WHERE read = false;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for Messages
CREATE POLICY "messages_select"
  ON messages FOR SELECT
  TO authenticated
  USING (
    sender_id = auth.uid() OR 
    receiver_id = auth.uid()
  );

CREATE POLICY "messages_insert"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "messages_update"
  ON messages FOR UPDATE
  TO authenticated
  USING (receiver_id = auth.uid());

CREATE POLICY "messages_delete"
  ON messages FOR DELETE
  TO authenticated
  USING (sender_id = auth.uid());

-- RLS Policies for Notifications
CREATE POLICY "notifications_select"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_insert"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "notifications_update"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_delete"
  ON notifications FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());