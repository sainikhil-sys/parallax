import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LayersLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const limeCircleRef = useRef<HTMLDivElement>(null);
  const blackRectRef = useRef<HTMLDivElement>(null);
  const thinLineRef = useRef<HTMLDivElement>(null);
  const svgArtRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);
  const fgCrossRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Layer 1: Lime circle - slow deep anchor (speed 0.12)
      if (limeCircleRef.current) {
        tl.to(limeCircleRef.current, { y: '16vh', scale: 1.15, ease: 'none' }, 0);
      }

      // Layer 2: Black rectangle - medium drift (speed 0.35)
      if (blackRectRef.current) {
        tl.to(blackRectRef.current, { y: '38vh', rotate: 6, ease: 'none' }, 0);
      }

      // Layer 3: Thin geometric line - differential rotation (speed 0.52)
      if (thinLineRef.current) {
        tl.to(thinLineRef.current, { y: '52vh', rotate: -15, scaleX: 1.2, ease: 'none' }, 0);
      }

      // Layer 4: Abstract SVG composition (speed 0.68)
      if (svgArtRef.current) {
        tl.to(svgArtRef.current, { y: '68vh', ease: 'none' }, 0);
      }

      // Layer 5: Large typography (speed 0.88)
      if (typoRef.current) {
        tl.to(typoRef.current, { y: '88vh', ease: 'none' }, 0);
      }

      // Layer 6: Foreground collage element crossing directly over typography (speed 1.35)
      if (fgCrossRef.current) {
        tl.to(fgCrossRef.current, { y: '135vh', x: '-18vw', rotate: -8, ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="layers"
      ref={containerRef}
      className="relative min-h-[175vh] w-full bg-[#F5F5F0] text-[#111111] overflow-hidden select-none py-[12vh]"
    >
      {/* Background Architectural Margin Marks */}
      <div className="absolute top-12 left-12 text-[11px] font-mono text-[#666666] tracking-widest uppercase">
        02 // LAYER SEPARATION COLLAGE
      </div>

      {/* Layer 1: Large Acid Lime Circle (Deep Background) */}
      <div
        ref={limeCircleRef}
        className="absolute top-[20vh] right-[10vw] sm:right-[18vw] w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-[#B8FF3D] pointer-events-none will-change-transform z-0"
      />

      {/* Layer 2: Sharp Black Geometric Rectangle */}
      <div
        ref={blackRectRef}
        className="absolute top-[28vh] right-[18vw] sm:right-[26vw] w-[240px] sm:w-[380px] h-[320px] sm:h-[460px] bg-[#111111] shadow-2xl pointer-events-none will-change-transform z-10 flex flex-col justify-between p-8"
      >
        <div className="w-8 h-[2px] bg-[#B8FF3D]" />
        <div className="text-[#F5F5F0] text-xs font-mono tracking-widest uppercase">
          STRATUM // 02
        </div>
      </div>

      {/* Layer 3: Thin Crisp Graphic Axis Line */}
      <div
        ref={thinLineRef}
        className="absolute top-[38vh] left-[15vw] w-[55vw] h-[2px] bg-[#FF6B4A] pointer-events-none will-change-transform z-15"
      />

      {/* Layer 4: Abstract SVG Geometry Pattern */}
      <div
        ref={svgArtRef}
        className="absolute top-[35vh] left-[8vw] sm:left-[22vw] w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] border border-[#111111] p-6 pointer-events-none will-change-transform z-20 bg-white/70 backdrop-blur-sm"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#111111] fill-none stroke-[1.2]">
          <circle cx="50" cy="50" r="40" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <rect x="25" y="25" width="50" height="50" />
        </svg>
      </div>

      {/* Layer 5: Large Typography */}
      <div
        ref={typoRef}
        className="relative z-30 pt-[28vh] sm:pt-[32vh] px-6 sm:px-12 md:px-20 max-w-4xl will-change-transform"
      >
        <h2 className="text-grotesk-heading text-[#111111] mb-6">
          EVERYTHING
          <br />
          HAS
          <br />
          <span className="text-[#111111] bg-[#B8FF3D] px-2 py-0.5">
            A DEPTH.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#666666] font-sans font-normal max-w-md leading-relaxed">
          As the camera descends, flat 2D graphic surfaces pull apart into physical parallax planes with distinct inertia and velocities.
        </p>
      </div>

      {/* Layer 6: Foreground Floating Plane Crossing Typography */}
      <div
        ref={fgCrossRef}
        className="absolute top-[50vh] right-[4vw] sm:right-[8vw] w-48 sm:w-72 h-32 sm:h-44 bg-white border-2 border-[#111111] p-6 shadow-2xl pointer-events-none will-change-transform z-40 flex items-center justify-between"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-[#111111] font-bold">
          FOREGROUND / 1.35x
        </span>
        <div className="w-4 h-4 rounded-full bg-[#FF6B4A]" />
      </div>
    </section>
  );
};

export default LayersLab;
