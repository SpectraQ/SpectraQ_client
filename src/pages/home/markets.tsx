import { useState } from "react";
import { useGetPricesQuery } from "@/store/marketPrices";
import { LiveMarketCard } from "../../components/home/markets/marketCard";
import type { LiveMarketData } from "../../components/home/markets/marketCard";
import { Loader2, RefreshCcw, Search } from "lucide-react";

// shadcn UI
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export const LiveMarket = () => {
  const CACHE_KEY = "spectraq_markets_cache";
  const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes
  const limit = 9;

  // ---- Init from localStorage ----
  const initState = () => {
    if (typeof window === "undefined") {
      return { markets: [] as LiveMarketData[], start: 1, skipApi: false };
    }

    const cachedStr = localStorage.getItem(CACHE_KEY);
    if (!cachedStr) return { markets: [], start: 1, skipApi: false };

    try {
      const parsed = JSON.parse(cachedStr);
      const isValid =
        parsed &&
        Array.isArray(parsed.data) &&
        typeof parsed.timestamp === "number" &&
        Date.now() - parsed.timestamp < CACHE_DURATION;

      if (!isValid) return { markets: [], start: 1, skipApi: false };

      const nextStart = parsed.data.length + 1;
      return { markets: parsed.data, start: nextStart, skipApi: true };
    } catch {
      return { markets: [], start: 1, skipApi: false };
    }
  };

  const initial = initState();

  const [markets, setMarkets] = useState<LiveMarketData[]>(initial.markets);
  const [start, setStart] = useState(initial.start);
  const [skipApi, setSkipApi] = useState(initial.skipApi);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // NEW: search + sort
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("none");

  // NEW: track last updated time
  const [lastUpdated, setLastUpdated] = useState(
    localStorage.getItem("spectraq_markets_timestamp") || ""
  );

  const { data, isLoading, error, isFetching } = useGetPricesQuery(
    { start, limit },
    { skip: skipApi }
  );

  const mapMarketData = (apiData: any[]): LiveMarketData[] =>
    apiData.map((coin) => ({
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

  // Append new data and update cache
  if (data?.data && !isFetching && !isRefreshing) {
    const mapped = mapMarketData(data.data);

    const existing = new Set(markets.map((m) => `${m.symbol}-${m.price}`));
    const filtered = mapped.filter(
      (m) => !existing.has(`${m.symbol}-${m.price}`)
    );

    if (filtered.length > 0) {
      const updated = [...markets, ...filtered];
      setMarkets(updated);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: updated })
      );

      // NEW: update timestamp
      localStorage.setItem("spectraq_markets_timestamp", Date.now().toString());
      setLastUpdated(Date.now().toString());
    }
  }

  // --- Load more ---
  const handleLoadMore = () => {
    setSkipApi(false);
    setStart((prev: any) => prev + limit);
  };

  // --- Refresh ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem("spectraq_markets_timestamp");
    setMarkets([]);
    setStart(1);
    setSkipApi(false);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // FILTER + SORT (only UI transforms)
  let displayedMarkets = [...markets];

  // 🔍 Search filter
  if (search.trim()) {
    const q = search.toLowerCase();
    displayedMarkets = displayedMarkets.filter(
      (m) =>
        m.name.toLowerCase().includes(q) || m.symbol.toLowerCase().includes(q)
    );
  }

  // ↕️ Sorting
  if (sortBy === "gainers") {
    displayedMarkets.sort((a, b) => b.change24h - a.change24h);
  }
  if (sortBy === "losers") {
    displayedMarkets.sort((a, b) => a.change24h - b.change24h);
  }
  if (sortBy === "marketcap") {
    displayedMarkets.sort((a, b) => b.price - a.price);
  }

  // NEW: Relative time text
  const lastUpdatedText = lastUpdated
    ? `${Math.floor((Date.now() - Number(lastUpdated)) / 60000)} mins ago`
    : "Never";

  return (
    <section className="py-5 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-left">
          <h2 className="text-4xl font-bold">Market Prices</h2>
          <p className="text-muted-foreground">
            Live crypto data with AI-powered insights
          </p>
        </div>

        {/* 🔍 Search + Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-center mb-10">
          {/* Search Input */}
          <div className="relative w-full md:w-10/11">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search BTC, ETH, Solana..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="bg-black">
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="gainers">Top Gainers</SelectItem>
              <SelectItem value="losers">Top Losers</SelectItem>
              <SelectItem value="marketcap">Highest Price</SelectItem>
            </SelectContent>
          </Select>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            {isRefreshing || isFetching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayedMarkets.map((market, index) => (
            <LiveMarketCard key={index} market={market} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            {isFetching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Load More"
            )}
          </button>
        </div>

        {/* NEW: Last updated footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Last updated: <span className="font-medium">{lastUpdatedText}</span>
        </p>
      </div>
    </section>
  );
};
