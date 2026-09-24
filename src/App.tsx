import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/navigation/Navigation';
import Cursor from './components/cursor/Cursor';
import ScrollIndicator from './components/ui/ScrollIndicator';
import OpeningSequence from './components/opening/OpeningSequence';

import HeroScene from './scenes/HeroScene';
import MovementScene from './scenes/MovementScene';
import SpaceScene from './scenes/SpaceScene';
import TypographicScene from './scenes/TypographicScene';
import StillnessScene from './scenes/StillnessScene';
import OutroScene from './scenes/OutroScene';
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
      duration: 1.3,
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
    }, 400);

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
          duration: 1.6,
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
        duration: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F4F1EA] text-[#11110F] selection:bg-[#A65D45] selection:text-[#F4F1EA]">
      {/* Subtle organic film grain texture overlay */}
      <div className="grain-overlay" />

      {/* Opening sequence */}
      {!isOpeningDone && (
        <OpeningSequence onComplete={() => setIsOpeningDone(true)} />
      )}

      {/* Interactive custom cursor */}
      <Cursor />

      {/* Subtle hairline scroll progress indicator */}
      <ScrollIndicator />

      {/* Floating editorial navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Continuous ÉLAN Exhibition Scenes */}
      <main id="main-content" className="relative z-10 w-full overflow-hidden">
        {/* Section 01: Hero - Between Worlds (6 Parallax Layers) */}
        <HeroScene onEnter={() => handleNavigate('#movement')} />

        {/* Section 02: Movement (Monolithic Brutalist Architecture Parallax) */}
        <MovementScene />

        {/* Section 03: Space (Full-width Architectural Image & Clipping Parallax) */}
        <SpaceScene />

        {/* Section 04: Form (Typographic Parallax with 4 Independent Coordinates) */}
        <TypographicScene />

        {/* Section 05: Stillness (Suspended Kinetic Sculpture & Quiet Depth) */}
        <StillnessScene />

        {/* Outro: See you on the other side & Restart CTA */}
        <OutroScene onRestart={handleScrollToTop} />
      </main>
    </div>
  );
};

export default App;
