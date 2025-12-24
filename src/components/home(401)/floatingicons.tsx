import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// --- 1. Native Color Icons ---

const BinanceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      fill="#F0B90B"
      d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6366-4.6366L24 12l-2.7154 2.7164L18.5682 12l2.6924-2.7164zm-9.272.331l2.7163 2.6954-2.7164 2.7174-2.7163-2.7174 2.7163-2.6954zm-4.6356-.331l2.6925 2.6925L7.352 12l2.7154-2.7154L12 11.9765l-2.6935-2.6935L7.352 7.329l-2.7174 2.7164L0 12l2.7154 2.7164zM11.9885.0115l7.353 7.329-2.7174 2.7154-4.6356-4.6356-4.6355 4.6355-2.7175-2.7154 7.353-7.329z"
    />
  </svg>
);

const CoinbaseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <circle cx="12" cy="12" r="12" fill="#0052FF" />
    <path
      d="M16.5 12c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5 2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5zm-2.5 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"
      fill="white"
    />
  </svg>
);

const UniswapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path fill="#FF007A" d="M24 0H0v24h24V0z" opacity="0" />
    <path
      fill="#FF007A"
      d="M4.64 15.35C3.39 16.92 2.62 18.23 2.62 18.23c-.76 1.48.21 3.48 2.03 3.48h14.88c1.72 0 2.87-2.07 1.99-3.51 0 0-2.93-4.57-5.17-8.15l.02-.01c-.34-.52-.66-1.03-.95-1.52.28-.48.59-.97.94-1.46l4.28-6.09c.77-1.1-.03-2.62-1.37-2.62H8.36c-1.63 0-2.83 1.64-2.31 3.18l.21.62c.76 2.25 3.1 3.45 5.37 2.76.54-.16.94-.58 1.1-1.12.18-.59-.07-1.19-.57-1.48-.38-.22-.85-.18-1.19.11-.12.1-.28.16-.43.16-.16 0-.31-.06-.42-.17-.23-.23-.23-.61 0-.84.23-.23.61-.23.84 0 .59.59 1.55.59 2.14 0 .59-.59.59-1.55 0-2.14-.59-.59-1.55-.59-2.14 0-.46.46-.58 1.17-.32 1.76l4.7 6.69c.12.17.06.41-.13.5l-4.7 2.15c-.46.21-.99.21-1.45 0l-4.7-2.15c-.19-.09-.25-.33-.13-.5l.04-.06z"
    />
  </svg>
);

const KrakenIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      fill="#57009A"
      d="M12.986 1.565c.677-.282 1.412-.047 1.83.565l7.98 12.06c.418.611.373 1.432-.107 1.988l-3.386 3.94c-.48.556-1.306.66-1.914.242-1.89-1.29-4.223-2.038-6.723-2.038-1.57 0-3.073.294-4.467.832-.676.26-1.442-.03-1.824-.65L.236 12.62c-.382-.62-.275-1.428.243-1.933l6.57-6.42c.518-.506 1.343-.545 1.91-.09 1.353 1.08 3.033 1.724 4.856 1.724 2.26 0 4.31-.99 5.73-2.58.468-.525.435-1.332-.075-1.815l-.94-.888c-.51-.483-1.296-.53-1.86-.11-1.87 1.39-4.23 2.22-6.78 2.22-2.16 0-4.18-.6-5.9-1.63-.61-.365-1.385-.24-1.85.297l-.68.783c-.465.536-.43 1.344.08 1.842 2.24 2.19 5.34 3.54 8.76 3.54 2.92 0 5.61-1.15 7.55-3.02.46-.44.49-1.16.07-1.63l-.7-.78c-.42-.47-1.13-.52-1.61-.12-1.42 1.18-3.23 1.89-5.21 1.89-3.85 0-7.07-2.67-7.98-6.33z"
    />
  </svg>
);

const KucoinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <circle cx="12" cy="12" r="12" fill="#24AE8F" />
    <path
      d="M12 2L2 19h5l5-8.5L17 19h5L12 2zm0 3.5L18.5 16h-2L12 8.5 7.5 16h-2L12 5.5z"
      fill="white"
    />
  </svg>
);

const CryptoComIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      fill="#002D74"
      d="M12 1.5L2.5 7v9.5L12 22l9.5-5.5V7L12 1.5zm0 2.6l7 4v7.9l-7 4-7-4V8.1l7-4z"
    />
    <path fill="white" d="M12 7l-4 2.3v5.4L12 17l4-2.3V9.3L12 7z" />
  </svg>
);

const OkxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <rect width="24" height="24" fill="white" />
    <path
      fill="#000"
      d="M4 4h4v16H4zM16 4h4v4h-4zM16 10h4v4h-4zM16 16h4v4h-4zM10 4h2v16h-2z"
    />
  </svg>
);

const PolygonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path
      fill="#8247E5"
      d="M12 2L3.5 6.5v9L12 20l8.5-4.5v-9L12 2zm-1 12.5l-4-2v-4l4-2 4 2v4l-4 2z"
    />
  </svg>
);

const icons = [
  BinanceIcon,
  CoinbaseIcon,
  UniswapIcon,
  KrakenIcon,
  KucoinIcon,
  CryptoComIcon,
  OkxIcon,
  PolygonIcon,
];

// --- 2. Main Circular Component ---

export const ExchangeOrbit = () => {
  const radius = 220; // Distance from center

  return (
    <section className="relative w-full h-[800px] bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Orbit Container */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {/* The Rotating Ring */}
        {/* We use standard CSS animation here for the infinite loop as it's often smoother than JS for simple rotation */}
        <div className="absolute w-full h-full animate-[spin_60s_linear_infinite]">
          {icons.map((Icon, index) => {
            const angle = (index / icons.length) * 2 * Math.PI; // Calculate angle in radians
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 flex items-center justify-center bg-[#0A0A0A] rounded-full border border-white/10 shadow-xl backdrop-blur-sm"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {/* Counter-Rotate the Icon so it stays upright */}
                <div className="w-10 h-10 animate-[spin_60s_linear_infinite_reverse]">
                  <Icon />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative Circles */}
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute inset-[100px] border border-white/5 rounded-full border-dashed opacity-50" />
        <div className="absolute inset-[200px] border border-white/5 rounded-full opacity-30" />

        {/* Center Content */}
        <div className="relative z-20 text-center px-4 max-w-lg">
          <Badge
            variant="outline"
            className="mb-6 border-white/10 bg-white/5 text-gray-400 backdrop-blur-md"
          >
            Universal Liquidity
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            Intelligence Across <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              Every Major Exchange
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We aggregate order book data from Binance, Coinbase, Uniswap, and
            50+ other sources to give you the true market pulse.
          </p>
        </div>
      </div>
    </section>
  );
};
