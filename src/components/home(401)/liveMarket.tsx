import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

// interface matching your API structure + new UI needs
interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  signal: "LONG" | "SHORT" | "NEUTRAL"; // Renamed from 'prediction' to fit new UI
  confidence: number;
}

export const MarketOverview = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());

  const API_URL = import.meta.env.VITE_URL_MARKET;
  const CACHE_KEY = "market_data_cache";
  const CACHE_TIME = 60 * 60 * 1000; // 60 MIN

  const fetchMarketData = async (forceRefresh = false) => {
    setLoading(true);
    setError("");

    try {
      // 1. Check Cache (unless forcing refresh)
      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TIME) {
            console.log("⚡ Using cached crypto data");
            setMarkets(parsed.data);
            setLastUpdated(parsed.timestamp);
            setLoading(false);
            return;
          }
        }
      }

      // 2. Fetch Fresh Data
      // Note: Added a fallback in case env var is missing during dev
      const endpoint = API_URL ? `${API_URL}/api/v1/markets/home3` : null;

      if (!endpoint) throw new Error("API URL not configured");

      const res = await axios.get(endpoint);
      const data = res.data.data;

      // 3. Map Data & Generate AI Confidence
      const mapped: MarketData[] = data.map((coin: any) => ({
        symbol: coin.symbol,
        name: coin.name,
        price: coin.quote.USD.price,
        change24h: coin.quote.USD.percent_change_24h,
        // Mapping logic: Positive = LONG, Negative = SHORT
        signal:
          coin.quote.USD.percent_change_24h > 0
            ? "LONG"
            : coin.quote.USD.percent_change_24h < 0
            ? "SHORT"
            : "NEUTRAL",
        // Keep your original random confidence logic
        confidence: Math.min(
          95,
          Math.max(50, Math.floor(Math.random() * 40 + 55))
        ),
      }));

      // 4. Update Cache & State
      const timestamp = Date.now();
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp, data: mapped })
      );

      setMarkets(mapped);
      setLastUpdated(timestamp);
    } catch (err: any) {
      console.error(err);
      // If fetch fails, try to load stale cache as fallback
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setMarkets(parsed.data);
        setError("Network error. Showing cached data.");
      } else {
        setError(err.message || "Failed to fetch market data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  // Format time for "Last updated" display
  const formatTime = (ms: number) => {
    return new Date(ms).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section
      className="py-24 bg-[#050505] border-y border-white/5"
      id="markets"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-semibold text-quantum-red text-left tracking-tight">
              Live Market Intelligence
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-gray-400">
                Real-time sentiment analysis engine.
              </p>
              {loading && (
                <span className="text-xs text-yellow-500 animate-pulse">
                  • Updating feed...
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 hidden sm:inline-block">
              Last sync: {formatTime(lastUpdated)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchMarketData(true)}
              disabled={loading}
              className="border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            >
              <RefreshCw
                className={`w-3 h-3 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Data Table */}
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black min-h-[300px]">
          {/* Table Header */}
          <div className="grid grid-cols-5 p-4 bg-white/5 border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">Asset pair</div>
            <div className="text-right">Price</div>
            <div className="text-right">24h Change</div>
            <div className="text-right">AI Signal</div>
          </div>

          {/* Loading Skeleton */}
          {loading && markets.length === 0 ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-white/5 rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            /* Table Body */
            <div className="divide-y divide-white/5">
              {markets.map((item) => (
                <div
                  key={item.symbol}
                  className="grid grid-cols-5 p-4 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  {/* Column 1: Asset Name */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-300 group-hover:bg-quantum-red group-hover:text-white transition-colors">
                      {item.symbol[0]}
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {item.symbol}
                      </div>
                      <div className="text-xs text-gray-500">{item.name}</div>
                    </div>
                  </div>

                  {/* Column 2: Price */}
                  <div className="text-right font-mono text-gray-300">
                    $
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>

                  {/* Column 3: Change */}
                  <div
                    className={`text-right font-mono flex items-center justify-end gap-1 ${
                      item.change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.change24h >= 0 ? "+" : ""}
                    {item.change24h.toFixed(2)}%
                  </div>

                  {/* Column 4: AI Signal & Confidence */}
                  <div className="text-right flex justify-end gap-3 items-center">
                    <span className="text-xs text-gray-600 font-mono hidden sm:inline-block">
                      Conf: {item.confidence}%
                    </span>
                    <Badge
                      variant="outline"
                      className={`
                            border-0 font-mono text-[10px] px-2 py-1 rounded-sm w-16 justify-center
                            ${
                              item.signal === "LONG"
                                ? "bg-green-500/10 text-green-500"
                                : ""
                            }
                            ${
                              item.signal === "SHORT"
                                ? "bg-red-500/10 text-red-500"
                                : ""
                            }
                            ${
                              item.signal === "NEUTRAL"
                                ? "bg-gray-500/10 text-gray-500"
                                : ""
                            }
                        `}
                    >
                      {item.signal}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && markets.length === 0 && !error && (
            <div className="p-12 text-center text-gray-500">
              No market data available.
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <Button variant="link" className="text-gray-500 hover:text-white">
            View all 1,200+ markets <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
