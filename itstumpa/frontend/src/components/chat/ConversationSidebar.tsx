"use client";

import { useEffect, useState } from "react";
import NewChatModal from "./NewChatModal";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setConversations, setConversationsLoading } from "@/store/slices/conversationsSlice";
import { clearUser } from "@/store/slices/authSlice";
import { disconnectSocket } from "@/lib/socket";
import type { Conversation } from "@/types";
import Swal from "sweetalert2";
<<<<<<< HEAD
import {
  conversationHasParticipants,
  deriveOtherUser,
  normalizeConversations,
} from "./utils";
=======
>>>>>>> 356af953df29c9461799e75bcf7c57a5f4a7368e

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 86400000) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function ConversationSidebar({ onSelect }: { onSelect?: () => void }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const activeId = params?.conversationId as string | undefined;
  const { user } = useAppSelector((s) => s.auth);
  const { conversations, isLoading } = useAppSelector((s) => s.conversations);
  const [search, setSearch] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);

  const fetchConversations = async () => {
    dispatch(setConversationsLoading(true));
    try {
      const res = await api.get("/chat/conversations");
      const list = res.data.data;
      const raw = Array.isArray(list) ? list : [];
      const normalized = normalizeConversations(raw, user?.id);
      // #region agent log
      fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'ConversationSidebar.tsx:fetchConversations',message:'fetched conversations',data:{count:normalized.length,isArray:Array.isArray(list),activeId,ids:normalized.map((c:Conversation)=>c.id),withOtherUser:normalized.filter((c:Conversation)=>!!c.otherUser).length,searchQuery:search},timestamp:Date.now(),hypothesisId:'A,B,E',runId:'post-fix'})}).catch(()=>{});
      // #endregion
      dispatch(setConversations(normalized));
    } finally {
      dispatch(setConversationsLoading(false));
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    disconnectSocket();
    dispatch(clearUser());
    router.push("/login");
  };
const getOtherUser = (conv: Conversation) => deriveOtherUser(conv, user?.id);

  const handleDeleteConversation = async (convId: string) => {
<<<<<<< HEAD
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This conversation will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06B6D4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1E2530",
      color: "#F1F5F9",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/chat/conversations/${convId}`);
      dispatch(setConversations(conversations.filter((c: Conversation) => c.id !== convId)));
      if (activeId === convId) router.push("/dashboard");
      await Swal.fire({
        title: "Deleted!",
        text: "Conversation deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1E2530",
        color: "#F1F5F9",
      });
    } catch {
      await Swal.fire({
        title: "Error",
        text: "Failed to delete the conversation.",
        icon: "error",
        background: "#1E2530",
        color: "#F1F5F9",
      });
    }
  };

  const filtered = conversations.filter((c: Conversation) => {
    const otherUser = getOtherUser(c);
    return otherUser?.name?.toLowerCase().includes(search.toLowerCase()) ?? true;
  });

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'ConversationSidebar.tsx:renderState',message:'redux vs filtered',data:{reduxCount:conversations.length,filteredCount:filtered.length,activeId,search,ids:conversations.map((c)=>c.id),filteredIds:filtered.map((c)=>c.id)},timestamp:Date.now(),hypothesisId:'B,D'})}).catch(()=>{});
    // #endregion
  }, [conversations, filtered.length, activeId, search]);
=======
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This conversation will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#06B6D4",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    background: "#1E2530",
    color: "#F1F5F9",
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/chat/conversations/${convId}`);
    dispatch(setConversations(conversations.filter((c: Conversation) => c.id !== convId)));
    if (activeId === convId) router.push("/dashboard");

    await Swal.fire({
      title: "Deleted!",
      text: "Conversation deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: "#1E2530",
      color: "#F1F5F9",
    });
  } catch {
    await Swal.fire({
      title: "Error",
      text: "Failed to delete the conversation.",
      icon: "error",
      background: "#1E2530",
      color: "#F1F5F9",
    });
  }
};

  const filtered = conversations.filter((c: Conversation) =>
    c.otherUser?.name?.toLowerCase().includes(search.toLowerCase())
  );
