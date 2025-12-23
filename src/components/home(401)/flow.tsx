import { useEffect, useState } from "react";
import { ArrowRight, Box, CheckCircle2, Zap, Layers, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const StateChannelVisualizer = () => {
  const [step, setStep] = useState(0);

  // Animation cycle loop
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* STAGE 1: Yellow Protocol State Channel (Off-Chain) */}
      <div className="relative z-10 flex-1 w-full">
        <div className="flex items-center gap-2 mb-4">
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          >
            <Zap className="w-3 h-3 mr-1" /> Off-Chain
          </Badge>
          <span className="text-sm font-mono text-gray-400">State Channel</span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 space-y-2 h-[160px] overflow-hidden relative shadow-inner">
          {/* Simulate rapid trades scrolling */}
          <div className="absolute inset-0 p-4 space-y-3 animate-slide-up">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2"
              >
                <span
                  className={i % 2 === 0 ? "text-green-500" : "text-red-500"}
                >
                  {i % 2 === 0 ? "BUY" : "SELL"} BTC-USD
                </span>
                <span className="text-gray-500">0.0{i}4s</span>
              </div>
            ))}
          </div>

          {/* Overlay to show activity */}
          <div
            className={`absolute inset-0 bg-yellow-500/5 transition-opacity duration-300 ${
              step === 1 || step === 0 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div className="text-center mt-2 text-xs text-gray-500 font-mono">
          Status:{" "}
          <span className="text-yellow-500 animate-pulse">MATCHING ORDERS</span>
        </div>
      </div>

      {/* CONNECTION: The Bridge */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={`transition-all duration-500 ${
            step === 2 ? "scale-125 text-white" : "scale-100 text-gray-600"
          }`}
        >
          <ArrowRight className="w-8 h-8" />
        </div>
        <div className="text-[10px] uppercase font-bold text-gray-500 mt-2 tracking-widest bg-black px-2 py-1 rounded border border-white/10">
          Settle Delta
        </div>
      </div>

      {/* STAGE 2: Blockchain (On-Chain) */}
      <div className="relative z-10 flex-1 w-full">
        <div className="flex items-center gap-2 mb-4 justify-end md:justify-start">
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-500 border-blue-500/20"
          >
            <Box className="w-3 h-3 mr-1" /> On-Chain
          </Badge>
          <span className="text-sm font-mono text-gray-400">
            Settlement Layer
          </span>
        </div>

        <div
          className={`bg-[#0A0A0A] border border-white/10 rounded-lg p-4 h-[160px] flex items-center justify-center relative transition-all duration-500 ${
            step === 3
              ? "border-green-500/50 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
              : ""
          }`}
        >
          {step < 3 ? (
            <div className="text-center opacity-50">
              <Layers className="w-8 h-8 mx-auto text-gray-600 mb-2" />
              <div className="text-xs text-gray-500">Waiting for batch...</div>
            </div>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10 mx-auto text-green-500 mb-2" />
              <div className="text-sm font-bold text-white">
                Delta Confirmed
              </div>
              <div className="text-xs text-gray-400 font-mono mt-1">
                Tx: 0x7f...3a2
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-2 text-xs text-gray-500 font-mono">
          Security: <span className="text-blue-500">FINALIZED</span>
        </div>
      </div>
    </div>
  );
};
