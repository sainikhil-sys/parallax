import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StillnessScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

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

      // Background moves slowly
      if (bgRef.current) {
        tl.to(bgRef.current, { y: '10vh', ease: 'none' }, 0);
      }

      // Sculpture moves medium
      if (sculptureRef.current) {
        tl.to(sculptureRef.current, { y: '32vh', scale: 1.03, ease: 'none' }, 0);
      }

      // Foreground shadow moves faster
      if (shadowRef.current) {
        tl.to(shadowRef.current, { y: '65vh', ease: 'none' }, 0);
      }

      // Text remains almost stable (only subtle anchor drift: 12vh)
      if (textRef.current) {
        tl.to(textRef.current, { y: '12vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stillness"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-[#151613] text-[#F4F1EA] overflow-hidden select-none flex flex-col justify-center items-center py-[16vh]"
    >
      {/* Layer 1: Background Subtle Light Well (Speed: Slow) */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-40 will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(166, 93, 69, 0.12) 0%, rgba(21, 22, 19, 0.95) 65%)',
        }}
      />

      {/* Layer 2: Suspended Bronze & Granite Sculpture (Speed: Medium) */}
      <div
        ref={sculptureRef}
        className="relative z-10 w-[78vw] sm:w-[55vw] md:w-[42vw] max-w-[580px] will-change-transform mb-16 shadow-2xl rounded-sm overflow-hidden border border-[rgba(244,241,234,0.1)]"
      >
        <img
          src="/images/finale_sculpture.jpg"
          alt="Minimalist abstract dark bronze and granite sculpture"
          className="w-full h-auto object-cover filter contrast-[1.05] brightness-[0.95]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151613] via-transparent to-transparent opacity-85" />
      </div>

      {/* Layer 3: Typography (Almost Stable: 12vh) */}
      <div
        ref={textRef}
        className="relative z-20 text-center px-6 max-w-2xl will-change-transform"
      >
        <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-sans font-medium text-[#928E85] block mb-4">
          05 / STILLNESS
        </span>

        <h2 className="text-display-section text-[#F4F1EA] font-normal leading-[0.95] mb-4">
          Everything moves.
        </h2>

        <p className="font-serif italic text-lg sm:text-2xl text-[#928E85] font-light">
          And that is what makes it alive.
        </p>
      </div>

      {/* Layer 4: Foreground Shadow Plane (Speed: Fast) */}
      <div
        ref={shadowRef}
        className="absolute -bottom-20 left-0 w-full h-64 bg-gradient-to-t from-[#151613] to-transparent pointer-events-none will-change-transform z-30 opacity-90"
      />
    </section>
  );
};

export default StillnessScene;
