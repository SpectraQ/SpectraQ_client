import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Shield, ArrowRight } from "lucide-react";

interface Prediction {
  asset: string;
  action: "LONG" | "SHORT" | "HEDGE";
  confidence: number;
  timeframe: string;
  reason: string;
  suggestedLeverage: number;
}

const predictions: Prediction[] = [
  {
    asset: "BTC",
    action: "LONG",
    confidence: 87,
    timeframe: "4H",
    reason: "Strong momentum above key resistance. Volume increasing.",
    suggestedLeverage: 5,
  },
  {
    asset: "ETH",
    action: "HEDGE",
    confidence: 72,
    timeframe: "1D",
    reason: "Potential reversal pattern forming. Hedge existing longs.",
    suggestedLeverage: 3,
  },
  {
    asset: "SOL",
    action: "LONG",
    confidence: 91,
    timeframe: "2H",
    reason: "Breakout confirmed. Strong institutional buying pressure.",
    suggestedLeverage: 8,
  },
];

export const AIPredictions = () => {
  return (
    <section id="predictions" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-quantum-red">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Analysis
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Smart Trading Signals</h2>
          <p className="text-muted-foreground">
            Real-time predictions and hedge recommendations from our AI engine
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {predictions.map((prediction, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {prediction.asset}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {prediction.timeframe} Timeframe
                    </div>
                  </div>
                  <Badge
                    className={
                      prediction.action === "LONG"
                        ? "bg-success"
                        : prediction.action === "SHORT"
                        ? "bg-destructive"
                        : "bg-quantum-red"
                    }
                  >
                    {prediction.action === "HEDGE" ? (
                      <Shield className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    )}
                    {prediction.action}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">AI Confidence</span>
                    <span className="font-medium text-primary">
                      {prediction.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-quantum-red rounded-full transition-all glow-cyan"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-secondary/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Analysis
                  </div>
                  <div className="text-sm">{prediction.reason}</div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Suggested Leverage
                  </span>
                  <span className="font-bold text-lg text-primary">
                    {prediction.suggestedLeverage}x
                  </span>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 glow-red">
                  Execute Trade
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
