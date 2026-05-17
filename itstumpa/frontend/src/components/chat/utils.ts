import type { Conversation, User } from "@/types";

/** Derive the other participant when API omits `otherUser` on list/create responses. */
export function deriveOtherUser(
  conv: Conversation,
  currentUserId: string | undefined
): User | null {
  if (conv.otherUser) return conv.otherUser;
  const fromParticipants = conv.participants?.find(
    (p) => p.userId !== currentUserId
  )?.user;
  if (fromParticipants) return fromParticipants;
  return null;
}

export function normalizeConversation(
  conv: Conversation,
  currentUserId: string | undefined,
  fallbackOther?: Pick<User, "id" | "name" | "email" | "isOnline">
): Conversation {
  const otherUser =
    deriveOtherUser(conv, currentUserId) ??
    (fallbackOther
      ? {
          id: fallbackOther.id,
          name: fallbackOther.name,
          email: fallbackOther.email,
          isOnline: fallbackOther.isOnline ?? false,
          role: "USER" as const,
        }
      : undefined);

  return {
    ...conv,
    otherUser: otherUser ?? conv.otherUser,
    unreadCount: conv.unreadCount ?? 0,
    updatedAt: conv.updatedAt ?? conv.lastMessage?.createdAt ?? new Date().toISOString(),
  };
}

export function normalizeConversations(
  list: Conversation[],
  currentUserId: string | undefined
): Conversation[] {
  return list.map((c) => normalizeConversation(c, currentUserId));
}
