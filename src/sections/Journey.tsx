import React, { useRef } from 'react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { SectionHeader } from '../components/SectionHeader';
import { Layers, Compass, Eye } from 'lucide-react';

export const Journey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-horizon-bg overflow-hidden py-24 sm:py-32"
    >
      {/* ============================================================
          LAYER 1: Distant Sky, Nebula & Atmospheric Corona (Speed: 0.15)
          ============================================================ */}
      <ParallaxLayer
        speed={0.15}
        scale={[1, 1.08]}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-horizon-accent/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-transparent blur-[130px] rounded-full" />
      </ParallaxLayer>

      {/* ============================================================
          LAYER 2: Far Background Mountain Peaks (Speed: 0.32, Horizontal: -0.08)
          ============================================================ */}
      <ParallaxLayer
        speed={0.32}
        horizontalSpeed={-0.08}
        triggerRef={containerRef}
        className="absolute top-[20%] left-0 right-0 h-[450px] pointer-events-none opacity-40"
      >
        <svg
          viewBox="0 0 1440 450"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 380L140 280L320 350L490 210L680 320L860 180L1080 310L1260 220L1440 290V450H0V380Z"
            fill="url(#peak-grad-1)"
          />
          <defs>
            <linearGradient id="peak-grad-1" x1="720" y1="180" x2="720" y2="450" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e2638" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 3: Midground Mountain Ridges & Atmospheric Haze (Speed: 0.60, Horizontal: 0.06)
          ============================================================ */}
      <ParallaxLayer
        speed={0.6}
        horizontalSpeed={0.06}
        triggerRef={containerRef}
        className="absolute top-[35%] left-0 right-0 h-[520px] pointer-events-none opacity-70"
      >
        <svg
          viewBox="0 0 1440 520"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 420L180 310L360 390L580 240L780 380L980 260L1200 370L1350 290L1440 330V520H0V420Z"
            fill="url(#peak-grad-2)"
          />
          <defs>
            <linearGradient id="peak-grad-2" x1="720" y1="240" x2="720" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="#131722" />
              <stop offset="0.6" stopColor="#0a0d13" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
        {/* Subtle atmospheric mist band */}
        <div className="absolute bottom-24 left-0 right-0 h-32 bg-gradient-to-t from-horizon-bg via-horizon-bg/60 to-transparent" />
      </ParallaxLayer>

      {/* Content Container (Sticky storytelling positioning) */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col justify-between">
        {/* Section Header */}
        <SectionHeader
          number="02"
          tag="DIMENSIONAL STRATA"
          title={"THE JOURNEY\nIS LAYERED."}
          subtitle="Every layer tells a different story. Move through the space and watch the world separate into depth."
        />

        {/* Narrative Interactive Story Cards (Floating in mid-depth) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="p-6 rounded-2xl bg-horizon-card/60 border border-white/[0.06] backdrop-blur-md hover:border-horizon-accent/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5 text-horizon-accent" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">Multi-Tier Velocity</h3>
            <p className="text-horizon-text-muted text-sm leading-relaxed font-light">
              Independent z-depth vectors allow background horizons to anchor the viewport while foreground elements accelerate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-horizon-card/60 border border-white/[0.06] backdrop-blur-md hover:border-horizon-accent/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5 text-horizon-accent" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">Compound Translation</h3>
            <p className="text-horizon-text-muted text-sm leading-relaxed font-light">
              Coupling subtle lateral displacement with vertical descent evokes the perspective of an orbital camera sweeping the terrain.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-horizon-card/60 border border-white/[0.06] backdrop-blur-md hover:border-horizon-accent/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5 text-horizon-accent" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">Zero-Jitter Interpolation</h3>
            <p className="text-horizon-text-muted text-sm leading-relaxed font-light">
              Tightly bound to GPU composite layers via hardware transform matrices for fluid 120 FPS continuous motion.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          LAYER 4: Floating Particles & Atmospheric Satellites (Speed: 1.05)
          ============================================================ */}
      <ParallaxLayer
        speed={1.05}
        horizontalSpeed={-0.12}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none z-30"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Atmospheric probes & crystal particles */}
          <g fill="#00e5ff">
            <circle cx="18%" cy="40%" r="2" opacity="0.8" />
            <circle cx="85%" cy="30%" r="2.5" opacity="0.9" />
            <circle cx="32%" cy="65%" r="1.5" opacity="0.6" />
            <circle cx="70%" cy="75%" r="3" opacity="0.8" />
            <circle cx="90%" cy="60%" r="1.8" opacity="0.5" />
          </g>
          {/* Subtle orbital radar rings */}
          <circle cx="85%" cy="30%" r="16" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
          <circle cx="18%" cy="40%" r="12" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.8" fill="none" />
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 5: Foreground Terrain & Escarpment (Speed: 1.35)
          Moves fastest across the bottom of the section
          ============================================================ */}
      <ParallaxLayer
        speed={1.35}
        horizontalSpeed={0.08}
        triggerRef={containerRef}
        className="absolute bottom-0 left-0 right-0 h-[380px] pointer-events-none z-20"
      >
        <svg
          viewBox="0 0 1440 380"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full opacity-95"
        >
          <path
            d="M0 260L220 180L440 280L720 140L960 250L1240 160L1440 240V380H0V260Z"
            fill="url(#foreground-terrain-grad)"
          />
          {/* Foreground contour highlight line */}
          <path
            d="M0 260L220 180L440 280L720 140L960 250L1240 160L1440 240"
            stroke="rgba(0, 229, 255, 0.3)"
            strokeWidth="1.2"
          />
          <defs>
            <linearGradient id="foreground-terrain-grad" x1="720" y1="140" x2="720" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0a0d13" />
              <stop offset="0.7" stopColor="#07080a" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>
    </section>
  );
};

export default Journey;
