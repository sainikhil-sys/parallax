import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/navigation/Navigation';
import Cursor from './components/cursor/Cursor';
import ScrollIndicator from './components/ui/ScrollIndicator';
import OpeningSequence from './components/opening/OpeningSequence';

import PortalScene from './scenes/PortalScene';
import FragmentScene from './scenes/FragmentScene';
import VoidScene from './scenes/VoidScene';
import DescentScene from './scenes/DescentScene';
import SignalScene from './scenes/SignalScene';
import FinaleScene from './scenes/FinaleScene';
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
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
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
          duration: 1.5,
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
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F0] selection:bg-[#00F0FF] selection:text-black">
      {/* Film grain noise overlay */}
      <div className="grain-overlay" />

      {/* Opening sequence */}
      {!isOpeningDone && (
        <OpeningSequence onComplete={() => setIsOpeningDone(true)} />
      )}

      {/* Interactive custom cursor */}
      <Cursor />

      {/* Vertical right scroll indicator */}
      <ScrollIndicator />

      {/* Floating minimal navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Continuous Liminal Scenes */}
      <main id="main-content" className="relative z-10 w-full overflow-hidden">
        {/* Scene 01: Hero - The Portal (8 Parallax Layers) */}
        <PortalScene onExplore={() => handleNavigate('#fragments')} />

        {/* Scene 02: Floating Fragments (3D Parallax Field of Interactive Artifacts) */}
        <FragmentScene />

        {/* Scene 03: The Void (Pinned ScrollTrigger Differential Typography Parallax) */}
        <VoidScene />

        {/* Scene 04: The Descent (Vertical Camera Descent with 6 Crossing Strata) */}
        <DescentScene />

        {/* Scene 05: Signal (Discovered Tactile Interface Panel) */}
        <SignalScene />

        {/* Epilogue: Collapsing Inward & Minimal Footer */}
        <FinaleScene onRestart={handleScrollToTop} />
      </main>
    </div>
  );
};

export default App;