>>>>>>> 356af953df29c9461799e75bcf7c57a5f4a7368e

  return (
    <aside className="flex flex-col h-full bg-[#1E2530] border-r border-[#334155]">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-[#334155]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#1E2530]" />
            </div>
            <div className="min-w-0">
              <p className="text-[#F1F5F9] font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-[#10B981] text-xs">● Online</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-[#94A3B8] hover:text-red-400 transition-colors text-xs px-2 py-1 rounded-lg hover:bg-red-400/10"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-2.5 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors"
        />
      </div>

<<<<<<< HEAD
      {/* New Conversation */}
=======
      {/* New Conversation button */}
>>>>>>> 356af953df29c9461799e75bcf7c57a5f4a7368e
      <div className="px-4 py-2 border-b border-[#334155]">
        <button
          onClick={() => setShowNewChat(true)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-[#06B6D4] border border-[#06B6D4]/20 hover:bg-[#06B6D4]/10 transition-colors"
        >
          + New Conversation
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 rounded-full border-2 border-[#06B6D4] border-t-transparent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
<<<<<<< HEAD
          <div className="flex items-center justify-center h-32">
            <p className="text-[#94A3B8] text-sm">No conversations yet</p>
          </div>
        ) : (
          filtered.map((conv: Conversation) => {
            const otherUser = getOtherUser(conv);
            return (
              <div key={conv.id} className="relative group border-b border-[#334155]/50">
                <button
                  onClick={() => {
                    // #region agent log
                    fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'ConversationSidebar.tsx:clickConv',message:'sidebar item clicked',data:{clickedId:conv.id,activeId,targetPath:`/dashboard/chat/${conv.id}`},timestamp:Date.now(),hypothesisId:'C,D'})}).catch(()=>{});
                    // #endregion
                    router.push(`/dashboard/chat/${conv.id}`);
                    onSelect?.();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#0F1419]/50 transition-colors text-left ${
                    activeId === conv.id ? "bg-[#0F1419]/70 border-l-2 border-l-[#06B6D4]" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                      {otherUser?.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    {otherUser?.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#1E2530]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[#F1F5F9] text-sm font-medium truncate">
                        {otherUser?.name ?? "Unknown"}
                      </p>
                      {conv.lastMessage && (
                        <span className="text-[#94A3B8] text-xs shrink-0 ml-2">
                          {formatTime(conv.lastMessage.createdAt)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[#94A3B8] text-xs truncate max-w-[140px]">
                        {conv.lastMessage?.content ?? (conv.lastMessage?.fileUrl ? "📎 File" : "No messages yet")}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="bg-[#06B6D4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 ml-1">
                          {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conv.id);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>

      {showNewChat && (
        <NewChatModal
          onClose={() => setShowNewChat(false)}
          onCreated={async (createdConv, selectedUser) => {
            await fetchConversations(
              createdConv && selectedUser
                ? { conv: createdConv, selectedUser }
                : undefined
            );
          }}
        />
      )}
=======
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-[#94A3B8] text-sm">No conversations yet</p>
          </div>
        ) : (
          filtered.map((conv: Conversation) => (
            <div key={conv.id} className="relative group border-b border-[#334155]/50">
              <button
                onClick={() => {
                  router.push(`/dashboard/chat/${conv.id}`);
                  onSelect?.();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#0F1419]/50 transition-colors text-left ${
                  activeId === conv.id ? "bg-[#0F1419]/70 border-l-2 border-l-[#06B6D4]" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                    {conv.otherUser?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  {conv.otherUser?.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#1E2530]" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[#F1F5F9] text-sm font-medium truncate">{conv.otherUser?.name}</p>
                    {conv.lastMessage && (
                      <span className="text-[#94A3B8] text-xs shrink-0 ml-2">
                        {formatTime(conv.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#94A3B8] text-xs truncate max-w-[140px]">
                      {conv.lastMessage?.content ?? (conv.lastMessage?.fileUrl ? "📎 File" : "No messages yet")}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="bg-[#06B6D4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 ml-1">
                        {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConversation(conv.id);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {showNewChat && <NewChatModal onClose={() => setShowNewChat(false)} />}
>>>>>>> 356af953df29c9461799e75bcf7c57a5f4a7368e
    </aside>
  );
}