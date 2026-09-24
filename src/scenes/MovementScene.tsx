import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MovementScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

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

      // Layer 1: Background ambient shadow - slow
      if (bgRef.current) {
        tl.to(bgRef.current, { y: '12vh', ease: 'none' }, 0);
      }

      // Layer 2: Main architectural monolithic composition - medium
      if (architectureRef.current) {
        tl.to(architectureRef.current, { y: '36vh', scale: 1.04, ease: 'none' }, 0);
      }

      // Layer 3: Typography - independent movement
      if (typoRef.current) {
        tl.to(typoRef.current, { y: '65vh', ease: 'none' }, 0);
      }

      // Layer 4: Foreground architectural geometry - fast
      if (foregroundRef.current) {
        tl.to(foregroundRef.current, { y: '100vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="movement"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-[#151613] text-[#F4F1EA] overflow-hidden select-none"
    >
      {/* Layer 1: Background Deep Charcoal Atmosphere & Soft Light Well (Speed: Slow) */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none will-change-transform opacity-60"
        style={{
          background:
            'radial-gradient(circle at 40% 30%, rgba(40, 53, 43, 0.35) 0%, rgba(21, 22, 19, 0.95) 70%)',
        }}
      >
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[rgba(244,241,234,0.06)]" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-[rgba(244,241,234,0.04)]" />
      </div>

      {/* Layer 2: Giant Monolithic Architectural Composition (Speed: Medium) */}
      <div
        ref={architectureRef}
        className="absolute top-[20vh] left-[8vw] sm:left-[16vw] w-[84vw] sm:w-[68vw] md:w-[54vw] max-w-[760px] pointer-events-none will-change-transform z-10"
      >
        <div className="relative shadow-2xl rounded-sm overflow-hidden border border-[rgba(244,241,234,0.12)]">
          <img
            src="/images/monolith.jpg"
            alt="Brutalist architectural monolith in dark basalt stone"
            className="w-full h-auto object-cover filter contrast-[1.05] brightness-[0.92]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-transparent to-transparent opacity-80" />
        </div>
      </div>

      {/* Layer 3: Independent Huge Serif Heading (Speed: Independent) */}
      <div
        ref={typoRef}
        className="relative z-20 pt-[25vh] sm:pt-[30vh] px-6 sm:px-12 md:px-20 max-w-4xl will-change-transform"
      >
        <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-sans font-medium text-[#928E85] mb-6">
          02 / KINETICS
        </div>

        <h2 className="text-display-section text-[#F4F1EA] mb-6 font-normal leading-[0.92]">
          Movement
          <br />
          <span className="italic font-serif font-light text-[#A65D45]">has weight.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#928E85] max-w-md font-light leading-relaxed">
          Mass accelerates through stillness. Spatial density is not determined by geometry alone, but by the velocity at which the eye traverses it.
        </p>
      </div>

      {/* Layer 4: Foreground Architectural Geometry & Shadow Plane (Speed: Fast) */}
      <div
        ref={foregroundRef}
        className="absolute -bottom-24 right-8 sm:right-24 w-40 sm:w-64 h-80 border-r border-b border-[rgba(244,241,234,0.18)] pointer-events-none will-change-transform z-30"
      >
        <div className="w-full h-full bg-[#151613]/50 backdrop-blur-[2px] p-6 flex flex-col justify-end">
          <span className="text-[10px] tracking-widest text-[#928E85] uppercase font-sans">
            MASS &amp; INERTIA
          </span>
        </div>
      </div>
    </section>
  );
};

export default MovementScene;
