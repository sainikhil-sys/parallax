import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SpaceScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const fgSliceRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Clip path transition on container as it scrolls into view
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { clipPath: 'inset(6% 8% 6% 8% round 4px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 15%',
              scrub: 1,
            },
          }
        );
      }

      // 2. Parallax timeline for the internal layers
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Background architectural photograph - slow deep drift
      if (bgImageRef.current) {
        tl.to(bgImageRef.current, { y: '18vh', scale: 1.08, ease: 'none' }, 0);
      }

      // Typography - medium drift
      if (textRef.current) {
        tl.to(textRef.current, { y: '50vh', ease: 'none' }, 0);
      }

      // Foreground image slice - fast differential speed
      if (fgSliceRef.current) {
        tl.to(fgSliceRef.current, { y: '85vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="space"
      ref={containerRef}
      className="relative min-h-[170vh] w-full bg-[#F4F1EA] text-[#11110F] overflow-hidden select-none py-[12vh]"
    >
      {/* Editorial Category Tag */}
      <div className="px-6 sm:px-12 md:px-20 mb-8 sm:mb-12">
        <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-sans font-medium text-[#77736B]">
          03 / ARCHITECTURE
        </span>
      </div>

      {/* Full-width Image Frame with Clipping Transition */}
      <div
        ref={imageFrameRef}
        className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden will-change-transform shadow-lg bg-[#ECE8DE]"
      >
        {/* Background Architectural Photo (Moves Slowly: 18vh) */}
        <img
          ref={bgImageRef}
          src="/images/space_architecture.jpg"
          alt="Contemporary curved concrete museum architecture"
          className="absolute -top-[15%] left-0 w-full h-[130%] object-cover filter contrast-[1.02] brightness-[0.98] will-change-transform"
          loading="lazy"
        />

        {/* Soft Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#11110F]/40 via-transparent to-transparent pointer-events-none" />

        {/* Foreground Architectural Slice (Moves Fast: 85vh) */}
        <div
          ref={fgSliceRef}
          className="absolute -bottom-16 right-[6vw] sm:right-[12vw] w-[45vw] sm:w-[32vw] max-w-[420px] h-[55vh] rounded-sm overflow-hidden shadow-2xl border border-white/30 hidden sm:block will-change-transform z-20 pointer-events-none"
        >
          <img
            src="/images/space_architecture.jpg"
            alt="Foreground architectural detail"
            className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.08] scale-125"
          />
          <div className="absolute inset-0 border border-white/40" />
        </div>

        {/* Overlay Typography (Moves Medium: 50vh) */}
        <div
          ref={textRef}
          className="absolute top-[16vh] left-6 sm:left-14 md:left-24 z-30 max-w-xl will-change-transform"
        >
          <h2 className="text-display-section text-[#F4F1EA] drop-shadow-md font-normal leading-[0.9]">
            Space
            <br />
            changes
            <br />
            <span className="italic font-serif font-light text-[#F4F1EA]/80">
              with motion.
            </span>
          </h2>

          <p className="mt-8 text-sm sm:text-base text-[#F4F1EA]/85 font-sans font-light max-w-sm drop-shadow leading-relaxed">
            Light refracts across stone as the observer advances. Perspective is not fixed; it is an ongoing negotiation between stillness and velocity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpaceScene;
