import React, { useRef } from 'react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { MagneticButton } from '../components/MagneticButton';
import { RevealText } from '../components/RevealText';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const journeySection = document.getElementById('journey');
      journeySection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 bg-horizon-bg"
    >
      {/* ============================================================
          LAYER 1: Distant Atmospheric Background (Speed: 0.10)
          ============================================================ */}
      <ParallaxLayer
        speed={0.1}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        {/* Subtle horizon glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] bg-gradient-to-b from-horizon-accent/10 via-cyan-500/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mask-radial" />
      </ParallaxLayer>

      {/* ============================================================
          LAYER 2: Stars / Atmospheric Particles (Speed: 0.25)
          ============================================================ */}
      <ParallaxLayer
        speed={0.25}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          className="w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Constellation nodes & distant stars */}
          <g fill="#00e5ff">
            <circle cx="15%" cy="20%" r="1.5" opacity="0.8" />
            <circle cx="28%" cy="14%" r="1" opacity="0.4" />
            <circle cx="42%" cy="28%" r="1.5" opacity="0.6" />
            <circle cx="65%" cy="18%" r="2" opacity="0.9" />
            <circle cx="82%" cy="24%" r="1.2" opacity="0.5" />
            <circle cx="88%" cy="45%" r="1.5" opacity="0.7" />
            <circle cx="12%" cy="60%" r="1" opacity="0.3" />
            <circle cx="34%" cy="75%" r="1.8" opacity="0.8" />
            <circle cx="74%" cy="65%" r="1.2" opacity="0.4" />
            <circle cx="92%" cy="80%" r="1.5" opacity="0.6" />
            <circle cx="50%" cy="12%" r="2.5" opacity="0.9" />
          </g>
          {/* Subtle celestial telemetry lines */}
          <line
            x1="15%"
            y1="20%"
            x2="28%"
            y2="14%"
            stroke="rgba(0, 229, 255, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          <line
            x1="65%"
            y1="18%"
            x2="82%"
            y2="24%"
            stroke="rgba(0, 229, 255, 0.15)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          <line
            x1="42%"
            y1="28%"
            x2="50%"
            y2="12%"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.6"
          />
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 3: Large Distant Landscape / Horizon Ridge (Speed: 0.40)
          ============================================================ */}
      <ParallaxLayer
        speed={0.4}
        horizontalSpeed={-0.08}
        triggerRef={containerRef}
        className="absolute bottom-0 left-0 right-0 h-[48%] pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full opacity-35"
        >
          <path
            d="M0 320L120 280L280 340L480 230L680 310L920 210L1120 290L1300 240L1440 280V400H0V320Z"
            fill="url(#horizon-distant-grad)"
          />
          <defs>
            <linearGradient id="horizon-distant-grad" x1="720" y1="200" x2="720" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1a202c" stopOpacity="0.8" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 4: Midground Futuristic Structures & Beacons (Speed: 0.60)
          ============================================================ */}
      <ParallaxLayer
        speed={0.6}
        horizontalSpeed={0.05}
        triggerRef={containerRef}
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full opacity-60"
        >
          {/* Geometric pillars / architecture monoliths */}
          <path
            d="M0 260L80 230L160 250L240 180L320 240L420 160L540 220L720 140L880 210L1020 150L1180 230L1340 170L1440 220V320H0V260Z"
            fill="url(#horizon-mid-grad)"
          />
          {/* Signal beacon lines reaching toward the sky */}
          <line x1="420" y1="160" x2="420" y2="20" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="420" cy="160" r="3" fill="#00e5ff" />
          <line x1="1020" y1="150" x2="1020" y2="10" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="1020" cy="150" r="3" fill="#00e5ff" />
          <defs>
            <linearGradient id="horizon-mid-grad" x1="720" y1="140" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0d1117" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 5: Hero Typography & Primary Content (Speed: 0.85)
          ============================================================ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto flex flex-col justify-center">
        {/* Small label: 01 / 05 */}
        <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-horizon-text-muted tracking-widest uppercase mb-6 sm:mb-8">
          <span className="text-horizon-accent font-semibold">01</span>
          <span className="text-white/20">/</span>
          <span className="text-horizon-text-dim">05</span>
          <span className="w-1.5 h-1.5 rounded-full bg-horizon-accent/60 mx-1 animate-pulse" />
          <span className="text-white/50 text-[11px]">TECHFEST IIT BOMBAY</span>
        </div>

        {/* Large heading: BEYOND THE HORIZON */}
        <h1 className="text-hero font-display font-extrabold uppercase text-white tracking-tighter leading-none mb-6 sm:mb-8 select-none">
          <div className="overflow-hidden">
            <RevealText splitBy="words" delay={0.1}>
              BEYOND
            </RevealText>
          </div>
          <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-horizon-accent/90">
            <RevealText splitBy="words" delay={0.25}>
              THE HORIZON
            </RevealText>
          </div>
        </h1>

        {/* Supporting text & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-4 border-t border-white/[0.08]">
          <p className="text-horizon-text-muted text-base sm:text-lg max-w-md font-light leading-relaxed">
            “An interactive journey through depth, motion and digital space.”
          </p>

          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={handleScrollDown}
              ariaLabel="Explore the journey"
              variant="primary"
            >
              <span>EXPLORE THE JOURNEY</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ============================================================
          LAYER 6: Foreground Frame & Floating Telemetry Objects (Speed: 1.15)
          Moves faster than scroll for heightened 3D depth!
          ============================================================ */}
      <ParallaxLayer
        speed={1.15}
        horizontalSpeed={0.1}
        triggerRef={containerRef}
        className="absolute bottom-4 left-6 right-6 sm:left-12 sm:right-12 z-20 pointer-events-none flex justify-between items-end"
      >
        {/* Left foreground telemetry */}
        <div className="hidden sm:flex flex-col gap-1 font-mono text-[10px] text-horizon-text-dim bg-horizon-card/70 border border-white/[0.06] backdrop-blur-md p-3 rounded-lg shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-horizon-text">SYS.DEPTH: MULTI-AXIS</span>
          </div>
          <span>COORD: 18.9220° N, 72.8347° E</span>
          <span className="text-horizon-accent">PARALLAX RATIO: 6 LAYERS ACTIVE</span>
        </div>

        {/* Right foreground scroll prompt */}
        <div className="flex items-center gap-3 text-xs font-mono text-horizon-text-muted ml-auto bg-horizon-bg/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/[0.06]">
          <span className="w-2 h-2 rounded-full border border-horizon-accent border-t-transparent animate-spin" />
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO SEPARATE LAYERS</span>
        </div>
      </ParallaxLayer>
    </section>
  );
};

export default Hero;
