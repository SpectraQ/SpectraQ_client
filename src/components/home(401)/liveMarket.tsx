import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  prediction: "bullish" | "bearish" | "neutral";
  confidence: number;
}

const markets: MarketData[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 98750.42,
    change24h: 2.45,
    prediction: "bullish",
    confidence: 87,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3842.18,
    change24h: -1.23,
    prediction: "bullish",
    confidence: 72,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 245.67,
    change24h: 5.78,
    prediction: "bullish",
    confidence: 91,
  },
];

export const MarketOverview = () => {
  return (
    <section id="markets" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Market Data</h2>
          <p className="text-muted-foreground">
            Real-time prices with AI-powered predictions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {markets.map((market) => (
            <Card
              key={market.symbol}
              className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{market.symbol}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {market.name}
                    </p>
                  </div>
                  <Badge
                    variant={
                      market.prediction === "bullish"
                        ? "default"
                        : "destructive"
                    }
                    className={
                      market.prediction === "bullish"
                        ? "success text-black"
                        : ""
                    }
                  >
                    {market.prediction}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">
                    ${market.price.toLocaleString()}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium mt-1 ${
                      market.change24h >= 0
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {market.change24h >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {Math.abs(market.change24h)}% (24h)
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">AI Confidence</span>
                    <span className="font-medium text-primary">
                      {market.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r bg-quantum-red rounded-full transition-all"
                      style={{ width: `${market.confidence}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
