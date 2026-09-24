import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-20 border-t border-white/[0.08] bg-horizon-bg/90 backdrop-blur-md py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="font-display font-bold tracking-widest text-sm text-white">
            BEYOND<span className="text-horizon-accent">/</span>HORIZON
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="font-mono text-xs text-horizon-text-muted tracking-widest uppercase">
            INTERACTIVE EXPERIENCE
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="font-mono text-xs text-horizon-accent tracking-widest uppercase">
            TECHFEST 2026
          </span>
        </div>

        {/* Back to top magnetic trigger */}
        <button
          onClick={scrollToTop}
          data-cursor="top"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 hover:border-horizon-accent text-xs font-mono tracking-widest text-horizon-text-muted hover:text-white transition-all group"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-horizon-accent group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between text-[11px] font-mono text-horizon-text-dim gap-2 text-center sm:text-left">
        <span>CRAFTED FOR IIT BOMBAY TECHFEST WEB COMPETITION</span>
        <span>GSAP SCROLLTRIGGER • LENIS SMOOTH VIRTUAL ENGINE • ZERO COMPROMISE</span>
      </div>
    </footer>
  );
};

export default Footer;
