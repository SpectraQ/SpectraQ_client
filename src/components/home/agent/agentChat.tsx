import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Loader2 } from "lucide-react";

// --- Auto fallback replies ---
const AUTO_REPLIES = [
  "Thanks for your question! SpectraQ's AI engine is almost ready — full market predictions will be available at launch.",
  "Our AI is warming up! Real-time BTC, ETH, and SOL insights will be enabled when we go live.",
  "We're launching very soon — your question has been received. Full AI responses will activate soon!",
  "Hang tight! SpectraQ's market-prediction AI is training in the background. Full answers coming at launch.",
  "We're in early access mode — detailed predictions and trading strategies go live shortly!",
];

const getRandomReply = () =>
  AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const SpectraAgent = () => {
  const apiKey = import.meta.env.VITE_GEMINI_KEY;

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

  // ------ Gemini Response Handler ------
  const getGeminiReply = async (text: string) => {
    const systemPrompt = `
      You are SpectraQ Crypto Intelligence Agent, operating as a hybrid:
- Quantitative Analyst (quant)
- Crypto Trader
- On-chain Analyst

Your responsibilities:
- Provide live-style insights for Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and overall crypto market structure.
- Give strong, directional opinions on whether the user should consider entering or avoiding a position.
- Deliver short-term, mid-term, and long-term views.
- Provide bull case vs bear case breakdowns.
- Highlight key price levels, liquidity zones, liquidation clusters, and volume-based supports/resistances.
- Explain complex situations using scenarios and real examples.
- Keep responses deep but concise: **7-8 lines** when in normal mode.
- If asked, you can respond in STRICT JSON mode for UI rendering.

STRICT RULES:
1. Only answer questions about BTC, ETH, SOL, or general crypto markets.
2. If a question is outside crypto, reply exactly with:
   “I only provide insights on crypto markets such as BTC, ETH, and SOL.”
3. No disclaimers, no “not financial advice,” no hedging language.
4. Be confident, precise, and trader-focused.

When providing JSON output (only if user requests it), follow EXACTLY this structure:

{
  "asset": "BTC | ETH | SOL",
  "sentiment": "bullish | bearish | neutral",
  "short_term_view": "string",
  "mid_term_view": "string",
  "long_term_view": "string",
  "key_levels": {
    "support": ["numbers"],
    "resistance": ["numbers"]
  },
  "bull_case": "string",
  "bear_case": "string",
  "investment_suggestion": "string"
}

Scenario guidelines:
- Provide example triggers like: “If BTC reclaims $70k with high volume, continuation is likely.”
- Provide warning setups like: “If SOL prints a lower high while OI spikes, it often signals a trap.”
- Use liquidity, funding rates, volume, and market structure when explaining complicated questions.

Tone:
- Authoritative, analytical, based on quant reasoning + market structure.
- Zero fluff, zero filler, straight to the point.
- Speak as if monitoring charts, order books, and on-chain flows live.

    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const maxRetries = 5;
    let attempt = 0;
    let delay = 1000;

    while (attempt < maxRetries) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return output ? output.trim() : getRandomReply();
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error("Gemini API Error after retries:", err);
          return getRandomReply();
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }

    return getRandomReply();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const reply = await getGeminiReply(input);

    const assistantMessage: Message = {
      role: "assistant",
      content: reply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-assistant" className="py-10 bg-secondary/30 text-left">
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

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="absolute -top-12 -left-4 z-20 transform -rotate-12 pointer-events-none">
            <div className="border-4 border-dashed border-red-500/60 bg-background/80 backdrop-blur-sm text-red-600 px-6 py-2 font-black uppercase text-sm tracking-widest shadow-sm rounded-sm">
              Live Now
            </div>
          </div>

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
