import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { Github, Twitter, Disc, Circle } from "lucide-react";

export const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Section: Brand & Links */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column (Span 4) */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
              <img
                src={logo}
                alt="SpectraQ Logo"
                className="w-8 h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              SpectraQ
            </span>
          </Link>

          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Institutional-grade liquidity and AI-driven hedging for the
            decentralized economy. Built on Yellow Protocol.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <SocialLink
              href="#"
              icon={<Twitter className="w-4 h-4" />}
              label="Twitter"
            />
            <SocialLink
              href="#"
              icon={<Github className="w-4 h-4" />}
              label="GitHub"
            />
            <SocialLink
              href="#"
              icon={<Disc className="w-4 h-4" />}
              label="Discord"
            />
          </div>
        </div>

        {/* Links Columns (Span 8) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Platform
            </h3>
            <ul className="space-y-4">
              <FooterLink to="/markets">Live Markets</FooterLink>
              <FooterLink to="/trading">Terminal</FooterLink>
              <FooterLink to="/predictions">AI Signals</FooterLink>
              <FooterLink to="/portfolio">Portfolio</FooterLink>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Developers
            </h3>
            <ul className="space-y-4">
              <FooterLink to="#">Documentation</FooterLink>
              <FooterLink to="#">API Reference</FooterLink>
              <FooterLink to="#">Github Repo</FooterLink>
              <FooterLink to="#">Status Page</FooterLink>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <FooterLink to="#">About</FooterLink>
              <FooterLink to="#">Manifesto</FooterLink>
              <FooterLink to="#">Careers</FooterLink>
              <FooterLink to="#">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Legal & Status */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-500 text-xs font-mono">
          © 2025 SpectraQ Labs. All rights reserved.
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-xs font-mono text-gray-300">
            Systems Operational
          </span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Helper Components ---

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      to={to}
      className="text-sm text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    aria-label={label}
    className="w-8 h-8 flex items-center justify-center rounded bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all border border-transparent hover:border-white/10"
  >
    {icon}
  </a>
);
