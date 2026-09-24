import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '../components/ui/Badge';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Aperture, Cpu } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const FragmentScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Layer Refs
  const bgStarsRef = useRef<HTMLDivElement>(null);
  const bgNebulaRef = useRef<HTMLDivElement>(null);
  const floatPlaneRef = useRef<HTMLDivElement>(null);
  const floatRingRef = useRef<HTMLDivElement>(null);
  const floatCoordsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const depthCollisionRef = useRef<HTMLDivElement>(null);
  const fgGlassArcRef = useRef<HTMLDivElement>(null);
  const fgBeamRef = useRef<HTMLDivElement>(null);
  const fgTypoShardRef = useRef<HTMLDivElement>(null);

  const [activeChip, setActiveChip] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !pinTargetRef.current) return;

    const ctx = gsap.context(() => {
      // 400VH PINNED PARALLAX TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: pinTargetRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. BACKGROUND: Slowest deliberate movement (-12vh)
      tl.to(
        bgStarsRef.current,
        {
          yPercent: -12,
          ease: 'none',
        },
        0
      );

      tl.to(
        bgNebulaRef.current,
        {
          scale: 1.25,
          xPercent: -8,
          ease: 'none',
        },
        0
      );

      // 2. FLOATING GEOMETRIC PLANE: Moves diagonally and rotates (-65vh, -25vw)
      tl.to(
        floatPlaneRef.current,
        {
          yPercent: -65,
          xPercent: -25,
          rotate: 60,
          scale: 1.15,
          ease: 'none',
        },
        0
      );

      // 3. FLOATING SPATIAL RING: Tilts in 3D and moves vertically (-90vh)
      tl.to(
        floatRingRef.current,
        {
          yPercent: -90,
          rotateX: 65,
          rotateZ: -45,
          ease: 'none',
        },
        0
      );

      // 4. FLOATING TEXT FRAGMENTS & COORDINATES: Lateral drift
      tl.to(
        floatCoordsRef.current,
        {
          xPercent: 35,
          yPercent: -40,
          ease: 'none',
        },
        0
      );

      // 5. DISCOVERED TACTILE INTERFACE CHIPS (Only 2, spaced asymmetrically)
      // Chip 1 (Midground depth 0.60x)
      tl.to(
        card1Ref.current,
        {
          yPercent: -75,
          xPercent: 12,
          ease: 'none',
        },
        0
      );

      // Chip 2 (Foreground depth 1.20x, moves faster!)
      tl.to(
        card2Ref.current,
        {
          yPercent: -130,
          xPercent: -18,
          scale: 1.1,
          ease: 'none',
        },
        0
      );

      // 6. CHOREOGRAPHED DEPTH COLLISION MOMENT (Centered around 45% - 58% of timeline)
      // Background ring, central aperture, typography slice, particles, and foreground frame all cross
      tl.fromTo(
        depthCollisionRef.current,
        {
          scale: 0.35,
          opacity: 0,
          rotateZ: -60,
        },
        {
          scale: 1.0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.3
      );

      tl.to(
        depthCollisionRef.current,
        {
          scale: 2.6,
          opacity: 0,
          rotateZ: 60,
          duration: 0.35,
          ease: 'power2.in',
        },
        0.65
      );

      // 7. FOREGROUND CAMERA CROSSING OBJECTS (Passing very close to lens at 150vh - 220vh speed!)
      // Giant glass arc passes from bottom to top right
      tl.fromTo(
        fgGlassArcRef.current,
        {
          yPercent: 130,
          xPercent: -35,
          rotate: -25,
          scale: 0.8,
        },
        {
          yPercent: -160,
          xPercent: 45,
          rotate: 55,
          scale: 2.4,
          ease: 'none',
        },
        0
      );

      // Giant architectural wireframe beam crossing horizontally & vertically
      tl.fromTo(
        fgBeamRef.current,
        {
          yPercent: 170,
          xPercent: 60,
          rotate: 20,
        },
        {
          yPercent: -180,
          xPercent: -45,
          rotate: -30,
          ease: 'none',
        },
        0.1
      );

      // Foreground typographic fragment racing past camera
      tl.fromTo(
        fgTypoShardRef.current,
        {
          yPercent: 190,
          scale: 0.65,
          opacity: 0,
        },
        {
          yPercent: -190,
          scale: 2.2,
          opacity: 0.85,
          ease: 'none',
        },
        0.15
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      id="fragments"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#050505] select-none"
    >
      {/* ============================================================
          PINNED 100VW x 100VH STAGE
          ============================================================ */}
      <div
        ref={pinTargetRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Layer 1: Background Stars (Slowest) */}
        <div ref={bgStarsRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <g fill="#00F0FF">
              <circle cx="12%" cy="18%" r="1" />
              <circle cx="28%" cy="38%" r="1.5" />
              <circle cx="62%" cy="14%" r="1.2" />
              <circle cx="84%" cy="28%" r="2" />
              <circle cx="38%" cy="82%" r="1.5" />
              <circle cx="92%" cy="70%" r="1.2" />
            </g>
          </svg>
        </div>

        {/* Layer 2: Atmospheric Cyan Nebula Glow */}
        <div ref={bgNebulaRef} className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[75vw] h-[75vw] rounded-full bg-gradient-to-tr from-[#00F0FF]/10 via-cyan-900/5 to-transparent blur-[160px]" />
        </div>

        {/* Header Metadata */}
        <div className="relative z-30 pt-24 sm:pt-28 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 font-mono text-xs text-[#858585] tracking-[0.25em] uppercase">
            <span className="text-[#00F0FF] font-semibold">02</span>
            <span className="text-white/20">/</span>
            <span>05</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mx-1" />
            <span className="text-[#F5F5F0]/80">THE FRAGMENT FIELD</span>
          </div>

          <div className="hidden sm:block font-mono text-[10px] tracking-widest text-[#505050]">
            SPATIAL ENVIRONMENT // 400VH PERSPECTIVE
          </div>
        </div>

        {/* ============================================================
            FLOATING GEOMETRIC OBJECTS (NOT cards!)
            ============================================================ */}
        {/* Floating Wireframe Polygonal Plane (Drifts diagonally) */}
        <div
          ref={floatPlaneRef}
          className="absolute top-[28%] left-[10%] w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] pointer-events-none z-15"
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full opacity-35">
            <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="100,35 165,75 165,125 100,165 35,125 35,75" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="3" fill="#00F0FF" />
          </svg>
        </div>

        {/* Floating Elliptical Spatial Ring (Tilts in 3D perspective) */}
        <div
          ref={floatRingRef}
          className="absolute top-[42%] right-[12%] w-[220px] h-[160px] sm:w-[320px] sm:h-[220px] rounded-[50%] border border-dashed border-white/20 pointer-events-none z-15 flex items-center justify-center transform-style-3d"
        >
          <div className="w-[85%] h-[85%] rounded-[50%] border border-[#00F0FF]/30" />
          <div className="absolute top-0 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
        </div>

        {/* Floating Coordinates & Telemetry Shards (Isolated text, NOT cards) */}
        <div
          ref={floatCoordsRef}
          className="absolute top-[22%] right-[25%] pointer-events-none z-20 font-mono text-[10px] text-[#858585] space-y-1"
        >
          <div className="text-[#00F0FF] tracking-widest">// SEC.02_APERTURE</div>
          <div className="text-white/60">VECTOR: 18.922° N, 72.834° E</div>
          <div className="text-[#505050]">DEPTH GRADIENT: 0.65x</div>
        </div>

        {/* ============================================================
            DEPTH COLLISION MOMENT (Choreographed Alignment)
            ============================================================ */}
        <div
          ref={depthCollisionRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-25 opacity-0"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full border-2 border-[#00F0FF] shadow-[0_0_90px_rgba(0,240,255,0.6)] flex flex-col items-center justify-center p-8 bg-[#050505]/95 backdrop-blur-xl">
            <div className="w-full h-full rounded-full border border-dashed border-white/40 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-xs text-[#00F0FF] tracking-[0.3em] font-bold block mb-1">
                DEPTH COLLISION
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-white">
                FOCAL ALIGNMENT
              </span>
              <span className="font-mono text-[9px] text-[#858585] tracking-widest mt-2 uppercase">
                STRATA OVERLAP CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================
            DISCOVERED TACTILE INTERFACE CHIPS (Only 2, asymmetric, tactile)
            ============================================================ */}
        {/* Chip 1: Left Midground (Depth: 0.60x) */}
        <div
          ref={card1Ref}
          className="absolute top-[48%] left-[8%] sm:left-[15%] z-20 pointer-events-auto"
        >
          <div
            onMouseEnter={() => setActiveChip('c1')}
            onMouseLeave={() => setActiveChip(null)}
            data-cursor="INSPECT"
            className={`p-5 sm:p-6 rounded-2xl bg-[#0c0c0c]/85 border transition-all duration-300 backdrop-blur-xl cursor-pointer max-w-[260px] sm:max-w-[300px] ${
              activeChip === 'c1'
                ? 'border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)] scale-105'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#00F0FF]">
                <Cpu size={16} />
              </div>
              <Badge variant={activeChip === 'c1' ? 'accent' : 'outline'}>RESONATING</Badge>
            </div>
            <span className="font-mono text-[9px] text-[#858585] tracking-widest uppercase block mb-0.5">
              ARTIFACT / 01
            </span>
            <h3 className="font-display font-bold text-sm text-white mb-2">CHRONO-CORE</h3>
            <p className="font-mono text-[10px] text-[#858585] leading-relaxed">
              Temporal matrix fragment retaining spatial orientation.
            </p>
          </div>
        </div>

        {/* Chip 2: Right Foreground (Depth: 1.20x, moves faster!) */}
        <div
          ref={card2Ref}
          className="absolute top-[62%] right-[8%] sm:right-[16%] z-25 pointer-events-auto"
        >
          <div
            onMouseEnter={() => setActiveChip('c2')}
            onMouseLeave={() => setActiveChip(null)}
            data-cursor="INSPECT"
            className={`p-5 sm:p-6 rounded-2xl bg-[#0c0c0c]/90 border transition-all duration-300 backdrop-blur-xl cursor-pointer max-w-[260px] sm:max-w-[300px] ${
              activeChip === 'c2'
                ? 'border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)] scale-105'
                : 'border-white/[0.1] hover:border-white/25'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#00F0FF]">
                <Aperture size={16} />
              </div>
              <Badge variant={activeChip === 'c2' ? 'accent' : 'outline'}>ACTIVE</Badge>
            </div>
            <span className="font-mono text-[9px] text-[#858585] tracking-widest uppercase block mb-0.5">
              ARTIFACT / 02
            </span>
            <h3 className="font-display font-bold text-sm text-white mb-2">MONOLITH APERTURE</h3>
            <p className="font-mono text-[10px] text-[#858585] leading-relaxed">
              Foreground optical lens moving with accelerated parallax.
            </p>
          </div>
        </div>

        {/* Bottom Status Telemetry */}
        <div className="relative z-30 pb-8 px-6 sm:px-12 flex justify-between items-center font-mono text-[10px] text-[#858585] border-t border-white/[0.04] pt-4">
          <span>CONTINUOUS 400VH SPATIAL STAGE</span>
          <span className="text-[#00F0FF]">ZERO DASHBOARD // PURE SPACE</span>
        </div>

        {/* ============================================================
            FOREGROUND OBJECTS CROSSING THE CAMERA LENS
            ============================================================ */}
        {/* Giant Glass Arc passing close to viewer */}
        <div
          ref={fgGlassArcRef}
          className="absolute -bottom-24 -left-24 w-[460px] sm:w-[680px] h-[460px] sm:h-[680px] rounded-full border-2 border-white/[0.16] bg-white/[0.01] backdrop-blur-[2px] shadow-[0_0_60px_rgba(255,255,255,0.04)] pointer-events-none z-40"
        />

        {/* Giant Crossing Architectural Truss Beam */}
        <div
          ref={fgBeamRef}
          className="absolute -bottom-40 right-8 w-2 h-[150vh] bg-gradient-to-b from-transparent via-[#00F0FF]/40 to-transparent pointer-events-none z-40 hidden md:block"
        />

        {/* Foreground Shard */}
        <div
          ref={fgTypoShardRef}
          className="absolute bottom-12 right-[18%] pointer-events-none z-40 font-mono text-xs sm:text-sm text-[#00F0FF] tracking-[0.4em] uppercase border border-[#00F0FF]/50 px-4 py-2 rounded-full bg-[#050505]/90 backdrop-blur-md shadow-2xl hidden sm:block"
        >
          // LENS_APERTURE_CROSSING
        </div>
      </div>
    </div>
  );
};

export default FragmentScene;
