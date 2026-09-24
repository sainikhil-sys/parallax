import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/navigation/Navigation';
import Cursor from './components/cursor/Cursor';
import OpeningSequence from './components/opening/OpeningSequence';

import HeroLab from './scenes/HeroLab';
import LayersLab from './scenes/LayersLab';
import StaggerLab from './scenes/StaggerLab';
import TypoLab from './scenes/TypoLab';
import SvgLab from './scenes/SvgLab';
import FinaleLab from './scenes/FinaleLab';
import { useReducedMotion } from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isOpeningDone, setIsOpeningDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [prefersReducedMotion]);

  const handleNavigate = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F0] text-[#111111] selection:bg-[#B8FF3D] selection:text-[#111111]">
      {/* Rapid minimal opening sequence */}
      {!isOpeningDone && (
        <OpeningSequence onComplete={() => setIsOpeningDone(true)} />
      )}

      {/* Interactive custom cursor with acid-lime expansion */}
      <Cursor />

      {/* Floating minimal navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Continuous Parallax Motion Laboratory Scenes */}
      <main id="main-content" className="relative z-10 w-full overflow-hidden">
        {/* Experiment 01: Hero - Parallax Typography & Geometric Depth (7 Layers) */}
        <HeroLab onExplore={() => handleNavigate('#layers')} />

        {/* Experiment 02: Layer Separation Collage */}
        <LayersLab />

        {/* Experiment 03: Staggered Shapes (Black Contrast Section) */}
        <StaggerLab />

        {/* Experiment 04: Typographic Motion (Space, Motion, Depth) */}
        <TypoLab />

        {/* Experiment 05: SVG Motion & Path Interpolation */}
        <SvgLab />

        {/* Experiment 06: Conclusion & Replay Experience */}
        <FinaleLab onReplay={handleScrollToTop} />
      </main>
    </div>
  );
};

export default App;
