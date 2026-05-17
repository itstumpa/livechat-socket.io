"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setMessages, appendMessage, prependMessages,
  setMessagesLoading, setHasMore, setCursor, clearMessages, removeMessage
} from "@/store/slices/messagesSlice";
import { updateLastMessage, incrementUnread, clearUnread } from "@/store/slices/conversationsSlice";
import api from "@/lib/axios";
import { getSocket } from "@/lib/socket";
import type { Message } from "@/types";

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow({ conversationId }: { conversationId: string }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { messages, isLoading, hasMore, cursor } = useAppSelector((s) => s.messages);
  const { conversations } = useAppSelector((s) => s.conversations);
  const conversation = conversations.find((c) => c.id === conversationId);
  const otherUser = conversation?.otherUser
  ?? conversation?.participants?.find((p) => p.user.id !== user?.id)?.user
  ?? null;

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadSeqRef = useRef(0);

  const loadMessages = useCallback(async () => {
    const seq = ++loadSeqRef.current;
    dispatch(clearMessages());
    dispatch(setMessagesLoading(true));
    try {
      const res = await api.get(`/chat/conversations/${conversationId}`);
      if (seq !== loadSeqRef.current) return;
      const data = res.data.data;
      // #region agent log
      fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'ChatWindow.tsx:fetchMessages',message:'messages loaded',data:{conversationId,messageCount:(data.messages??[]).length,responseConvId:data.id,seq},timestamp:Date.now(),hypothesisId:'C,H',runId:'post-fix-v3'})}).catch(()=>{});
      // #endregion
      dispatch(setMessages(data.messages ?? []));
      dispatch(setHasMore(!!data.nextCursor));
      dispatch(setCursor(data.nextCursor ?? null));
      dispatch(clearUnread(conversationId));
    } finally {
      if (seq === loadSeqRef.current) {
        dispatch(setMessagesLoading(false));
      }
    }
  }, [conversationId, dispatch]);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7389/ingest/0c556980-4c6c-4da6-a972-1e86ca9966a1',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ba8aa'},body:JSON.stringify({sessionId:'2ba8aa',location:'ChatWindow.tsx:useEffect',message:'conversationId changed',data:{conversationId,reduxConvCount:conversations.length,foundInRedux:!!conversation,otherUserName:otherUser?.name??null},timestamp:Date.now(),hypothesisId:'C',runId:'post-fix-v3'})}).catch(()=>{});
    // #endregion
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    const onRefresh = (e: Event) => {
      const detail = (e as CustomEvent<{ conversationId: string }>).detail;
      if (detail?.conversationId === conversationId) {
        loadMessages();
      }
    };
    window.addEventListener("chat:refresh", onRefresh);
    return () => window.removeEventListener("chat:refresh", onRefresh);
  }, [conversationId, loadMessages]);

  useEffect(() => {
    setText("");
    setFile(null);
    setIsTyping(false);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("join_conversation", conversationId);

    socket.on("receive_message", (msg: Message) => {
      if (msg.conversationId === conversationId) {
        dispatch(appendMessage(msg));
        dispatch(updateLastMessage({ conversationId, message: msg }));
        if (msg.senderId !== user?.id) dispatch(incrementUnread(conversationId));
      }
    });

    socket.on("user_typing", ({ userId: typingUserId }: { userId: string }) => {
      if (typingUserId !== user?.id) setIsTyping(true);
    });

    socket.on("user_stopped_typing", ({ userId: typingUserId }: { userId: string }) => {
      if (typingUserId !== user?.id) setIsTyping(false);
    });

    socket.on("message_deleted", ({ messageId }: { messageId: string }) => {
      dispatch(removeMessage(messageId));
    });

    return () => {
      socket.emit("leave_conversation", conversationId);
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stopped_typing");
      socket.off("message_deleted");
    };
  }, [conversationId, dispatch, user?.id]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || !cursor) return;
    dispatch(setMessagesLoading(true));
    try {
      const res = await api.get(`/chat/conversations/${conversationId}?cursor=${cursor}`);
      const data = res.data.data;
      dispatch(prependMessages(data.messages ?? []));
      dispatch(setHasMore(!!data.nextCursor));
      dispatch(setCursor(data.nextCursor ?? null));
    } finally {
      dispatch(setMessagesLoading(false));
    }
  }, [hasMore, isLoading, cursor, conversationId, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    const el = topRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  const emitTyping = () => {
    const socket = getSocket();
    socket?.emit("typing", { conversationId });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket?.emit("stop_typing", { conversationId });
    }, 1500);
  };

  const handleDelete = async (msgId: string) => {
    try {
      await api.delete(`/chat/messages/${msgId}`);
      dispatch(removeMessage(msgId));
      const socket = getSocket();
      socket?.emit("message_deleted", { messageId: msgId, conversationId });
    } catch {
      // silently fail
    }
  };

  const handleSend = async () => {
    if (!text.trim() && !file) return;
    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append("conversationId", conversationId);
      if (text.trim()) formData.append("content", text.trim());
      if (file) formData.append("file", file);
      await api.post("/chat/messages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText("");
      setFile(null);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <div className="flex flex-col h-full bg-[#0F1419]">
      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
            onClick={() => setLightboxUrl(null)}
          >✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxUrl}
            alt="Full size"
            className="max-w-full max-h-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#334155] bg-[#1E2530] shrink-0">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
            {otherUser?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          {otherUser?.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-[#1E2530]" />
          )}
        </div>
        <div>
          <p className="text-[#F1F5F9] font-semibold text-sm">{otherUser?.name}</p>
          <p className="text-xs text-[#94A3B8]">
            {isTyping ? (
              <span className="text-[#06B6D4]">typing...</span>
            ) : otherUser?.isOnline ? (
              <span className="text-[#10B981]">Online</span>
            ) : (
              `Last seen ${otherUser?.lastSeen
                ? new Date(otherUser.lastSeen).toLocaleString()
                : "recently"}`
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        <div ref={topRef} className="h-1" />
        {isLoading && (
          <div className="flex justify-center py-2">
            <div className="w-5 h-5 rounded-full border-2 border-[#06B6D4] border-t-transparent animate-spin" />
          </div>
        )}

        {messages.map((msg: Message) => {
          const isMine = msg.senderId === user?.id;
          return (
            <div key={msg.id} className={`flex group ${isMine ? "justify-end" : "justify-start"}`}>
              {/* Delete button */}
              {isMine && (
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="self-center mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#94A3B8] hover:text-red-400 p-1 rounded-lg hover:bg-red-400/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              )}

              <div className={`max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-2xl text-sm ${
                isMine
                  ? "bg-[#0E7490] text-white rounded-tr-sm"
                  : "bg-[#1E2530] text-[#F1F5F9] rounded-tl-sm border border-[#334155]"
              }`}>
                {/* Image — thumbnail with lightbox */}
                {msg.fileUrl && msg.fileType?.startsWith("image/") && (
                  <button
                    onClick={() => setLightboxUrl(msg.fileUrl!)}
                    className="block mb-2 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={msg.fileUrl}
                      alt="attachment"
                      className="rounded-lg max-w-[200px] max-h-[160px] object-cover cursor-pointer"
                    />
                  </button>
                )}

                {/* Document */}
                {msg.fileUrl && msg.fileType && !msg.fileType.startsWith("image/") && (
                  <a
                    href={msg.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs underline mb-2 opacity-80 hover:opacity-100"
                  >
                    📎 View document
                  </a>
                )}

                {msg.content && <p className="leading-relaxed">{msg.content}</p>}

                <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
                  <span className={`text-[10px] ${isMine ? "text-white/60" : "text-[#94A3B8]"}`}>
                    {formatTime(msg.createdAt)}
                  </span>
                  {isMine && (
                    <span className="text-[10px] text-white/60">{msg.read ? "✓✓" : "✓"}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {file && (
        <div className="px-4 py-2 bg-[#1E2530] border-t border-[#334155] flex items-center gap-2">
          <span className="text-[#94A3B8] text-xs truncate max-w-xs">📎 {file.name}</span>
          <button onClick={() => setFile(null)} className="text-red-400 text-xs hover:text-red-300">✕</button>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-4 border-t border-[#334155] bg-[#1E2530] shrink-0">
        <div className="flex items-end gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="shrink-0 w-10 h-10 rounded-xl bg-[#0F1419] border border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-[#06B6D4] hover:border-[#06B6D4] transition-colors"
          >
            📎
          </button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); emitTyping(); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-[#0F1419] border border-[#334155] rounded-xl px-4 py-2.5 text-[#F1F5F9] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#06B6D4] transition-colors resize-none max-h-32"
          />
          <button
            onClick={handleSend}
            disabled={isSending || (!text.trim() && !file)}
            className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <span className="text-sm">➤</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}