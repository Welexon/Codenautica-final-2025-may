-- Drop existing messages table if it exists
DROP TABLE IF EXISTS messages CASCADE;

-- Create messages table
CREATE TABLE messages (
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

-- Create RLS policies
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

-- Create function to handle message updates
CREATE OR REPLACE FUNCTION handle_message_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for message updates
CREATE TRIGGER handle_message_update
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_message_update();