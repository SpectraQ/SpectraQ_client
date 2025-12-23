import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Zap, Scale, Network, Lock } from "lucide-react";
import { StateChannelVisualizer } from "./flow";

export const FeaturesBento = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-yellow-500/30 text-yellow-500 bg-yellow-500/10"
          >
            Infrastructure
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Powered by <span className="text-yellow-500">Yellow Protocol</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We solve the blockchain scalability trilemma by moving execution
            off-chain while keeping settlement trustless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* FEATURE 1: State Channel Architecture (Largest Block) */}
          <Card className="md:col-span-8 bg-[#080808] border-white/10 p-1 flex flex-col justify-between overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-yellow-500" />
                <h3 className="text-2xl font-bold text-white">
                  State Channel Execution
                </h3>
              </div>
              <p className="text-gray-400 max-w-lg mb-8 text-left">
                Trades are matched instantly within a dedicated state channel.
                Only the final net difference (Delta) is written to the
                blockchain, reducing gas fees by 99% and enabling HFT speeds.
              </p>

              {/* Embed the Visualizer Component Here */}
              <StateChannelVisualizer />
            </div>
          </Card>

          {/* FEATURE 2: AI (Vertical Block) */}
          <Card className="md:col-span-4 bg-gradient-to-b from-white/5 to-black border-white/10 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-700">
              <Brain className="w-32 h-32 text-quantum-red -rotate-12 translate-x-10 -translate-y-10" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-end">
              <div className="w-12 h-12 rounded-lg bg-quantum-red/10 flex items-center justify-center mb-6 border border-quantum-red/20">
                <Scale className="w-6 h-6 text-quantum-red" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                AI-Balanced Risk
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our engines monitor your channel state in real-time. If market
                volatility exceeds your threshold, the AI automatically hedges
                your exposure before the channel settles.
              </p>
            </div>
          </Card>

          {/* FEATURE 3: Speed Stats */}
          <Card className="md:col-span-4 bg-[#080808] border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-mono text-gray-500 uppercase">
                Latency
              </span>
            </div>
            <div className="text-4xl font-mono text-white font-bold">~20ms</div>
            <p className="text-xs text-gray-500 mt-2">
              Time to finality (Off-chain)
            </p>
          </Card>

          {/* FEATURE 4: Gas Savings */}
          <Card className="md:col-span-4 bg-[#080808] border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-mono text-gray-500 uppercase">
                Gas Savings
              </span>
            </div>
            <div className="text-4xl font-mono text-white font-bold">99.8%</div>
            <p className="text-xs text-gray-500 mt-2">
              Vs. Traditional DEX AMMs
            </p>
          </Card>

          {/* FEATURE 5: Security */}
          <Card className="md:col-span-4 bg-[#080808] border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-mono text-gray-500 uppercase">
                Custody
              </span>
            </div>
            <div className="text-2xl font-bold text-white">Non-Custodial</div>
            <p className="text-xs text-gray-500 mt-2">
              Funds locked in smart contract
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
