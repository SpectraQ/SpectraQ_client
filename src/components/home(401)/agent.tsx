import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Loader2 } from "lucide-react";
// Assuming assets are in this path, otherwise this might need adjustment based on project structure
// import board from "../../assets/board.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm SpectraQ AI Assistant. Ask me anything about market predictions, trading strategies, or risk management for BTC, ETH, and SOL.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // later: call your backend / AI here and push assistant message
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-assistant" className="py-20 bg-secondary/30 text-left">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-quantum-red">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Assistant
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Ask Our AI Assistant</h2>
          <p className="text-muted-foreground">
            Get instant answers about market predictions and trading strategies
          </p>
        </div>

        {/* Wrapper div with relative positioning for the stamp */}
        <div className="max-w-4xl mx-auto relative z-10">
          {/* --- START: Launching Soon Stamp --- */}
          <div className="absolute -top-12 -left-4 z-20 transform -rotate-12 pointer-events-none">
            <div className="border-4 border-dashed border-red-500/60 bg-background/80 backdrop-blur-sm text-red-600 px-6 py-2 font-black uppercase text-sm tracking-widest shadow-sm rounded-sm">
              Launching Soon
            </div>
          </div>
          {/* --- END: Stamp --- */}

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                SpectraQ AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4 mb-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.role === "assistant" && (
                            <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p className="text-xs opacity-60 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-4 rounded-lg bg-secondary">
                        <div className="flex items-center gap-2">
                          <Bot className="h-5 w-5" />
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about market predictions, trading strategies..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90 glow-red"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                <p>💡 Try asking:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    "What's your prediction for BTC in the next 24 hours?"
                  </li>
                  <li>"How can I hedge my ETH position?"</li>
                  <li>"What's the best leverage ratio for SOL trading?"</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
