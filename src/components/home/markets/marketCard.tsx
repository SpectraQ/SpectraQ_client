import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface LiveMarketData {
  symbol: string;
  name: string;
  price: number;
  change1h: number;
  prediction: "bullish" | "bearish" | "neutral";
  confidence: number;
}

export function LiveMarketCard({ market }: { market: LiveMarketData }) {
  const isBullish = market.prediction === "bullish";
  const isBearish = market.prediction === "bearish";

  const getPredictionBadge = () => {
    if (isBullish)
      return (
        <Badge className="bg-success/15 text-success border border-success/20">
          Bullish
        </Badge>
      );

    if (isBearish)
      return (
        <Badge className="bg-destructive/15 text-destructive border border-destructive/20">
          Bearish
        </Badge>
      );

    return (
      <Badge variant="outline" className="text-muted-foreground">
        Neutral
      </Badge>
    );
  };

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-quantum-gray-light/5 to-quantum-gray-light/10 z-0"></div>

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">{market.symbol}</h3>
            <p className="text-sm text-muted-foreground">{market.name}</p>
          </div>
          {getPredictionBadge()}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Price Section */}
        <div>
          <div className="text-3xl font-bold">
            ${market.price.toLocaleString()}
          </div>

          <div
            className={`flex items-center gap-1 text-sm font-medium mt-1 ${
              market.change1h >= 0 ? "text-success" : "text-destructive"
            }`}
          >
            {market.change1h >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(market.change1h)}% (1h)
          </div>
        </div>

        {/* AI Confidence */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">AI Confidence</span>
            <span className="font-medium text-primary">
              {market.confidence}%
            </span>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-quantum-red rounded-full transition-all"
              style={{ width: `${market.confidence}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
