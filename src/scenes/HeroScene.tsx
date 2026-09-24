import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSceneProps {
  onEnter?: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // background texture (0.08)
  const layer2Ref = useRef<HTMLDivElement>(null); // distant architectural arch (0.20)
  const layer3Ref = useRef<HTMLDivElement>(null); // atmospheric drape (0.35)
  const layer4Ref = useRef<HTMLDivElement>(null); // main sculptural object (0.60)
  const layer5Ref = useRef<HTMLDivElement>(null); // typography (0.85)
  const layer6Ref = useRef<HTMLDivElement>(null); // foreground framing (1.10)

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create smooth differential parallax across all 6 layers
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Layer 1: Background texture - slowest
      if (layer1Ref.current) {
        tl.to(layer1Ref.current, { y: '8vh', ease: 'none' }, 0);
      }

      // Layer 2: Distant arch
      if (layer2Ref.current) {
        tl.to(layer2Ref.current, { y: '20vh', scale: 0.96, ease: 'none' }, 0);
      }

      // Layer 3: Soft atmosphere
      if (layer3Ref.current) {
        tl.to(layer3Ref.current, { y: '35vh', opacity: 0.4, ease: 'none' }, 0);
      }

      // Layer 4: Main sculpture
      if (layer4Ref.current) {
        tl.to(layer4Ref.current, { y: '55vh', scale: 1.05, ease: 'none' }, 0);
      }

      // Layer 5: Typography
      if (layer5Ref.current) {
        tl.to(layer5Ref.current, { y: '78vh', opacity: 0.2, ease: 'none' }, 0);
      }

      // Layer 6: Foreground framing - fastest
      if (layer6Ref.current) {
        tl.to(layer6Ref.current, { y: '110vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnterClick = () => {
    if (onEnter) {
      onEnter();
    } else {
      const el = document.getElementById('movement');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[140vh] w-full bg-[#F4F1EA] text-[#11110F] overflow-hidden select-none"
    >
      {/* Layer 1: Background Subtle Warm Gradient & Gridline (Speed: 0.08) */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 pointer-events-none will-change-transform opacity-70"
        style={{
          background:
            'radial-gradient(circle at 65% 40%, rgba(221, 216, 203, 0.55) 0%, rgba(244, 241, 234, 0.1) 60%)',
        }}
      >
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#DDD8CB] opacity-40" />
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-[#DDD8CB] opacity-25" />
      </div>

      {/* Layer 2: Distant Minimalist Architectural Arch Outline (Speed: 0.20) */}
      <div
        ref={layer2Ref}
        className="absolute top-16 right-4 sm:right-24 md:right-36 w-[320px] sm:w-[500px] h-[580px] pointer-events-none will-change-transform opacity-40"
      >
        <div className="w-full h-full rounded-t-full border border-[#DDD8CB] border-b-0" />
      </div>

      {/* Layer 3: Soft Atmospheric Tint & Shadow Depth (Speed: 0.35) */}
      <div
        ref={layer3Ref}
        className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] pointer-events-none rounded-full blur-3xl opacity-35 bg-[#ECE8DE] will-change-transform"
      />

      {/* Layer 4: Main Abstract Sculptural Composition (Speed: 0.60) */}
      <div
        ref={layer4Ref}
        className="absolute top-[18vh] sm:top-[16vh] right-4 sm:right-12 md:right-24 lg:right-32 w-[72vw] sm:w-[48vw] md:w-[40vw] max-w-[560px] pointer-events-none will-change-transform z-10"
      >
        <div className="relative shadow-2xl rounded-sm overflow-hidden border border-[#DDD8CB]/60">
          <img
            src="/images/hero_sculpture.jpg"
            alt="Minimalist abstract ceramic and travertine sculpture"
            className="w-full h-auto object-cover filter contrast-[1.03] brightness-[0.98]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1EA]/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Layer 5: Editorial Typography & Entry CTA (Speed: 0.85) */}
      <div
        ref={layer5Ref}
        className="relative z-20 pt-[24vh] sm:pt-[26vh] px-6 sm:px-12 md:px-20 max-w-5xl will-change-transform"
      >
        <div className="inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-sans font-medium text-[#77736B] mb-6 sm:mb-8">
          AN EXPLORATION OF MOTION &amp; DEPTH
        </div>

        <h1 className="text-display-hero text-[#11110F] mb-6 sm:mb-8 font-normal leading-[0.88]">
          Between
          <br />
          <span className="italic font-serif font-light text-[#77736B]">worlds.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-[#77736B] max-w-md sm:max-w-lg mb-10 sm:mb-12 font-light leading-relaxed">
          An interactive digital exhibition investigating how physical space, form, and architectural light transform through continuous movement.
        </p>

        {/* Small Elegant Button: ENTER EXPERIENCE → */}
        <div>
          <button
            onClick={handleEnterClick}
            className="group inline-flex items-center space-x-3 text-[13px] uppercase tracking-widest font-sans font-medium text-[#11110F] hover:text-[#A65D45] transition-colors cursor-pointer py-2 border-b border-[#11110F] hover:border-[#A65D45]"
          >
            <span>ENTER EXPERIENCE</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Layer 6: Foreground Floating Architectural Accent (Speed: 1.10) */}
      <div
        ref={layer6Ref}
        className="absolute -bottom-10 left-6 sm:left-16 w-32 sm:w-48 h-64 border-l border-t border-[#A65D45]/30 pointer-events-none will-change-transform z-30"
      >
        <span className="block text-[10px] tracking-widest text-[#A65D45] uppercase font-sans mt-3 ml-3 opacity-60">
          01 / DEPTH
        </span>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-8 left-6 sm:left-20 flex items-center space-x-3 text-[11px] uppercase tracking-widest font-sans text-[#77736B] opacity-60">
        <ArrowDown size={14} className="animate-bounce" />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
};

export default HeroScene;
