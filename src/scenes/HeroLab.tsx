import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroLabProps {
  onExplore?: () => void;
}

export const HeroLab: React.FC<HeroLabProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // background grid & marks (0.08)
  const layer2Ref = useRef<HTMLDivElement>(null); // large circle (0.18)
  const layer3Ref = useRef<HTMLDivElement>(null); // thin SVG line (0.32)
  const layer4Ref = useRef<HTMLDivElement>(null); // organic shape (0.48)
  const layer5Ref = useRef<HTMLDivElement>(null); // small geometric objects (0.65)
  const layer6Ref = useRef<HTMLDivElement>(null); // typography (0.85)
  const layer7Ref = useRef<HTMLDivElement>(null); // foreground object (1.15)

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Layer 1: Background texture (speed 0.08)
      if (layer1Ref.current) {
        tl.to(layer1Ref.current, { y: '8vh', ease: 'none' }, 0);
      }

      // Layer 2: Large circle (speed 0.18)
      if (layer2Ref.current) {
        tl.to(layer2Ref.current, { y: '18vh', scale: 0.95, ease: 'none' }, 0);
      }

      // Layer 3: Thin SVG line (speed 0.32)
      if (layer3Ref.current) {
        tl.to(layer3Ref.current, { y: '32vh', rotate: 8, ease: 'none' }, 0);
      }

      // Layer 4: Organic vector shape (speed 0.48)
      if (layer4Ref.current) {
        tl.to(layer4Ref.current, { y: '48vh', scale: 1.08, rotate: -12, ease: 'none' }, 0);
      }

      // Layer 5: Small geometric objects (speed 0.65)
      if (layer5Ref.current) {
        tl.to(layer5Ref.current, { y: '65vh', ease: 'none' }, 0);
      }

      // Layer 6: Main typography (speed 0.85)
      if (layer6Ref.current) {
        tl.to(layer6Ref.current, { y: '85vh', opacity: 0.15, ease: 'none' }, 0);
      }

      // Layer 7: Foreground object crossing the camera (speed 1.15)
      if (layer7Ref.current) {
        tl.to(layer7Ref.current, { y: '120vh', x: '-15vw', rotate: 20, ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[145vh] w-full bg-[#F5F5F0] text-[#111111] overflow-hidden select-none"
    >
      {/* Layer 1: Background Subtle Grid Marks & Ticks (Speed 0.08) */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 pointer-events-none opacity-40 will-change-transform"
      >
        <div className="absolute top-20 left-12 w-2 h-2 bg-[#111111]" />
        <div className="absolute top-20 right-16 w-2 h-2 bg-[#111111]" />
        <div className="absolute top-[40%] left-[20%] w-[1px] h-32 bg-[#E2E2DC]" />
        <div className="absolute top-[35%] right-[25%] w-32 h-[1px] bg-[#E2E2DC]" />
      </div>

      {/* Layer 2: Large Minimal Circle (Speed 0.18) */}
      <div
        ref={layer2Ref}
        className="absolute top-[12vh] right-[4vw] sm:right-[10vw] w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full border-2 border-[#111111]/10 bg-[#B8FF3D]/15 pointer-events-none will-change-transform"
      />

      {/* Layer 3: Thin SVG Line (Speed 0.32) */}
      <div
        ref={layer3Ref}
        className="absolute top-[28vh] left-[35vw] w-[450px] h-[300px] pointer-events-none will-change-transform"
      >
        <svg viewBox="0 0 450 300" className="w-full h-full fill-none stroke-[#111111]/25 stroke-[1.5]">
          <path d="M 10 150 Q 150 10 280 150 T 440 150" />
          <circle cx="280" cy="150" r="4" className="fill-[#FF6B4A]" />
        </svg>
      </div>

      {/* Layer 4: Crisp Organic Vector Shape in Acid Lime (Speed 0.48) */}
      <div
        ref={layer4Ref}
        className="absolute top-[26vh] right-[8vw] sm:right-[14vw] w-48 sm:w-72 h-48 sm:h-72 pointer-events-none will-change-transform z-10"
      >
        <div className="w-full h-full bg-[#B8FF3D] rounded-[42%_58%_70%_30%_/_45%_45%_55%_55%] shadow-sm" />
      </div>

      {/* Layer 5: Small Geometric Objects (Speed 0.65) */}
      <div
        ref={layer5Ref}
        className="absolute top-[42vh] left-[8vw] sm:left-[14vw] pointer-events-none will-change-transform z-10 flex flex-col space-y-6"
      >
        <div className="w-4 h-4 bg-[#FF6B4A] rounded-full" />
        <div className="w-3 h-3 border border-[#111111]" />
        <div className="w-6 h-[1.5px] bg-[#111111]" />
      </div>

      {/* Layer 6: Main Typography (Speed 0.85) */}
      <div
        ref={layer6Ref}
        className="relative z-20 pt-[24vh] sm:pt-[26vh] px-6 sm:px-12 md:px-20 max-w-6xl will-change-transform"
      >
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#B8FF3D] inline-block" />
          <span className="text-[11px] sm:text-[12px] uppercase tracking-widest font-mono font-semibold text-[#666666]">
            INTERACTIVE STUDY / 001
          </span>
        </div>

        <h1 className="text-grotesk-hero text-[#111111] mb-6">
          MAKE
          <br />
          THINGS
          <br />
          <span className="text-[#111111] hover:text-[#B8FF3D] transition-colors cursor-default">
            MOVE.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#666666] font-sans font-normal max-w-md sm:max-w-lg mb-10 leading-snug">
          An experimental journey through space, depth and motion. Simple at rest, spectacular in motion.
        </p>

        <button
          onClick={onExplore}
          className="group inline-flex items-center space-x-3 text-[13px] uppercase tracking-widest font-sans font-bold text-[#111111] hover:text-[#111111] py-3 px-6 bg-[#B8FF3D] hover:bg-[#111111] hover:text-[#B8FF3D] transition-all duration-200 cursor-pointer rounded-none border border-[#111111]"
        >
          <span>EXPLORE EXPERIMENTS</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Layer 7: Foreground Geometric Shape Crossing Camera (Speed 1.15) */}
      <div
        ref={layer7Ref}
        className="absolute top-[65vh] right-[2vw] sm:right-[6vw] w-28 sm:w-44 h-28 sm:h-44 bg-[#111111] pointer-events-none will-change-transform z-30"
      >
        <div className="w-full h-full flex items-center justify-center text-[#F5F5F0] text-[11px] font-mono tracking-widest">
          01 // POS
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-10 left-6 sm:left-20 flex items-center space-x-3 text-[11px] uppercase tracking-widest font-mono text-[#666666]">
        <ArrowDown size={14} className="animate-bounce" />
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
};

export default HeroLab;
