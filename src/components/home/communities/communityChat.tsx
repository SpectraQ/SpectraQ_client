import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, User } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  text: string;
  createdAt: string;
  userType: "admin" | "member" | "creator";
}

interface CommunityChatProps {
  communityId: string;
  communityName: string;
}

type UserObj = {
  id?: string;
  username?: string;
  email?: string;
  [k: string]: any;
};

export const CommunityChat = ({
  communityId,
  communityName,
}: CommunityChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string>("");

  const scrollAreaRef = useRef<any>(null);
  const socketRef = useRef<Socket | null>(null);

  // read current logged in user object from localStorage (expects JSON.stringify user)
  const currentUser: UserObj | null = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  })();

  const currentUsername = currentUser?.username || null;
  const currentUserId = currentUser?.id || null;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        try {
          // For shadcn ScrollArea, find the viewport element
          const viewport = scrollAreaRef.current.querySelector(
            "[data-radix-scroll-area-viewport]"
          );
          if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
          } else {
            // fallback: if ref is the element itself
            (scrollAreaRef.current as HTMLElement).scrollTop = (
              scrollAreaRef.current as HTMLElement
            ).scrollHeight;
          }
        } catch (err) {
          console.error("Scroll error:", err);
        }
      }, 50);
    }
  }, [messages]);

  useEffect(() => {
    if (!communityId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to use community chat");
      return;
    }

    const socketUrl = import.meta.env.VITE_URL_CHAT || window.location.origin;

    const socket = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setJoining(true);
      setError("");

      let ackCalled = false;
      const joinTimeout = setTimeout(() => {
        if (!ackCalled) {
          ackCalled = true;
          setJoining(false);
          setError("Chat join timed out. Please try again.");
        }
      }, 10000);

      socket.emit("join_room", { roomId: communityId }, (res: any) => {
        if (ackCalled) return;
        ackCalled = true;
        clearTimeout(joinTimeout);
        setJoining(false);

        if (!res || !res.ok) {
          const errorMsg = res?.reason || res?.message || "Failed to join room";
          setError(errorMsg);
          console.error("Join failed:", res);
          return;
        }

        const hist: Message[] = (res.history || []).map((m: any) => ({
          id: m.id || `${m.senderId}-${m.createdAt}`,
          senderId: m.senderId,
          senderName: m.senderName || "Unknown",
          text: m.text,
          createdAt: m.createdAt,
          userType: m.userType || "member",
        }));
        setMessages(hist);
      });
    });

    socket.on("disconnect", () => {
      setConnected(false);
      setError("Disconnected from chat");
    });

    socket.on("message", (m: any) => {
      const msg: Message = {
        id: m.id || `${m.senderId}-${m.createdAt}`,
        senderId: m.senderId,
        senderName: m.senderName || "Unknown",
        text: m.text,
        createdAt: m.createdAt,
        userType: m.userType || "member",
      };

      setMessages((prev) => {
        if (prev.some((existing) => existing.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    // socket.on("user_joined", (info: any) => {
    //   const sys: Message = {
    //     id: `joined-${info.userId}-${Date.now()}`,
    //     senderId: "system",
    //     senderName: "System",
    //     text: `${info.username || "Someone"} joined the chat`,
    //     createdAt: new Date().toISOString(),
    //     userType: "admin",
    //   };
    //   setMessages((prev) => [...prev, sys]);
    // });

    // socket.on("user_left", (info: any) => {
    //   const sys: Message = {
    //     id: `left-${info.userId}-${Date.now()}`,
    //     senderId: "system",
    //     senderName: "System",
    //     text: `${info.username || "Someone"} left the chat`,
    //     createdAt: new Date().toISOString(),
    //     userType: "admin",
    //   };
    //   setMessages((prev) => [...prev, sys]);
    // });

    socket.on("connect_error", (err: any) => {
      console.error("Socket connect_error", err);
      setError(`Connection error: ${err?.message || "Unknown error"}`);
    });

    return () => {
      if (socket) {
        if (socket.connected) {
          socket.emit("leave_room", communityId);
        }
        socket.disconnect();
      }
    };
  }, [communityId]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const text = newMessage.trim();
    if (!text || !socketRef.current || !connected) return;

    const socket = socketRef.current;
    const tempId = `temp-${Date.now()}-${Math.random()}`;

    const optimistic: Message = {
      id: tempId,
      senderId: currentUserId || "me",
      senderName: currentUsername || "You",
      text,
      createdAt: new Date().toISOString(),
      userType: "member",
    };

    setMessages((prev) => [...prev, optimistic]);
    setNewMessage("");

    let ackReceived = false;
    const ackTimeout = setTimeout(() => {
      if (!ackReceived) {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
        setError("Message send timeout");
      }
    }, 5000);

    socket.emit("send_message", { roomId: communityId, text }, (ack: any) => {
      ackReceived = true;
      clearTimeout(ackTimeout);

      if (!ack || !ack.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
        setError(ack?.message || "Failed to send message");
      } else {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
      }
    });
  };

  const getUserBadgeColor = (userType: string) => {
    switch (userType) {
      case "admin":
        return "bg-red-500/20 text-red-400";
      case "creator":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Card className="h-[500px] flex flex-col overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          {communityName} Chat
          <div className="ml-3 text-xs text-muted-foreground">
            {joining ? "Joining..." : connected ? "🟢 Online" : "🔴 Offline"}
          </div>
        </CardTitle>
        {error && <div className="text-xs text-red-400 mt-2">{error}</div>}
      </CardHeader>

      {/* Constrain scroll area so chat doesn't overflow the layout.
          Using flex-1 + overflow-auto ensures the content scrolls within the card.
      */}
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea
          className="flex-1 px-6"
          ref={scrollAreaRef}
          style={{ minHeight: 0 }} // ensure the ScrollArea can shrink in flex containers
        >
          <div className="space-y-4 pb-4">
            {messages.map((message) => {
              // Determine ownership by comparing senderName to stored user username OR senderId to id
              const isMine =
                (currentUsername && message.senderName === currentUsername) ||
                (currentUserId && message.senderId === currentUserId);

              // System messages should be centered and not aligned left/right
              const isSystem =
                message.senderId === "system" ||
                message.senderName === "System";

              return (
                <div
                  key={message.id}
                  className={`flex flex-col gap-1 ${
                    isSystem
                      ? "items-center"
                      : isMine
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isMine ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Badge className={getUserBadgeColor(message.userType)}>
                      {isSystem
                        ? "System"
                        : isMine
                        ? "You"
                        : message.senderName || message.senderId}
                    </Badge>
                    {!isSystem && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                    {isSystem && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>

                  <div
                    className={`rounded-lg p-3 max-w-[80%] break-words ${
                      isSystem
                        ? "bg-transparent text-center text-muted-foreground"
                        : isMine
                        ? "bg-blue-600/20 text-right text-white ml-0 mr-2"
                        : "bg-muted/20 ml-4 mr-0 text-left"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Input section fixed at bottom of CardContent */}
        <div className="p-4 border-t bg-card">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!connected || joining}
              className="flex-1"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!connected || joining || !newMessage.trim()}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityChat;
