import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TypographicScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLDivElement>(null); // LIGHT
  const word2Ref = useRef<HTMLDivElement>(null); // SPACE
  const word3Ref = useRef<HTMLDivElement>(null); // MOTION
  const word4Ref = useRef<HTMLDivElement>(null); // DEPTH
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

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

      // 1. LIGHT - moves vertically slow + horizontal drift right
      if (word1Ref.current) {
        tl.to(
          word1Ref.current,
          {
            y: '30vh',
            x: '8vw',
            ease: 'none',
          },
          0
        );
      }

      // 2. SPACE - moves vertically medium + horizontal drift left
      if (word2Ref.current) {
        tl.to(
          word2Ref.current,
          {
            y: '65vh',
            x: '-10vw',
            ease: 'none',
          },
          0
        );
      }

      // 3. MOTION - moves vertically faster + scales
      if (word3Ref.current) {
        tl.to(
          word3Ref.current,
          {
            y: '100vh',
            scale: 1.1,
            ease: 'none',
          },
          0
        );
      }

      // 4. DEPTH - moves vertically fastest across the foreground
      if (word4Ref.current) {
        tl.to(
          word4Ref.current,
          {
            y: '145vh',
            x: '-6vw',
            ease: 'none',
          },
          0
        );
      }

      // Architectural divider lines parallax
      if (line1Ref.current) {
        tl.to(line1Ref.current, { scaleX: 1.2, opacity: 0.8, ease: 'none' }, 0);
      }
      if (line2Ref.current) {
        tl.to(line2Ref.current, { y: '40vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="typography"
      ref={containerRef}
      className="relative min-h-[220vh] w-full bg-[#F4F1EA] text-[#11110F] overflow-hidden select-none py-[16vh]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          ref={line1Ref}
          className="absolute top-[28%] left-0 w-full h-[1px] bg-[#DDD8CB] origin-left"
        />
        <div
          ref={line2Ref}
          className="absolute top-0 right-1/4 w-[1px] h-full bg-[#DDD8CB]"
        />
      </div>

      {/* Editorial Header */}
      <div className="px-6 sm:px-12 md:px-20 mb-24 relative z-10">
        <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-sans font-medium text-[#77736B]">
          04 / FORM
        </span>
        <p className="mt-3 text-sm text-[#77736B] font-light max-w-sm">
          Four fundamental coordinates of spatial choreography.
        </p>
      </div>

      {/* Word 1: LIGHT (Slow + Drifts Right) */}
      <div
        ref={word1Ref}
        className="relative z-10 pl-6 sm:pl-16 md:pl-28 mb-32 will-change-transform"
      >
        <span className="text-[12px] font-sans text-[#77736B] block mb-2 tracking-widest uppercase">
          01 / ILLUMINATION
        </span>
        <div className="text-display-word text-[#11110F] italic font-serif leading-none">
          Light
        </div>
      </div>

      {/* Word 2: SPACE (Medium + Drifts Left) */}
      <div
        ref={word2Ref}
        className="relative z-20 pr-6 sm:pr-20 md:pr-36 flex flex-col items-end mb-40 will-change-transform"
      >
        <span className="text-[12px] font-sans text-[#77736B] block mb-2 tracking-widest uppercase">
          02 / INTERVAL
        </span>
        <div className="text-display-word text-[#77736B] font-serif leading-none tracking-tight">
          Space
        </div>
      </div>

      {/* Word 3: MOTION (Fast + Subtle Scale) */}
      <div
        ref={word3Ref}
        className="relative z-30 pl-8 sm:pl-24 md:pl-44 mb-36 will-change-transform origin-left"
      >
        <span className="text-[12px] font-sans text-[#A65D45] block mb-2 tracking-widest uppercase">
          03 / VELOCITY
        </span>
        <div className="text-display-word text-[#A65D45] font-serif leading-none">
          Motion
        </div>
      </div>

      {/* Word 4: DEPTH (High-velocity Foreground Sweep) */}
      <div
        ref={word4Ref}
        className="relative z-40 pr-6 sm:pr-16 md:pr-28 flex flex-col items-end will-change-transform"
      >
        <span className="text-[12px] font-sans text-[#11110F] block mb-2 tracking-widest uppercase">
          04 / PERSPECTIVE
        </span>
        <div className="text-display-word text-[#11110F] font-serif leading-none italic">
          Depth.
        </div>
      </div>
    </section>
  );
};

export default TypographicScene;
