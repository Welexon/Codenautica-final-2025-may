-- Drop existing triggers first
DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
DROP TRIGGER IF EXISTS update_notifications_updated_at ON notifications;

-- Now we can safely drop and recreate the function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages(sender_id);
CREATE INDEX IF NOT EXISTS messages_receiver_id_idx ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS messages_conversation_idx ON messages(sender_id, receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS messages_unread_idx ON messages(receiver_id, read) WHERE read = false;

-- Create new RLS policies with unique names
CREATE POLICY "messages_select_policy"
  ON messages FOR SELECT
  TO authenticated
  USING (
    sender_id = auth.uid() OR 
    receiver_id = auth.uid()
  );

CREATE POLICY "messages_insert_policy"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "messages_update_policy"
  ON messages FOR UPDATE
  TO authenticated
  USING (receiver_id = auth.uid());

CREATE POLICY "messages_delete_policy"
  ON messages FOR DELETE
  TO authenticated
  USING (sender_id = auth.uid());

-- Create new function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();