import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FinaleLabProps {
  onReplay?: () => void;
}

export const FinaleLab: React.FC<FinaleLabProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

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

      if (circleRef.current) {
        tl.to(circleRef.current, { scale: 1.4, rotate: 45, ease: 'none' }, 0);
      }
      if (textRef.current) {
        tl.to(textRef.current, { y: '-10vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleReplay = () => {
    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="finale"
      ref={containerRef}
      className="relative min-h-[100vh] w-full bg-[#F5F5F0] text-[#111111] overflow-hidden select-none flex flex-col justify-between p-8 sm:p-16 md:p-24"
    >
      {/* Background Graphic Lime Element */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full border border-[#111111]/15 pointer-events-none will-change-transform z-0"
      />

      <div className="w-full flex justify-between items-center relative z-10 text-[11px] font-mono text-[#666666] uppercase">
        <span>06 // CONCLUSION</span>
        <span>PARALLAX/ 2026</span>
      </div>

      {/* Main Center Typography */}
      <div
        ref={textRef}
        className="relative z-10 max-w-4xl mx-auto text-center my-auto py-12 will-change-transform"
      >
        <h2 className="text-grotesk-hero text-[#111111] leading-none mb-6">
          KEEP
          <br />
          <span className="hover:text-[#B8FF3D] transition-colors cursor-default">
            MOVING.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-[#666666] font-sans font-light mb-10 max-w-md mx-auto">
          "Good interaction should feel inevitable."
        </p>

        <div>
          <button
            onClick={handleReplay}
            className="group relative inline-flex items-center space-x-4 text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-[#111111] bg-transparent hover:bg-[#B8FF3D] border border-[#111111] px-8 py-4 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 group-hover:translate-x-1 transition-transform">
              REPLAY EXPERIENCE
            </span>
            <span className="relative z-10 font-bold group-hover:translate-x-2 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Minimal Footer Info */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-t border-[#E2E2DC] pt-8 text-[12px] font-sans text-[#666666]">
        <div className="font-sans font-bold text-sm text-[#111111] tracking-tight uppercase mb-2 sm:mb-0">
          PARALLAX<span className="text-[#B8FF3D]">/</span>
        </div>
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          Interactive Design &amp; Motion Laboratory
        </div>
        <div className="text-right font-mono text-[11px]">
          TECHFEST 2026
        </div>
      </div>
    </footer>
  );
};

export default FinaleLab;
