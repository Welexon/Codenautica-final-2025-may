export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}