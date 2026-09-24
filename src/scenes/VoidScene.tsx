import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const VoidScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
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

      // Line 1: DEPTH moves slowly
      tl.to(
        line1Ref.current,
        {
          x: '-12vw',
          ease: 'none',
        },
        0
      );

      // Line 2: IS moves medium speed in opposite direction
      tl.to(
        line2Ref.current,
        {
          x: '20vw',
          ease: 'none',
        },
        0
      );

      // Line 3: PERCEPTION moves aggressively
      tl.to(
        line3Ref.current,
        {
          x: '-35vw',
          scale: 1.15,
          ease: 'none',
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="void"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-[#050505] overflow-hidden flex flex-col justify-between py-32 px-6 sm:px-12 select-none"
    >
      {/* Tiny Header Indicator */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs text-[#858585] tracking-[0.3em] uppercase">
          <span className="text-[#00F0FF] font-semibold">03</span>
          <span className="text-white/20">/</span>
          <span>05</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mx-1" />
          <span className="text-[#F5F5F0]/80">THE VOID</span>
        </div>

        <div className="font-mono text-[10px] tracking-widest text-[#505050] uppercase">
          ZERO NOISE // PURE CONTRAST
        </div>
      </div>

      {/* ============================================================
          ENORMOUS TYPOGRAPHY PARALLAX
          Each line moves at a distinct, carefully tuned velocity
          ============================================================ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col justify-center space-y-2 sm:space-y-6">
        {/* Line 1: DEPTH (Slow velocity) */}
        <div ref={line1Ref} className="will-change-transform flex justify-start">
          <h2 className="font-display font-black text-void tracking-tighter uppercase text-white leading-none">
            DEPTH
          </h2>
        </div>

        {/* Line 2: IS (Medium velocity) */}
        <div ref={line2Ref} className="will-change-transform flex justify-center sm:pl-28">
          <h2 className="font-display font-black text-void tracking-tighter uppercase text-[#858585] leading-none">
            IS
          </h2>
        </div>

        {/* Line 3: PERCEPTION. (Aggressive velocity) */}
        <div ref={line3Ref} className="will-change-transform flex justify-end">
          <h2 className="font-display font-black text-void tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F0] to-[#00F0FF] leading-none">
            PERCEPTION.
          </h2>
        </div>
      </div>

      {/* Minimal Bottom Line */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex justify-between items-center font-mono text-[10px] text-[#505050] tracking-widest uppercase border-t border-white/[0.04] pt-4">
        <span>STRATUM: ABSOLUTE VOID</span>
        <span className="text-[#00F0FF]">KINETIC SEPARATION ACTIVE</span>
      </div>
    </section>
  );
};

export default VoidScene;
