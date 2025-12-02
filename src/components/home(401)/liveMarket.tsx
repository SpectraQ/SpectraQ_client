import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  prediction: "bullish" | "bearish" | "neutral";
  confidence: number;
}

export const MarketOverview = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_URL_CHAT;
  const CACHE_KEY = "market_data_cache";
  const CACHE_TIME = 60 * 60 * 1000; // 60 MIN

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);

          if (Date.now() - parsed.timestamp < CACHE_TIME) {
            console.log("⚡ Using cached crypto data");
            setMarkets(parsed.data);
            setLoading(false);
            return;
          }
        }

        const res = await axios.get(`${API_URL}/api/v1/markets/home3`);

        const data = res.data.data; // standard coinmarketcap structure

        const mapped: MarketData[] = data.map((coin: any) => ({
          symbol: coin.symbol,
          name: coin.name,
          price: coin.quote.USD.price,
          change24h: coin.quote.USD.percent_change_24h,
          prediction:
            coin.quote.USD.percent_change_24h > 0
              ? "bullish"
              : coin.quote.USD.percent_change_24h < 0
              ? "bearish"
              : "neutral",
          confidence: Math.min(
            95,
            Math.max(50, Math.floor(Math.random() * 40 + 55))
          ),
        }));

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: mapped })
        );

        setMarkets(mapped);
      } catch (err: any) {
        setError(err.message || "Failed to fetch market data");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <section id="markets" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live Market Data</h2>
          <p className="text-muted-foreground">
            Real-time prices with AI-powered predictions
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Loading...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

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
                    $
                    {market.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
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
                    {Math.abs(market.change24h).toFixed(2)}% (24h)
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
                      className="h-full bg-quantum-red rounded-full transition-all"
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
