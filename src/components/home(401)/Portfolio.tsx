import {
  ShieldAlert,
  Activity,
  BrainCircuit,
  LineChart,
  Layers,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const PortfolioFeatures = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge
            variant="outline"
            className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
          >
            <Activity className="w-3 h-3 mr-1" />
            Portfolio Management Layer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Institutional-Grade <br />
            <span className="text-transparent bg-clip-text bg-quantum-red">
              Position Control.
            </span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Stop trading in the dark. Our portfolio engine provides real-time
            risk telemetry, AI-driven hedge suggestions, and unified
            cross-margin analysis.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FEATURE 1: The Risk Engine (Large Card) */}
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 border border-red-500/20">
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Real-Time Risk Telemetry
                </h3>
                <p className="text-gray-400 max-w-md">
                  We don't just show PnL. We calculate your{" "}
                  <strong>Health Factor</strong>,{" "}
                  <strong>Liquidation Proximity</strong>, and{" "}
                  <strong>Delta Exposure</strong> every block.
                </p>
              </div>

              {/* ABSTRACT VISUALIZATION: The "Scanner" */}
              <div className="mt-8 bg-black/50 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                {/* Scanning Line Animation */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] left-0 animate-[scan_3s_ease-in-out_infinite]" />

                <div className="space-y-4 opacity-50">
                  {/* Abstract Rows representing data */}
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-24 bg-gray-700 rounded-full" />
                    <div className="h-2 w-12 bg-gray-700 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-32 bg-gray-700 rounded-full" />
                    <div className="h-2 w-16 bg-red-500/50 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-20 bg-gray-700 rounded-full" />
                    <div className="h-2 w-8 bg-green-500/50 rounded-full" />
                  </div>
                </div>

                {/* Overlay Label */}
                <div className="absolute bottom-4 right-4 bg-red-900/80 text-red-200 text-[10px] font-mono px-2 py-1 rounded border border-red-500/30 backdrop-blur-md">
                  RISK_SCANNER: ACTIVE
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 2: AI Guardian */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 border border-purple-500/20">
              <BrainCircuit className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Guardian</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              Our model monitors market volatility against your open positions.
              If your risk score spikes, the AI suggests specific hedge trades
              to neutralize delta.
            </p>

            {/* Abstract Suggestion UI */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-20 bg-gray-600 rounded-full" />
                  <div className="h-1.5 w-12 bg-gray-700 rounded-full" />
                </div>
              </div>
              <div className="h-8 w-full bg-purple-600/20 rounded border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-300 font-mono">
                AUTO-HEDGE EXECUTE
              </div>
            </div>
          </div>

          {/* FEATURE 3: Performance Analytics */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 border border-green-500/20">
              <LineChart className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Performance Attribution
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Deep dive into your trading history. Analyze win-rates, Sharpe
              ratios, and fee drag to optimize your strategy.
            </p>
            <div className="mt-auto flex gap-1 h-12 items-end">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500/20 hover:bg-green-500/40 transition-colors rounded-sm border-t border-green-500/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* FEATURE 4: Cross-Chain (Large Card) */}
          <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 border border-blue-500/20">
                <Layers className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Unified Liquidity View
              </h3>
              <p className="text-gray-400 mb-6">
                Managing positions across chains is a nightmare. SpectraQ
                aggregates your state channels into a single "Master View,"
                handling settlement across BTC, ETH, and SOL layers
                automatically.
              </p>
              <Button
                variant="link"
                className="text-blue-400 p-0 hover:text-blue-300"
              >
                Learn about Yellow Protocol Settlement{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Abstract Layer Visual */}
            <div className="flex-1 w-full max-w-xs relative perspective-1000">
              <div className="w-full h-24 bg-gray-900 border border-white/10 rounded-lg transform rotate-x-12 translate-y-4 opacity-50 flex items-center justify-center text-xs text-gray-600 font-mono">
                L1 SETTLEMENT
              </div>
              <div className="w-full h-24 bg-gray-800 border border-white/20 rounded-lg transform -rotate-x-12 -translate-y-8 z-10 flex items-center justify-center text-xs text-gray-400 font-mono shadow-xl">
                STATE CHANNEL
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-px h-full bg-blue-500/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
