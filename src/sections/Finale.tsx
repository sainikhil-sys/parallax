import React, { useRef } from 'react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { RevealText } from '../components/RevealText';
import { MagneticButton } from '../components/MagneticButton';
import { RotateCcw, Compass } from 'lucide-react';

interface FinaleProps {
  onRestart?: () => void;
  onExploreAgain?: () => void;
}

export const Finale: React.FC<FinaleProps> = ({ onRestart, onExploreAgain }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreAgain = () => {
    if (onExploreAgain) {
      onExploreAgain();
    } else {
      const journey = document.getElementById('journey');
      journey?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="finale"
      ref={containerRef}
      className="relative min-h-screen w-full bg-horizon-bg overflow-hidden flex flex-col justify-between pt-32 pb-20 px-6 sm:px-12"
    >
      {/* ============================================================
          CONVERGING LAYER 1: Deep Perspective Vector Rays (Speed: 0.20)
          Converges toward the center horizon as you scroll!
          ============================================================ */}
      <ParallaxLayer
        speed={0.2}
        scale={[1.2, 0.95]}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          className="w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radial convergence lines pointing into infinite center */}
          <line x1="0" y1="0" x2="50%" y2="50%" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#00e5ff" strokeWidth="0.8" />
          <line x1="25%" y1="0" x2="50%" y2="50%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="75%" y1="0" x2="50%" y2="50%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="25%" y1="100%" x2="50%" y2="50%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="75%" y1="100%" x2="50%" y2="50%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 6" />
        </svg>

        {/* Center Convergence Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-horizon-accent/15 blur-[120px] rounded-full" />
      </ParallaxLayer>

      {/* ============================================================
          CONVERGING LAYER 2: Horizon Axis Plane (Speed: 0.50)
          ============================================================ */}
      <ParallaxLayer
        speed={0.5}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-horizon-accent/40 to-transparent" />
      </ParallaxLayer>

      {/* ============================================================
          MAIN CONTENT LAYER (Speed: 0.85)
          ============================================================ */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto flex flex-col items-center">
        {/* Section number */}
        <div className="flex items-center gap-3 font-mono text-xs text-horizon-text-muted mb-6 tracking-widest uppercase">
          <span className="text-horizon-accent font-semibold">05</span>
          <span className="text-white/20">/</span>
          <span className="text-horizon-text-dim">05</span>
          <span className="w-1.5 h-1.5 rounded-full bg-horizon-accent mx-1" />
          <span className="text-white/40">EPILOGUE</span>
        </div>

        {/* Large heading: THE JOURNEY NEVER ENDS. */}
        <h2 className="text-section-title font-display font-extrabold uppercase text-white tracking-tight leading-none mb-6">
          <div className="overflow-hidden">
            <RevealText splitBy="words" delay={0.1}>
              THE JOURNEY
            </RevealText>
          </div>
          <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-horizon-accent">
            <RevealText splitBy="words" delay={0.25}>
              NEVER ENDS.
            </RevealText>
          </div>
        </h2>

        {/* Supporting text */}
        <p className="text-horizon-text-muted text-base sm:text-xl font-light max-w-lg mb-12 leading-relaxed">
          “Scroll was only the beginning.”
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <MagneticButton
            onClick={handleRestart}
            ariaLabel="Restart Journey"
            variant="primary"
          >
            <span>RESTART JOURNEY</span>
            <RotateCcw className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            onClick={handleExploreAgain}
            ariaLabel="Explore Again"
            variant="outline"
          >
            <span>EXPLORE AGAIN</span>
            <Compass className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="relative z-10 text-center font-mono text-[11px] text-horizon-text-dim tracking-widest uppercase mt-8">
        END OF VIRTUAL HORIZON SEQUENCE
      </div>
    </section>
  );
};

export default Finale;
