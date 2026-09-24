import React, { useRef } from 'react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { SectionHeader } from '../components/SectionHeader';
import { StatBlock } from '../components/StatBlock';

export const Future: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '01', label: 'DEPTH DIMENSION', sublabel: 'Continuous Z-Buffer' },
    { value: '05', label: 'DISCRETE LAYERS', sublabel: 'Decoupled Velocities' },
    { value: '∞', label: 'POSSIBILITIES', sublabel: 'Digital Spatial Horizon' },
  ];

  return (
    <section
      id="future"
      ref={containerRef}
      className="relative min-h-[170vh] w-full bg-horizon-bg overflow-hidden py-28 sm:py-36"
    >
      {/* ============================================================
          LAYER 1: Distant City Skyline Silhouette (Speed: 0.18, Drift: -0.05)
          ============================================================ */}
      <ParallaxLayer
        speed={0.18}
        horizontalSpeed={-0.05}
        triggerRef={containerRef}
        className="absolute bottom-[20%] left-0 right-0 h-[480px] pointer-events-none opacity-30"
      >
        <svg
          viewBox="0 0 1440 480"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Distant megastructures & spires */}
          <path
            d="M0 480V320H60V240H110V340H170V210H220V350H280V270H330V360H400V180H460V340H520V260H570V370H650V150H710V330H780V230H840V360H910V190H970V340H1040V240H1100V350H1180V170H1240V330H1320V250H1380V360H1440V480H0Z"
            fill="url(#distant-skyline-grad)"
          />
          <defs>
            <linearGradient id="distant-skyline-grad" x1="720" y1="150" x2="720" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1f293d" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 2: Atmospheric Haze & Volumetric Cyan Glow (Speed: 0.30)
          ============================================================ */}
      <ParallaxLayer
        speed={0.3}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] bg-horizon-accent/5 blur-[120px] rounded-full" />
      </ParallaxLayer>

      {/* ============================================================
          LAYER 3: Midground Futuristic City Buildings & Towers (Speed: 0.55)
          ============================================================ */}
      <ParallaxLayer
        speed={0.55}
        horizontalSpeed={0.07}
        triggerRef={containerRef}
        className="absolute bottom-[10%] left-0 right-0 h-[520px] pointer-events-none opacity-70"
      >
        <svg
          viewBox="0 0 1440 520"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Angled and geometric modern towers */}
          <path
            d="M0 520V280L70 250V520M120 520V220L190 200V520M250 520V310L320 290V520M390 520V140L480 110V520M560 520V240L630 210V520M720 520V90L810 60V520M890 520V210L970 180V520M1050 520V160L1140 130V520M1210 520V270L1290 250V520M1360 520V190L1440 170V520"
            fill="url(#mid-skyline-grad)"
          />
          {/* Tower window grid luminescence */}
          <line x1="435" y1="120" x2="435" y2="400" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" strokeDasharray="3 8" />
          <line x1="765" y1="75" x2="765" y2="420" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.2" strokeDasharray="4 10" />
          <line x1="1095" y1="145" x2="1095" y2="380" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" strokeDasharray="3 8" />
          <defs>
            <linearGradient id="mid-skyline-grad" x1="720" y1="60" x2="720" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="#141a24" />
              <stop offset="0.6" stopColor="#0b0e14" />
              <stop offset="1" stopColor="#07080a" />
            </linearGradient>
          </defs>
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 4: Pulsing Aerial Lights & Communication Beacons (Speed: 0.75)
          ============================================================ */}
      <ParallaxLayer
        speed={0.75}
        triggerRef={containerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Beacon pulse nodes */}
          <g>
            <circle cx="27%" cy="48%" r="3" fill="#00e5ff" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="27%" cy="48%" r="2" fill="#ffffff" />
            <circle cx="53%" cy="42%" r="4" fill="#00e5ff" className="animate-ping" style={{ animationDuration: '2.4s' }} />
            <circle cx="53%" cy="42%" r="2.5" fill="#ffffff" />
            <circle cx="76%" cy="46%" r="3" fill="#00e5ff" className="animate-ping" style={{ animationDuration: '3.6s' }} />
            <circle cx="76%" cy="46%" r="2" fill="#ffffff" />
          </g>
        </svg>
      </ParallaxLayer>

      {/* ============================================================
          LAYER 5: Floating Skyways & Autonomous Vehicles (Speed: 1.10)
          ============================================================ */}
      <ParallaxLayer
        speed={1.1}
        horizontalSpeed={-0.18}
        triggerRef={containerRef}
        className="absolute top-[40%] left-0 right-0 h-[200px] pointer-events-none z-10"
      >
        <svg className="w-full h-full" viewBox="0 0 1440 200" fill="none">
          {/* Autonomous glider 1 */}
          <g transform="translate(340, 60)">
            <polygon points="0,6 24,0 48,6 24,12" fill="#00e5ff" opacity="0.9" />
            <line x1="0" y1="6" x2="-60" y2="6" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" strokeDasharray="6 4" />
          </g>
          {/* Autonomous glider 2 */}
          <g transform="translate(860, 110)">
            <polygon points="0,5 20,0 40,5 20,10" fill="#ffffff" opacity="0.8" />
            <line x1="0" y1="5" x2="-80" y2="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="8 4" />
          </g>
        </svg>
      </ParallaxLayer>

      {/* Main Content and Story Area */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-12 flex flex-col justify-between">
        <SectionHeader
          number="03"
          tag="CYBERNETIC ARCHITECTURE"
          title={"INTO\nTHE FUTURE."}
          subtitle="A vertical metropolis engineered on multi-speed axes. Every building, beacon, and skyway occupies a distinct depth field."
        />

        {/* Technical Data / Statistic Area */}
        <div className="mt-12 sm:mt-16 mb-24 max-w-4xl">
          <StatBlock stats={stats} />
        </div>
      </div>

      {/* ============================================================
          LAYER 6: Foreground Architecture & Pylons (Speed: 1.45)
          Moves rapidly past the screen for intense depth sensation
          ============================================================ */}
      <ParallaxLayer
        speed={1.45}
        horizontalSpeed={0.12}
        triggerRef={containerRef}
        className="absolute bottom-0 left-0 right-0 h-[320px] pointer-events-none z-20"
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Massive foreground bridge arches / structural trusses */}
          <path
            d="M0 320L160 160L320 320H220L160 240L100 320H0ZM1120 320L1280 140L1440 320H1340L1280 220L1220 320H1120Z"
            fill="#090c12"
          />
          <path
            d="M160 160L320 320M1280 140L1440 320"
            stroke="rgba(0, 229, 255, 0.4)"
            strokeWidth="1.5"
          />
        </svg>
      </ParallaxLayer>
    </section>
  );
};

export default Future;
