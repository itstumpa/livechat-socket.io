"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import type { Conversation } from "@/types";
/* eslint-disable react-hooks/set-state-in-effect */

interface SearchUser {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
}

interface NewChatModalProps {
  onClose: () => void;
  onCreated?: (
    conv: Conversation,
    selectedUser: SearchUser
  ) => void | Promise<void>;
}

export default function NewChatModal({ onClose, onCreated }: NewChatModalProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "search">("all");
  const [query, setQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState<SearchUser[]>([]);
  const [allUsers, setAllUsers] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState<string | null>(null);
  const [allPage, setAllPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const limit = 10;

  const fetchAllUsers = useCallback(async (pageNum: number, reset = false) => {
    setIsLoading(true);
    try {
      const res = await api.get("/users", {
        params: { page: pageNum, limit },
      });
      const result = res.data.data;
      const list: SearchUser[] = Array.isArray(result)
        ? result
        : result.users ?? result.data ?? [];
      setAllUsers((prev) => (reset ? list : [...prev, ...list]));
      setHasMore(list.length === limit);
      setAllPage(pageNum);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setSearchUsers([]); return; }
    setIsLoading(true);
    try {
      const res = await api.get("/users/search", { params: { q } });
      const result = res.data.data;
      const list: SearchUser[] = Array.isArray(result)
        ? result
        : result.users ?? result.data ?? [];
      setSearchUsers(list);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers(1, true);
  }, [fetchAllUsers]);

  useEffect(() => {
    if (tab === "search") inputRef.current?.focus();
  }, [tab]);

  useEffect(() => {
    if (tab !== "search") return;
    const timeout = setTimeout(() => fetchSearch(query), 400);
    return () => clearTimeout(timeout);
  }, [query, tab, fetchSearch]);

  const handleStart = async (userId: string) => {
    const selectedUser =
      allUsers.find((u) => u.id === userId) ??
      searchUsers.find((u) => u.id === userId);
    if (!selectedUser) return;

    setIsStarting(userId);
    try {
      const res = await api.post("/chat/conversations", { otherUserId: userId });
      const conv = res.data.data as Conversation;
      const convId = conv?.id;
      // #region agent log
      fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'NewChatModal.tsx:handleStart',message:'conversation created',data:{otherUserId:userId,convId,hasOtherUser:!!conv?.otherUser,participantCount:conv?.participants?.length,participantUserIds:conv?.participants?.map((p)=>p.userId),keys:conv?Object.keys(conv):[]},timestamp:Date.now(),hypothesisId:'A,D',runId:'post-fix-v2'})}).catch(()=>{});
      // #endregion
      if (!convId) return;
      onClose();
      await onCreated?.(conv, selectedUser);
      const targetPath = `/dashboard/chat/${convId}`;
      const sameRoute =
        typeof window !== "undefined" && window.location.pathname === targetPath;
      // #region agent log
      fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'NewChatModal.tsx:handleStart',message:'navigating to chat',data:{convId,targetPath,sameRoute},timestamp:Date.now(),hypothesisId:'C,D',runId:'post-fix'})}).catch(()=>{});
      // #endregion
      router.push(targetPath);
      if (sameRoute) {
        window.dispatchEvent(
          new CustomEvent("chat:refresh", { detail: { conversationId: convId } })
        );
      }
    } finally {
      setIsStarting(null);
    }
  };

  const displayUsers = tab === "all" ? allUsers : searchUsers;

  const UserRow = ({ u }: { u: SearchUser }) => (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#0F1419]/50 border-b border-[#334155]/50 transition-colors">
      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
          {u.name[0].toUpperCase()}
        </div>
        {u.isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#1E2530]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#F1F5F9] text-sm font-medium truncate">{u.name}</p>
        <p className="text-[#94A3B8] text-xs truncate">{u.email}</p>
      </div>
      <button
        onClick={() => handleStart(u.id)}
        disabled={isStarting === u.id}
        className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-linear-to-r from-[#8B5CF6] to-[#06B6D4] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isStarting === u.id ? "..." : "Chat"}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-[#1E2530] border border-[#334155] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
          <h2 className="text-[#F1F5F9] font-semibold text-sm">New Conversation</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors text-lg leading-none">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#334155]">
          <button
            onClick={() => setTab("all")}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
              tab === "all"
                ? "text-[#06B6D4] border-b-2 border-[#06B6D4]"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setTab("search")}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
              tab === "search"
                ? "text-[#06B6D4] border-b-2 border-[#06B6D4]"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            Search
          </button>
        </div>

        {/* Search input */}
        {tab === "search" && (
          <div className="px-5 py-3 border-b border-[#334155]">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-2.5 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors"
            />
          </div>
        )}

        {/* User list */}
        <div className="max-h-72 overflow-y-auto">
          {isLoading && displayUsers.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 rounded-full border-2 border-[#06B6D4] border-t-transparent animate-spin" />
            </div>
          )}

          {!isLoading && displayUsers.length === 0 && tab === "search" && !query.trim() && (
            <div className="flex items-center justify-center py-12 text-[#94A3B8] text-sm">
              Type to search users
            </div>
          )}

          {!isLoading && displayUsers.length === 0 && (query.trim() || tab === "all") && (
            <div className="flex items-center justify-center py-12 text-[#94A3B8] text-sm">
              No users found
            </div>
          )}

          {displayUsers.map((u) => <UserRow key={u.id} u={u} />)}

          {tab === "all" && hasMore && (
            <div className="px-5 py-3 flex justify-center">
              <button
                onClick={() => fetchAllUsers(allPage + 1)}
                disabled={isLoading}
                className="text-xs text-[#06B6D4] hover:text-[#22D3EE] transition-colors disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}