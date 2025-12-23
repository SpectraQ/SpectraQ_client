import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  MessageSquare,
  Globe,
  Hash,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

// Mock Chat Data
const CHAT_MESSAGES = [
  {
    id: 1,
    user: "AlphaSeeker",
    avatar: "A",
    time: "10:42 AM",
    message:
      "BTC bouncing off the 92k support. Order book looking thick on the bid side.",
    tag: "LONG BTC",
    sentiment: "bullish",
  },
  {
    id: 2,
    user: "DeFi_Wizard",
    avatar: "D",
    time: "10:44 AM",
    message: "Just hedged my ETH position. Volatility index is spiking.",
    tag: "HEDGE ETH",
    sentiment: "neutral",
  },
  {
    id: 3,
    user: "SatoshiNakamoto_dev",
    avatar: "S",
    time: "10:45 AM",
    message:
      "Checking the on-chain flows... heavy accumulation on SOL wallets > 100k.",
    tag: "DATA",
    sentiment: "info",
  },
];

export const CommunitySection = () => {
  const [activeUsers, setActiveUsers] = useState(1284);

  // Subtle number ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Copy & Value Prop */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <Globe className="w-3 h-3" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Global Network
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Hive Mind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Market Intelligence.
              </span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed">
              Trading is a PvP game, but you don't have to play solo. Join
              exclusive
              <span className="text-white font-semibold"> State Channels </span>
              where verified traders discuss strategy, share alpha, and execute
              coordinated moves.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-2xl mb-1">
                  <Users className="w-5 h-5 text-blue-500" />
                  {activeUsers.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase">
                  Online Traders
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-2xl mb-1">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  $124M+
                </div>
                <div className="text-xs text-gray-500 font-mono uppercase">
                  Verified PnL Shared
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium text-base">
                Join a Community
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/10 bg-transparent hover:bg-white/5 text-white"
              >
                Explore Channels
              </Button>
            </div>
          </div>

          {/* RIGHT: Chat Interface Simulation */}
          <div className="relative">
            {/* Decorative Background Blob */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-2xl opacity-50" />

            {/* The Terminal Window */}
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Hash className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      btc-strategy-alpha
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      1,204 members • 42 online
                    </div>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-[#0A0A0A] bg-gray-700"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Messages Area */}
              <div className="p-4 space-y-6 min-h-[350px]">
                {CHAT_MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    className="group animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
                    style={{ animationDelay: `${msg.id * 150}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8 border border-white/10">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                        />
                        <AvatarFallback className="bg-gray-800 text-xs text-gray-400">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors cursor-pointer">
                            {msg.user}
                          </span>
                          <span className="text-[10px] text-gray-600 font-mono">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-snug mb-2">
                          {msg.message}
                        </p>
                        {msg.tag && (
                          <Badge
                            variant="outline"
                            className={`
                                     border-0 text-[10px] py-0 px-2 h-5 font-mono
                                     ${
                                       msg.sentiment === "bullish"
                                         ? "bg-green-500/10 text-green-500"
                                         : ""
                                     }
                                     ${
                                       msg.sentiment === "neutral"
                                         ? "bg-yellow-500/10 text-yellow-500"
                                         : ""
                                     }
                                     ${
                                       msg.sentiment === "info"
                                         ? "bg-blue-500/10 text-blue-500"
                                         : ""
                                     }
                                  `}
                          >
                            {msg.tag}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                <div className="flex items-center gap-2 pl-11 opacity-50">
                  <div className="text-[10px] text-gray-500 font-mono animate-pulse">
                    whalewatcher.eth is typing...
                  </div>
                </div>
              </div>

              {/* Input Area (Visual Only) */}
              <div className="p-3 border-t border-white/10 bg-white/[0.02]">
                <div className="h-10 bg-black border border-white/10 rounded-md flex items-center px-3 text-gray-600 text-sm">
                  <MessageSquare className="w-4 h-4 mr-2 opacity-50" />
                  Share your alpha...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
