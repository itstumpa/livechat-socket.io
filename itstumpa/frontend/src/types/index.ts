export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface ConversationParticipant {
  id: string;
  userId: string;
  user: User;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content?: string;
  fileUrl?: string;
  fileType?: string | null;
  fileName?: string | null;
  createdAt: string;
  read: boolean;
  status?: string;
}

export interface Conversation {
  id: string;
  unreadCount: number;
  updatedAt: string;
  otherUser?: User;
  participants?: ConversationParticipant[];
  lastMessage?: Message;
}