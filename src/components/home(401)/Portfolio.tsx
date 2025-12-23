import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  PieChart,
  Activity,
} from "lucide-react";

export const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("positions");

  // Simulated Professional Data
  const POSITIONS = [
    {
      asset: "BTC",
      type: "LONG",
      size: 0.85,
      entry: 92400,
      current: 94230,
      pnl: 1555.5,
      leverage: 10,
    },
    {
      asset: "ETH",
      type: "SHORT",
      size: 12.5,
      entry: 3550,
      current: 3450,
      pnl: 1250.0,
      leverage: 5,
    },
    {
      asset: "SOL",
      type: "LONG",
      size: 450,
      entry: 132,
      current: 145,
      pnl: 5850.0,
      leverage: 3,
    },
  ];

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 px-2 py-0.5 text-[10px] tracking-wider uppercase"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                Live Connected
              </Badge>
              <span className="text-xs text-gray-500 font-mono">
                0x71C...9A23
              </span>
            </div>
            <h2 className="text-3xl font-semibold text-quantum-red tracking-tight">
              Portfolio Management
            </h2>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-quantum-red/5 border-white/10 text-gray-300 hover:bg-quantum-red/10 hover:text-white"
            >
              <Activity className="w-4 h-4 mr-2" /> History
            </Button>
            <Button className="bg-quantum-red text-white hover:bg-red-700">
              <Wallet className="w-4 h-4 mr-2" /> Deposit Assets
            </Button>
          </div>
        </div>

        {/* METRICS HEADER (THE HUD)  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg relative overflow-hidden group">
            <div className="text-gray-500 text-xs font-mono uppercase mb-1">
              Net Worth
            </div>
            <div className="text-3xl font-mono text-white tracking-tighter">
              $124,592.00
            </div>
            <div className="flex items-center text-xs text-green-500 mt-2 font-mono">
              <TrendingUp className="w-3 h-3 mr-1" /> +$2,450.23 (24h)
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg">
            <div className="text-gray-500 text-xs font-mono uppercase mb-1">
              Unrealized PnL
            </div>
            <div className="text-2xl font-mono text-green-400">+$8,655.50</div>
            <div className="w-full bg-quantum-red/5 h-1 mt-4 rounded-full overflow-hidden">
              <div className="bg-green-500 w-[70%] h-full"></div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg relative">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-500 text-xs font-mono uppercase mb-1">
                  Health Factor
                </div>
                <div className="text-2xl font-mono text-white">1.85</div>
              </div>
              <ShieldCheck className="text-green-500 w-5 h-5" />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Liquidation at &lt; 1.00
            </div>
            {/* Visual Gauge */}
            <div className="flex gap-1 mt-3">
              <div className="h-1.5 w-full bg-red-500 rounded-sm opacity-20"></div>
              <div className="h-1.5 w-full bg-yellow-500 rounded-sm opacity-20"></div>
              <div className="h-1.5 w-full bg-green-500 rounded-sm"></div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg">
            <div className="text-gray-500 text-xs font-mono uppercase mb-1">
              Active Exposure
            </div>
            <div className="text-2xl font-mono text-white">$425,000</div>
            <div className="text-xs text-yellow-500 mt-2 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" /> High Leverage (4.2x)
            </div>
          </div>
        </div>

        {/* MAIN DASHBOARD AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Positions Table (2/3 width) */}
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden min-h-[400px]">
            <Tabs defaultValue="positions" className="w-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-quantum-red/[0.02]">
                <TabsList className="bg-transparent h-8 p-0 gap-6">
                  <TabsTrigger
                    value="positions"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-quantum-red rounded-none px-0 pb-2 text-gray-500 hover:text-gray-300 transition-all font-medium text-sm"
                  >
                    Open Positions
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-quantum-red rounded-none px-0 pb-2 text-gray-500 hover:text-gray-300 transition-all font-medium text-sm"
                  >
                    Open Orders (2)
                  </TabsTrigger>
                </TabsList>
                <div className="text-xs text-gray-500 font-mono">
                  Auto-refreshing
                </div>
              </div>

              <TabsContent value="positions" className="m-0">
                {/* Table Header */}
                <div className="grid grid-cols-5 px-6 py-3 border-b border-white/5 text-[10px] uppercase text-gray-500 font-mono tracking-wider">
                  <div className="col-span-2">Instrument</div>
                  <div className="text-right">Size</div>
                  <div className="text-right">Entry / Mark</div>
                  <div className="text-right">PnL</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-white/5">
                  {POSITIONS.map((pos) => (
                    <div
                      key={pos.asset}
                      className="grid grid-cols-5 px-6 py-4 items-center hover:bg-quantum-red/[0.02] transition-colors group cursor-pointer"
                    >
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">
                            {pos.asset}-USD
                          </span>
                          <Badge
                            variant="outline"
                            className={`border-0 text-[10px] px-1.5 py-0 rounded-sm ${
                              pos.type === "LONG"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {pos.type} {pos.leverage}x
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300 font-mono">
                          {pos.size} {pos.asset}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          ${(pos.size * pos.current).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right font-mono text-sm text-gray-300">
                        <div>{pos.entry.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500">
                          {pos.current.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-mono text-sm ${
                            pos.pnl > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {pos.pnl > 0 ? "+" : ""}
                          {pos.pnl.toLocaleString()}
                        </div>
                        <div
                          className={`text-[10px] ${
                            pos.pnl > 0
                              ? "text-green-500/70"
                              : "text-red-500/70"
                          }`}
                        >
                          {(
                            (pos.pnl / (pos.size * pos.entry)) *
                            100 *
                            pos.leverage
                          ).toFixed(2)}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT: AI Insights (1/3 width) */}
          <div className="space-y-6">
            {/* AI Suggestion Card */}
            <div className="bg-gradient-to-br from-white/5 to-black border border-white/10 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <PieChart className="w-24 h-24 text-quantum-red rotate-12" />
              </div>

              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Badge className="bg-quantum-red text-white hover:bg-red-600 border-0">
                  AI Action Required
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                Delta Imbalance Detected
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                Your portfolio is 85% Long Delta. Market sentiment is shifting
                Bearish on the 4H timeframe.
              </p>

              <div className="space-y-3 relative z-10">
                <div className="bg-black/40 border border-white/10 p-3 rounded flex items-start gap-3">
                  <ArrowUpRight className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-white">
                      Suggestion: Hedge BTC
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Open 0.5 BTC Short @ Market
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-quantum-red text-white hover:bg-red-700">
                  Execute Auto-Hedge
                </Button>
              </div>
            </div>

            {/* Quick Allocation View */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5">
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                Asset Allocation
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>{" "}
                    BTC
                  </span>
                  <span className="font-mono text-white">65%</span>
                </div>
                <div className="w-full bg-quantum-red/5 h-1 rounded-full">
                  <div className="bg-orange-500 w-[65%] h-full rounded-full"></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>{" "}
                    ETH
                  </span>
                  <span className="font-mono text-white">25%</span>
                </div>
                <div className="w-full bg-quantum-red/5 h-1 rounded-full">
                  <div className="bg-blue-500 w-[25%] h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
