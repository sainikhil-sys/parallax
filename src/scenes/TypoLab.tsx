import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TypoLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordSpaceRef = useRef<HTMLDivElement>(null);
  const wordMotionRef = useRef<HTMLDivElement>(null);
  const wordDepthRef = useRef<HTMLDivElement>(null);
  const maskBoxRef = useRef<HTMLDivElement>(null);

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

      // 1. SPACE - Slow vertical movement (speed 0.25)
      if (wordSpaceRef.current) {
        tl.to(wordSpaceRef.current, { y: '30vh', ease: 'none' }, 0);
      }

      // 2. MOTION - Strong horizontal drift across the viewport (speed 0.65)
      if (wordMotionRef.current) {
        tl.to(wordMotionRef.current, { x: '-22vw', ease: 'none' }, 0);
      }

      // 3. Mask container clipping shift
      if (maskBoxRef.current) {
        tl.to(maskBoxRef.current, { y: '50vh', rotate: 4, ease: 'none' }, 0);
      }

      // 4. DEPTH - Accelerated vertical movement crossing behind/front (speed 1.2)
      if (wordDepthRef.current) {
        tl.to(wordDepthRef.current, { y: '125vh', x: '8vw', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="typo"
      ref={containerRef}
      className="relative min-h-[200vh] w-full bg-[#F5F5F0] text-[#111111] overflow-hidden select-none py-[16vh]"
    >
      {/* Top Header Label */}
      <div className="px-6 sm:px-12 md:px-20 mb-16 relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-mono tracking-widest text-[#666666] uppercase">
          04 // TYPOGRAPHIC POSTER CHOREOGRAPHY
        </span>
        <span className="text-[11px] font-mono tracking-widest text-[#FF6B4A] uppercase">
          OVERLAPPING + CLIPPING
        </span>
      </div>

      {/* Word 1: SPACE (Slow Vertical Drift: 30vh) */}
      <div
        ref={wordSpaceRef}
        className="relative z-10 pl-6 sm:pl-16 md:pl-24 mb-24 will-change-transform"
      >
        <span className="text-xs font-mono text-[#666666] block mb-2 tracking-widest uppercase">
          [VECTOR A]
        </span>
        <div className="text-grotesk-hero text-[#111111] opacity-90 leading-none">
          SPACE
        </div>
      </div>

      {/* Overlapping Middle Plane with Clipping Box */}
      <div
        ref={maskBoxRef}
        className="absolute top-[38vh] right-[8vw] sm:right-[15vw] w-[320px] sm:w-[500px] h-[180px] sm:h-[240px] bg-[#B8FF3D] z-20 overflow-hidden p-8 flex flex-col justify-between shadow-lg will-change-transform"
      >
        <div className="flex justify-between items-center text-[11px] font-mono text-[#111111] font-bold">
          <span>CLIPPED VIEWPORT</span>
          <span>100% VECTOR</span>
        </div>
        <div className="font-mono text-4xl sm:text-6xl font-black text-[#111111]">
          ΔX · ΔY
        </div>
      </div>

      {/* Word 2: MOTION (Horizontal Movement: -22vw) */}
      <div
        ref={wordMotionRef}
        className="relative z-30 pl-[25vw] sm:pl-[35vw] mb-32 will-change-transform whitespace-nowrap"
      >
        <div className="text-grotesk-hero text-[#111111] leading-none tracking-tight flex items-baseline space-x-6">
          <span className="hover:text-[#FF6B4A] transition-colors cursor-default">
            MOTION
          </span>
          <span className="text-base font-mono text-[#666666] font-normal tracking-widest">
            — HORIZONTAL SHIFT
          </span>
        </div>
      </div>

      {/* Word 3: DEPTH (Fast Vertical Sweep: 125vh) */}
      <div
        ref={wordDepthRef}
        className="relative z-40 pr-6 sm:pr-20 md:pr-32 flex flex-col items-end will-change-transform"
      >
        <span className="text-xs font-mono text-[#FF6B4A] block mb-2 tracking-widest uppercase">
          [VECTOR C // FASTEST]
        </span>
        <div className="text-grotesk-hero text-[#111111] leading-none">
          DEPTH.
        </div>
      </div>
    </section>
  );
};

export default TypoLab;
