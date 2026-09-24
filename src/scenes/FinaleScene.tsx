import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ArrowUp, Sparkle } from '@phosphor-icons/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface FinaleSceneProps {
  onRestart?: () => void;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ onRestart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const vectorRaysRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<HTMLDivElement>(null);
  const liminalTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const handleScrollToTop = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // CONVERGENCE TIMELINE
      // As the user scrolls into the finale, all elements collapse inward
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });

      // Scattered rings collapse inward into the center
      tl.fromTo(
        ring1Ref.current,
        { scale: 2.5, opacity: 0.1, rotate: 90 },
        { scale: 0.15, opacity: 0.8, rotate: 0, ease: 'power2.inOut' },
        0
      );

      tl.fromTo(
        ring2Ref.current,
        { scale: 3.5, opacity: 0.05, rotate: -120 },
        { scale: 0.2, opacity: 0.7, rotate: 0, ease: 'power2.inOut' },
        0
      );

      // Inward convergence rays
      tl.fromTo(
        vectorRaysRef.current,
        { scale: 1.8, opacity: 0.1 },
        { scale: 0.3, opacity: 0.9, ease: 'power2.inOut' },
        0
      );

      // Collapse into a single point of light
      tl.fromTo(
        pointLightRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1.5, opacity: 1, ease: 'power2.out' },
        0.5
      );

      // Monumental LIMINAL typography reveal
      tl.fromTo(
        liminalTextRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.6
      );

      // SCROLL AGAIN CTA reveal
      tl.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.75
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="finale"
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-[#050505] overflow-hidden flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 select-none"
    >
      {/* ============================================================
          ALL SCATTERED LAYERS CONVERGE INWARD
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Converging Outer Ring */}
        <div
          ref={ring1Ref}
          className="absolute w-[600px] h-[600px] rounded-full border border-white/20 will-change-transform"
        />

        {/* Converging Inner Ring */}
        <div
          ref={ring2Ref}
          className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-[#00F0FF]/40 will-change-transform"
        />

        {/* Vector Convergence Lines */}
        <div ref={vectorRaysRef} className="absolute inset-0 flex items-center justify-center will-change-transform">
          <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="50%" y2="50%" stroke="#00F0FF" strokeWidth="1" />
            <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#00F0FF" strokeWidth="1" />
            <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#00F0FF" strokeWidth="1" />
            <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#00F0FF" strokeWidth="1" />
          </svg>
        </div>

        {/* THE SINGLE POINT OF LIGHT (The Portal condensed into a singularity) */}
        <div
          ref={pointLightRef}
          className="w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_40px_#00F0FF] will-change-transform"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto flex flex-col items-center">
        <div className="flex items-center gap-2 font-mono text-xs text-[#858585] tracking-[0.3em] uppercase mb-8">
          <Sparkle size={14} className="text-[#00F0FF]" />
          <span>SINGULARITY CONVERGENCE</span>
        </div>

        {/* LIMINAL MONUMENTAL TYPOGRAPHY */}
        <div ref={liminalTextRef} className="will-change-transform">
          <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-tighter uppercase text-white leading-none mb-6">
            LIMINAL
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#858585] tracking-[0.35em] uppercase mb-10">
            THE JOURNEY HAS NO BOUNDARY
          </p>
        </div>

        {/* SCROLL AGAIN CTA */}
        <div ref={ctaRef} className="will-change-transform">
          <MagneticButton
            onClick={handleScrollToTop}
            ariaLabel="Scroll back to top"
            variant="primary"
          >
            <span>SCROLL AGAIN</span>
            <ArrowUp size={16} className="text-[#050505]" />
          </MagneticButton>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#858585] gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#F5F5F0] tracking-[0.2em]">LIMINAL</span>
          <span className="text-white/20">•</span>
          <span>TECHFEST IIT BOMBAY 2026</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] tracking-wider text-[#505050]">
          <span>LENIS + GSAP SCROLLTRIGGER ENGINE</span>
          <span className="text-[#00F0FF]">120 FPS PARALLAX ARCHITECTURE</span>
        </div>
      </footer>
    </section>
  );
};

export default FinaleScene;
