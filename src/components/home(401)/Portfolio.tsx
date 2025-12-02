import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Wallet, AlertTriangle } from "lucide-react";

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Portfolio Overview</h2>
          <p className="text-muted-foreground">
            Track your positions and risk metrics in real-time
          </p>
        </div>

        {/* Added 'relative z-10' to this container to position the stamp */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8 relative z-10">
          
          {/* --- START: Launching Soon Stamp --- */}
          <div className="absolute -top-6 -left-4 z-20 transform -rotate-12 pointer-events-none">
            <div className="border-4 border-dashed border-red-500/60 bg-background/80 backdrop-blur-sm text-red-600 px-6 py-2 font-black uppercase text-sm tracking-widest shadow-sm rounded-sm">
              Launching Soon
            </div>
          </div>
          {/* --- END: Stamp --- */}

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$87,450</div>
              <div className="flex items-center gap-1 text-sm text-success mt-1">
                <TrendingUp className="h-4 w-4" />
                +8.2% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total PnL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">+$5,400</div>
              <div className="text-sm text-muted-foreground mt-1">
                Realized: $3,200
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">6.5</div>
                <Badge
                  variant="destructive"
                  className="border-primary text-primary"
                >
                  Medium
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Leverage: 7.2x avg
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hedge Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42%</div>
              <div className="flex items-center gap-1 text-sm text-primary mt-1 text-quantum-red">
                <Shield className="h-4 w-4" />
                Well Protected
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Active Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    asset: "BTC",
                    type: "Long",
                    size: "$50,000",
                    pnl: "+$6,200",
                    pnlPercent: 12.4,
                  },
                  {
                    asset: "ETH",
                    type: "Long",
                    size: "$25,000",
                    pnl: "-$800",
                    pnlPercent: -3.2,
                  },
                  {
                    asset: "SOL",
                    type: "Long",
                    size: "$12,000",
                    pnl: "+$1,890",
                    pnlPercent: 15.75,
                  },
                ].map((position, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                  >
                    <div>
                      <div className="font-bold">{position.asset}-USD</div>
                      <div className="text-sm text-muted-foreground">
                        {position.type} • {position.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${
                          position.pnlPercent >= 0
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {position.pnl}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {position.pnlPercent >= 0 ? "+" : ""}
                        {position.pnlPercent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                AI Hedge Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left">
                <div className="p-4 bg-red-500/10 border border-/30 rounded-lg border-red-500/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold">BTC Position Hedge</div>
                    <Badge className="bg-primary">High Priority</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Open a 3x short position on BTC to hedge against potential
                    reversal. Suggested size: $15,000.
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline">87% Confidence</Badge>
                    <Badge variant="outline">-30% Risk Reduction</Badge>
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold">ETH Stop Loss Update</div>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Tighten stop loss to $3,750 to protect profits as resistance
                    approaches.
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline">72% Confidence</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};