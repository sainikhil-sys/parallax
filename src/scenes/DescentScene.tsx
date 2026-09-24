import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const DescentScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgStarsRef = useRef<HTMLDivElement>(null);
  const pylonLeftRef = useRef<HTMLDivElement>(null);
  const pylonRightRef = useRef<HTMLDivElement>(null);
  const centralCoreRef = useRef<HTMLDivElement>(null);
  const fgCrossingArcRef = useRef<HTMLDivElement>(null);
  const fgTrussRef = useRef<HTMLDivElement>(null);
  const fgShardRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Background stars: subtle downward travel
      tl.to(
        bgStarsRef.current,
        {
          yPercent: -15,
          ease: 'none',
        },
        0
      );

      // Pylons: medium downward travel
      tl.to(
        pylonLeftRef.current,
        {
          yPercent: -40,
          ease: 'none',
        },
        0
      );

      tl.to(
        pylonRightRef.current,
        {
          yPercent: -40,
          ease: 'none',
        },
        0
      );

      // Central core: scales up and rotates as camera approaches it
      tl.to(
        centralCoreRef.current,
        {
          yPercent: -65,
          scale: 1.6,
          rotate: 45,
          ease: 'none',
        },
        0
      );

      // FOREGROUND CROSSING OBJECTS (Passing right in front of camera lens)
      // Giant crossing circular frame (translateY: 130vh speed)
      tl.fromTo(
        fgCrossingArcRef.current,
        {
          yPercent: 120,
          xPercent: -30,
          rotate: -20,
        },
        {
          yPercent: -150,
          xPercent: 40,
          rotate: 40,
          ease: 'none',
        },
        0
      );

      // Horizontal beam truss
      tl.fromTo(
        fgTrussRef.current,
        {
          yPercent: 160,
          xPercent: 50,
          rotate: 15,
        },
        {
          yPercent: -180,
          xPercent: -40,
          rotate: -25,
          ease: 'none',
        },
        0
      );

      // Foreground typography shard
      tl.fromTo(
        fgShardRef.current,
        {
          yPercent: 190,
          scale: 0.6,
          opacity: 0,
        },
        {
          yPercent: -190,
          scale: 2.2,
          opacity: 0.8,
          ease: 'none',
        },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="descent"
      ref={containerRef}
      className="relative min-h-[220vh] w-full bg-[#050505] overflow-hidden py-32 flex flex-col justify-between select-none"
    >
      {/* Background Star Constellation (Slow -15vh) */}
      <div ref={bgStarsRef} className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <g fill="#00F0FF">
            <circle cx="15%" cy="20%" r="1" />
            <circle cx="35%" cy="30%" r="1.5" />
            <circle cx="55%" cy="15%" r="1.2" />
            <circle cx="80%" cy="35%" r="2" />
            <circle cx="25%" cy="70%" r="1.5" />
            <circle cx="85%" cy="80%" r="1.2" />
          </g>
          <line x1="15%" y1="20%" x2="55%" y2="15%" stroke="rgba(0,240,255,0.15)" strokeWidth="0.8" />
        </svg>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#00F0FF]/10 via-cyan-900/5 to-transparent blur-[160px] rounded-full" />
      </div>

      {/* Header Info */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 sm:px-12 pt-8 w-full">
        <div className="flex items-center gap-3 font-mono text-xs text-[#858585] tracking-[0.25em] uppercase mb-4">
          <span className="text-[#00F0FF] font-semibold">04</span>
          <span className="text-white/20">/</span>
          <span>05</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mx-1" />
          <span className="text-[#F5F5F0]/80">VERTICAL DESCENT</span>
        </div>

        <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none">
          THE
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#00F0FF]">
            DESCENT.
          </span>
        </h2>

        <p className="mt-6 font-body text-[#858585] text-base sm:text-lg max-w-xl font-light leading-relaxed">
          The camera plunges downward into the subterranean digital strata. Notice how foreground architectural frames cross the lens rapidly while distant structures move slowly.
        </p>
      </div>

      {/* Midground Pylons */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-between px-6 sm:px-20">
        <div
          ref={pylonLeftRef}
          className="w-14 sm:w-24 h-[140%] border-r border-white/[0.08] bg-gradient-to-b from-transparent via-[#0c0c0c]/80 to-transparent flex flex-col justify-around py-24 font-mono text-[9px] text-[#505050]"
        >
          <span className="[writing-mode:vertical-lr] tracking-widest text-[#00F0FF]/70">PYLON-ALPHA // MID</span>
          <span className="[writing-mode:vertical-lr] tracking-widest">BEARING: 284° N</span>
        </div>

        <div
          ref={pylonRightRef}
          className="w-14 sm:w-24 h-[140%] border-l border-white/[0.08] bg-gradient-to-b from-transparent via-[#0c0c0c]/80 to-transparent flex flex-col justify-around py-24 font-mono text-[9px] text-[#505050]"
        >
          <span className="[writing-mode:vertical-lr] tracking-widest text-[#00F0FF]/70">PYLON-BETA // MID</span>
          <span className="[writing-mode:vertical-lr] tracking-widest">COORD: VERT-Z</span>
        </div>
      </div>

      {/* Central Descending Core (Approaches and enlarges) */}
      <div className="relative z-20 my-auto flex items-center justify-center py-20">
        <div
          ref={centralCoreRef}
          className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-3xl border border-[#00F0FF]/30 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_0_70px_rgba(0,240,255,0.2)] flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="absolute inset-3 rounded-2xl border border-dashed border-white/20 animate-spin" style={{ animationDuration: '45s' }} />
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#050505] via-[#121212] to-[#00F0FF]/25 border border-[#00F0FF] shadow-[0_0_25px_#00F0FF] flex flex-col items-center justify-center">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#00F0FF] tracking-[0.3em] font-bold">
              DESCENT
            </span>
            <span className="font-display font-black text-lg sm:text-xl text-white">04 // Z</span>
          </div>
          <div className="mt-6 font-mono text-xs tracking-widest text-[#858585] uppercase">
            SINK RATE: -450 M/S
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-30 px-6 sm:px-12 flex justify-between items-end font-mono text-[10px] text-[#858585] border-t border-white/[0.04] pt-4">
        <div>TARGET: DEEP SPATIAL MATRIX</div>
        <div className="text-[#00F0FF]">LAYER INTERSECTION RATE: 140VH VELOCITY</div>
      </div>

      {/* ============================================================
          FOREGROUND CAMERA CROSSING ELEMENTS (Pass very close to lens)
          ============================================================ */}
      {/* Giant Circular Frame Crossing Lens */}
      <div
        ref={fgCrossingArcRef}
        className="absolute top-1/2 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full border-2 border-white/[0.18] bg-white/[0.01] backdrop-blur-[2px] pointer-events-none z-40"
      />

      {/* Giant Crossing Beam */}
      <div
        ref={fgTrussRef}
        className="absolute top-1/3 right-10 w-2 h-[150vh] bg-gradient-to-b from-transparent via-[#00F0FF]/40 to-transparent pointer-events-none z-40 hidden md:block"
      />

      {/* Foreground Shard */}
      <div
        ref={fgShardRef}
        className="absolute top-2/3 left-[20%] pointer-events-none z-40 font-mono text-xs sm:text-sm text-[#00F0FF] tracking-[0.4em] uppercase border border-[#00F0FF]/50 px-5 py-2.5 rounded-full bg-[#050505]/90 backdrop-blur-md shadow-2xl hidden sm:block"
      >
        // FOREGROUND LENS CROSSING
      </div>
    </section>
  );
};

export default DescentScene;
