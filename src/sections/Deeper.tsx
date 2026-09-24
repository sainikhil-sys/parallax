import React, { useRef } from 'react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { SectionHeader } from '../components/SectionHeader';
import { useMousePosition } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Deeper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  // Subtle tilt for the central core based on mouse movement
  const tiltX = prefersReducedMotion ? 0 : mouse.smoothY * -12;
  const tiltY = prefersReducedMotion ? 0 : mouse.smoothX * 14;

  return (
    <section
      id="deeper"
      ref={containerRef}
      className="relative min-h-[180vh] w-full bg-horizon-bg overflow-hidden py-32 flex flex-col justify-between"
    >
      {/* Background Volumetric Horizon Bloom */}
      <ParallaxLayer
        speed={0.15}
        scale={[0.9, 1.1]}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] bg-gradient-to-b from-horizon-accent/10 via-cyan-900/5 to-transparent blur-[160px] rounded-full" />
      </ParallaxLayer>

      {/* Floating Depth Particles - Tier 1: Deep Background (Blurred, small) */}
      <ParallaxLayer
        speed={0.25}
        horizontalSpeed={-0.1}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[25%] left-[15%] w-16 h-16 rounded-xl border border-white/10 rotate-12 blur-[2px] opacity-25" />
        <div className="absolute top-[65%] right-[20%] w-24 h-24 rounded-full border border-cyan-500/20 blur-[3px] opacity-20" />
      </ParallaxLayer>

      {/* Section Header */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 sm:px-12 w-full">
        <SectionHeader
          number="04"
          tag="DIMENSIONAL PERSPECTIVE"
          title={"GO\nDEEPER."}
          subtitle="Beyond flat planes lies the convergence of spatial coordinates. Interact with the core to manipulate depth perspective."
        />
      </div>

      {/* ============================================================
          CENTRAL VISUAL OBJECT: The Horizon Singularity Core
          Moves vertically, rotates, scales with scroll, tilts with mouse
          ============================================================ */}
      <div className="relative z-20 my-auto flex items-center justify-center py-16 perspective-1000">
        <ParallaxLayer
          speed={0.7}
          scale={[0.85, 1.15]}
          rotate={[-15, 25]}
          horizontalSpeed={0.04}
          triggerRef={containerRef}
          className="relative flex items-center justify-center"
        >
          {/* Mouse-reactive 3D tilt container */}
          <div
            className="relative w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] flex items-center justify-center transition-transform duration-200 ease-out transform-style-3d cursor-crosshair group"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            }}
            data-cursor="pivot"
          >
            {/* Outer Orbit Ring with tick indicators */}
            <div className="absolute inset-0 rounded-full border border-white/[0.12] group-hover:border-horizon-accent/40 transition-colors animate-spin" style={{ animationDuration: '60s' }}>
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-horizon-accent shadow-[0_0_10px_#00e5ff]" />
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
            </div>

            {/* Middle Oblique Gyro Ring */}
            <div
              className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-400/30 animate-spin"
              style={{ animationDuration: '35s', animationDirection: 'reverse' }}
            />

            {/* Inner Precision Reticle */}
            <div className="absolute w-[60%] h-[60%] rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full border border-horizon-accent/30 flex items-center justify-center">
                {/* Center Core Monolith */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-horizon-card via-horizon-elevated to-horizon-accent/20 border border-horizon-accent/60 shadow-[0_0_40px_rgba(0,229,255,0.25)] flex flex-col items-center justify-center p-3 text-center backdrop-blur-md">
                  <span className="font-mono text-[9px] text-horizon-accent tracking-widest uppercase">CORE</span>
                  <span className="font-display font-bold text-sm text-white">04 // Z</span>
                </div>
              </div>
            </div>

            {/* Crosshair coordinate lines */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </ParallaxLayer>
      </div>

      {/* Floating Depth Elements - Tier 2: Mid-Fore (Semi-sharp, moderate scale) */}
      <ParallaxLayer
        speed={0.9}
        horizontalSpeed={0.08}
        triggerRef={containerRef}
        className="absolute top-[45%] left-[8%] pointer-events-none z-20"
      >
        <div className="p-4 rounded-xl bg-horizon-card/50 border border-white/10 backdrop-blur-md font-mono text-[10px] text-horizon-text-muted">
          <div className="text-horizon-accent font-semibold">TILT.STATUS</div>
          <div>X: {tiltX.toFixed(1)}°</div>
          <div>Y: {tiltY.toFixed(1)}°</div>
        </div>
      </ParallaxLayer>

      {/* Floating Depth Elements - Tier 3: Extreme Foreground (Sharp, accelerated) */}
      <ParallaxLayer
        speed={1.4}
        horizontalSpeed={-0.14}
        triggerRef={containerRef}
        className="absolute bottom-16 right-10 pointer-events-none z-30"
      >
        <div className="p-4 sm:p-5 rounded-2xl bg-horizon-card/80 border border-horizon-accent/30 shadow-2xl backdrop-blur-lg font-mono text-xs text-white max-w-xs">
          <span className="text-horizon-accent uppercase tracking-widest text-[10px] block mb-1">
            PARALLAX DEPTH ENGINE
          </span>
          <p className="text-horizon-text-muted text-[11px] leading-relaxed">
            Multi-axis scrub synchronization smoothly computes focal displacement without raster stutter.
          </p>
        </div>
      </ParallaxLayer>
    </section>
  );
};

export default Deeper;
