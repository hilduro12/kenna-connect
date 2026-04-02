import { useState } from "react";
import { Search, Send, Paperclip, ArrowLeft, BookOpen, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import {
  conversations as initialConversations,
  statusLabels,
  statusColors,
  roleLabels,
  type Conversation,
  type Message,
} from "@/data/conversations";

const Messages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const filtered = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectConversation = (id: string) => {
    setActiveId(id);
    setMobileShowChat(true);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const handleSend = () => {
    if (!draft.trim() || !activeId) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderId: "me",
      text: draft.trim(),
      timestamp: "Just now",
      isOwn: true,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastMessageTime: "Just now" }
          : c,
      ),
    );
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ─── Inbox sidebar ─── */
  const InboxList = () => (
    <div className="flex h-full flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h1 className="text-lg font-semibold text-foreground">Messages</h1>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background border-border text-sm"
          />
        </div>
      </div>

      {/* Conversation list */}
      <ScrollArea className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Search className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No conversations found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => selectConversation(c.id)}
                className={`w-full px-4 py-3.5 text-left transition-colors hover:bg-muted/30 ${
                  activeId === c.id ? "bg-muted/40" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                      {c.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`truncate text-sm ${c.unread > 0 ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>
                          {c.name}
                        </span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {roleLabels[c.role]}
                        </span>
                      </div>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {c.lastMessageTime}
                      </span>
                    </div>

                    <div className="mt-0.5 flex items-center gap-2">
                      <p className={`truncate text-[13px] ${c.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                        {c.lastMessage}
                      </p>
                      {c.unread > 0 && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                          {c.unread}
                        </span>
                      )}
                    </div>

                    <div className="mt-1.5">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColors[c.status]}`}>
                        {statusLabels[c.status]}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  /* ─── Chat view ─── */
  const ChatView = ({ conversation }: { conversation: Conversation }) => (
    <div className="flex h-full flex-col bg-background">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-6">
        <button
          onClick={() => setMobileShowChat(false)}
          className="mr-1 md:hidden"
          aria-label="Back to inbox"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>

        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
            {conversation.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{conversation.name}</span>
            <span className="text-[11px] text-muted-foreground">{roleLabels[conversation.role]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{conversation.subject}</span>
            <span className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusColors[conversation.status]}`}>
              {statusLabels[conversation.status]}
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {conversation.status === "inquiry" && (
            <Button size="sm" variant="outline" className="text-xs gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Book lesson
            </Button>
          )}
          <Button size="sm" variant="ghost" className="text-xs gap-1.5 text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            View profile
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {conversation.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.isOwn
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted/40 text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`mt-1 text-[11px] ${msg.isOwn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="border-t border-border px-4 py-3 md:px-6">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <button className="mb-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Attach file">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <Input
              placeholder="Write a message…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-muted/20 border-border text-sm"
            />
          </div>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!draft.trim()}
            className="h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  /* ─── Empty state ─── */
  const EmptyChat = () => (
    <div className="flex h-full flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/40">
        <BookOpen className="h-7 w-7 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">Select a conversation</h2>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Choose a conversation from the list to start messaging. You can reach out to teachers before booking a lesson.
      </p>
    </div>
  );

  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile: show list or chat */}
        <div className={`w-full md:hidden ${mobileShowChat ? "hidden" : "block"}`}>
          <InboxList />
        </div>
        <div className={`w-full md:hidden ${mobileShowChat ? "block" : "hidden"}`}>
          {activeConversation ? <ChatView conversation={activeConversation} /> : <EmptyChat />}
        </div>

        {/* Desktop: side-by-side */}
        <div className="hidden md:flex md:flex-1">
          <div className="w-[340px] shrink-0 lg:w-[380px]">
            <InboxList />
          </div>
          <div className="flex-1">
            {activeConversation ? <ChatView conversation={activeConversation} /> : <EmptyChat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
