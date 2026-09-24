import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OutroSceneProps {
  onRestart?: () => void;
}

export const OutroScene: React.FC<OutroSceneProps> = ({ onRestart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      if (archRef.current) {
        tl.to(archRef.current, { y: '-15vh', scale: 1.05, ease: 'none' }, 0);
      }
      if (textRef.current) {
        tl.to(textRef.current, { y: '-8vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="outro"
      ref={containerRef}
      className="relative min-h-[100vh] w-full bg-[#F4F1EA] text-[#11110F] overflow-hidden select-none flex flex-col justify-between p-8 sm:p-16 md:p-24"
    >
      {/* Background Architectural Arch Silhouette */}
      <div
        ref={archRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[50vw] h-[70vh] pointer-events-none opacity-20 will-change-transform"
      >
        <div className="w-full h-full rounded-t-full border border-[#DDD8CB]" />
      </div>

      {/* Top spacer */}
      <div className="w-full" />

      {/* Main Serif Typography & Restart CTA */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center my-auto py-12 will-change-transform"
      >
        <h2 className="text-display-hero text-[#11110F] font-normal leading-[0.88] mb-12">
          See you
          <br />
          <span className="italic font-serif font-light text-[#77736B]">
            on the other side.
          </span>
        </h2>

        <div>
          <button
            onClick={handleRestart}
            className="group inline-flex items-center space-x-3 text-[13px] uppercase tracking-widest font-sans font-medium text-[#11110F] hover:text-[#A65D45] transition-colors cursor-pointer py-2 border-b border-[#11110F] hover:border-[#A65D45]"
          >
            <span>RESTART EXPERIENCE</span>
            <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">
              ↗
            </span>
          </button>
        </div>
      </div>

      {/* Minimal Footer Info */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-t border-[#DDD8CB] pt-8 text-[12px] sm:text-[13px] font-sans text-[#77736B]">
        <div className="font-serif text-lg text-[#11110F] tracking-tight mb-2 sm:mb-0">
          ÉLAN
        </div>
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          Interactive Parallax Experience
        </div>
        <div className="text-right tabular-nums">
          2026
        </div>
      </div>
    </footer>
  );
};

export default OutroScene;
