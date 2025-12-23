import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  Send,
  Cpu,
  Activity,
  Zap,
  Maximize2,
  Command,
  Sparkles,
} from "lucide-react";

// --- Auto Replies (Kept your logic, updated tone) ---
const AUTO_REPLIES = [
  "Processing request... [SYSTEM_NOTE]: The AI Prediction Engine is currently in pre-launch training mode. Full inference capabilities will be enabled at TGE.",
  "Analyzing market sentiment... [STATUS]: 98% Confidence. This feature is restricted to the closed beta. Please check back after launch.",
  "Query received. [LOG]: Accessing on-chain liquidity pools... Access Denied (Pre-Launch). Full trading signals activate soon.",
  "[SYSTEM]: Neural Net warming up. Real-time inference for BTC/ETH/SOL is currently sandbox-only. Live data unlocks at launch.",
];

const getRandomReply = () =>
  AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  id: string;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "SpectraQ Terminal v2.0 initialized. Ready for query. \nAccessing 48 market data streams...",
      timestamp: new Date(),
      id: "init-1",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI delay
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: getRandomReply(),
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quantum-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <Badge
            variant="outline"
            className="mb-4 border-purple-500/30 text-purple-400 bg-purple-500/10"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Alpha Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-quantum-red mb-2">
            Algorithmic Guidance
          </h2>
          <p className="text-gray-400">
            Direct interface with our proprietary sentiment engine.
          </p>
        </div>

        {/* TERMINAL CONTAINER */}
        <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
          {/* LEFT: System Sidebar (Hidden on small screens) */}
          <div className="hidden md:flex w-64 border-r border-white/10 flex-col bg-black/40 backdrop-blur-sm p-4">
            <div className="text-xs font-mono text-gray-500 uppercase mb-4 tracking-wider">
              System Metrics
            </div>

            <div className="space-y-6">
              {/* Stat 1 */}
              <div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-mono mb-1">
                  <Cpu className="w-4 h-4 text-quantum-red" />
                  <span>Model Load</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-quantum-red w-[45%] h-full animate-pulse"></div>
                </div>
                <div className="text-right text-[10px] text-gray-500 mt-1">
                  45% / 128GB
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-mono mb-1">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span>Latency</span>
                </div>
                <div className="text-xl font-mono text-white">
                  12<span className="text-gray-600 text-sm">ms</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="flex items-center gap-2 text-gray-300 text-sm font-mono mb-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Tokens/Sec</span>
                </div>
                <div className="text-xl font-mono text-white">842</div>
              </div>

              <div className="pt-8 mt-auto">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase mb-1">
                    Active Model
                  </div>
                  <div className="text-xs font-mono text-purple-400">
                    Spectra-LM-7B-v4
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Main Chat Area */}
          <div className="flex-1 flex flex-col bg-black/20">
            {/* Terminal Title Bar */}
            <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-mono text-gray-400">
                  /bin/spectraq_agent --interactive
                </span>
              </div>
              <Maximize2 className="w-4 h-4 text-gray-600 cursor-pointer hover:text-white" />
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider ${
                          message.role === "user"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }`}
                      >
                        {message.role === "user" ? "[USR-01]" : "[SYSTEM]"}
                      </span>
                      <span className="text-[10px] text-gray-600 font-mono">
                        {message.timestamp.toLocaleTimeString([], {
                          hour12: false,
                        })}
                      </span>
                    </div>

                    {/* Message Body */}
                    <div
                      className={`
                             max-w-[85%] rounded-sm p-3 font-mono text-sm leading-relaxed border-l-2
                             ${
                               message.role === "user"
                                 ? "bg-blue-500/10 border-blue-500 text-blue-100"
                                 : "bg-purple-500/5 border-purple-500 text-gray-300"
                             }
                          `}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-500">
                        [SYSTEM]
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-500 font-mono text-sm">
                      <span className="animate-pulse">_</span> computing
                      response
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              {/* Quick Suggestions */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  "Analyze BTC Trend",
                  "Suggest Hedge Strategy",
                  "Risk Report",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Input Field */}
              <div className="relative flex items-center gap-2">
                <span className="text-green-500 font-mono text-lg">{">"}</span>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-none text-white font-mono focus-visible:ring-0 placeholder:text-gray-700 h-10 px-2"
                  placeholder="Enter command or query..."
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="bg-quantum-red text-white hover:bg-red-700 h-8 w-8 rounded-sm"
                >
                  <Send className="h-4 w-4 " />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
