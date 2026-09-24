import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ArrowDown } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

interface PortalSceneProps {
  onExplore?: () => void;
}

export const PortalScene: React.FC<PortalSceneProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portal3DStageRef = useRef<HTMLDivElement>(null);
  const portalCoreRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const obliqueRingRef = useRef<HTMLDivElement>(null);
  const gyroRingRef = useRef<HTMLDivElement>(null);
  const textBetweenRef = useRef<HTMLDivElement>(null);
  const textWorldsRef = useRef<HTMLDivElement>(null);
  const fgGlassArcRef = useRef<HTMLDivElement>(null);
  const fgParticlesRef = useRef<HTMLDivElement>(null);
  const bgParticlesRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const singularityFlashRef = useRef<HTMLDivElement>(null);

  const mouse = useMousePosition();
  const velocity = useScrollVelocity();
  const prefersReducedMotion = useReducedMotion();

  // Multi-tier mouse perspective
  const mouseBgX = prefersReducedMotion ? 0 : mouse.smoothX * 6;
  const mouseBgY = prefersReducedMotion ? 0 : mouse.smoothY * 6;
  const mousePortalX = prefersReducedMotion ? 0 : mouse.smoothX * 22;
  const mousePortalY = prefersReducedMotion ? 0 : mouse.smoothY * 22;
  const mouseTiltX = prefersReducedMotion ? 0 : mouse.smoothY * -16;
  const mouseTiltY = prefersReducedMotion ? 0 : mouse.smoothX * 18;
  const mouseFgX = prefersReducedMotion ? 0 : mouse.smoothX * 45;
  const mouseFgY = prefersReducedMotion ? 0 : mouse.smoothY * 45;

  // Velocity-induced torque and breathing
  const velScale = 1 + velocity.velocity * 0.12;
  const velRotate = velocity.velocity * (velocity.direction === 1 ? 10 : -10);
  const velBlur = velocity.velocity * 3.5;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // MASTER CAMERA ZOOM TIMELINE
      // Pinned for 260vh of scroll travel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 0% -> 35%: BETWEEN WORLDS separates into z-depth
      // BETWEEN pushes backwards into depth and slides left behind portal
      tl.to(
        textBetweenRef.current,
        {
          x: '-25vw',
          y: '-8vh',
          scale: 0.75,
          opacity: 0.3,
          ease: 'power1.out',
        },
        0
      );

      // WORLDS expands toward camera foreground and slides right
      tl.to(
        textWorldsRef.current,
        {
          x: '30vw',
          y: '14vh',
          scale: 2.2,
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );

      // Outer uneven ring expands in 3D perspective and flies past camera
      tl.to(
        outerRingRef.current,
        {
          scale: 5.5,
          rotateX: 65,
          rotateZ: 90,
          opacity: 0,
          ease: 'power2.in',
        },
        0.1
      );

      // Oblique ring expands and tilts in opposite direction
      tl.to(
        obliqueRingRef.current,
        {
          scale: 7.0,
          rotateY: -70,
          rotateZ: -120,
          opacity: 0,
          ease: 'power2.in',
        },
        0.15
      );

      // Gyro ring flies past lens
      tl.to(
        gyroRingRef.current,
        {
          scale: 9.0,
          rotateX: -45,
          opacity: 0,
          ease: 'power2.in',
        },
        0.2
      );

      // Foreground glass arc sweeps across the camera lens at high velocity
      tl.to(
        fgGlassArcRef.current,
        {
          yPercent: -180,
          xPercent: 40,
          scale: 3.2,
          rotate: 45,
          opacity: 0,
          ease: 'power1.in',
        },
        0.1
      );

      // Foreground particles accelerate outwards
      tl.to(
        fgParticlesRef.current,
        {
          scale: 6,
          opacity: 0,
          ease: 'power1.in',
        },
        0.25
      );

      // Background particles drift subtly
      tl.to(
        bgParticlesRef.current,
        {
          scale: 1.4,
          opacity: 0.2,
          ease: 'none',
        },
        0.3
      );

      // HUD elements fade out as camera accelerates
      tl.to(
        hudRef.current,
        {
          opacity: 0,
          y: -30,
        },
        0.15
      );

      // 35% -> 80%: THE PORTAL EXPANDS DRAMATICALLY — CAMERA FLIES THROUGH
      tl.to(
        portalCoreRef.current,
        {
          scale: 26,
          rotateZ: 75,
          ease: 'power3.inOut',
        },
        0.25
      );

      // 70% -> 95%: Singularity flash / horizon bloom transition into the next scene
      tl.to(
        singularityFlashRef.current,
        {
          opacity: 0.95,
          ease: 'power2.in',
        },
        0.65
      );

      tl.to(
        singularityFlashRef.current,
        {
          opacity: 0,
          ease: 'power2.out',
        },
        0.88
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleScrollDown = () => {
    if (onExplore) {
      onExplore();
    } else {
      const target = document.getElementById('fragments');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portal"
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* ============================================================
          LAYER 01: Deep Space Background Grid (Depth: 0.05)
          ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseBgX}px, ${mouseBgY}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.07)_0%,transparent_70%)]" />
      </div>

      {/* ============================================================
          LAYER 02: Atmospheric Nebula Glow (Depth: 0.12)
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[85vw] max-w-[950px] h-[85vw] max-h-[950px] rounded-full bg-gradient-to-b from-[#00F0FF]/15 via-cyan-950/10 to-transparent blur-[160px]" />
      </div>

      {/* ============================================================
          LAYER 03: Deep Space Distant Particles (Depth: 0.20, Blurred)
          ============================================================ */}
      <div ref={bgParticlesRef} className="absolute inset-0 pointer-events-none depth-blur-subtle">
        <svg className="w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
          <g fill="#00F0FF">
            <circle cx="12%" cy="22%" r="1" opacity="0.5" />
            <circle cx="32%" cy="16%" r="1.5" opacity="0.7" />
            <circle cx="65%" cy="24%" r="1.2" opacity="0.6" />
            <circle cx="88%" cy="28%" r="1.8" opacity="0.5" />
            <circle cx="18%" cy="78%" r="1.2" opacity="0.4" />
            <circle cx="82%" cy="72%" r="1.5" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* ============================================================
          PHYSICALLY DIMENSIONAL 3D GYROSCOPIC PORTAL
          Uneven ring sizes, 3D tilt, counter-rotation, depth perspective
          ============================================================ */}
      <div
        ref={portal3DStageRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-15 perspective-1200 transform-style-3d"
      >
        {/* Tilting Spatial Container */}
        <div
          className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${mousePortalX}px, ${mousePortalY}px, 0) rotateX(${22 + mouseTiltX}deg) rotateY(${-16 + mouseTiltY}deg) rotateZ(6deg)`,
          }}
        >
          {/* Ring 1: Large Uneven Outer Elliptical Ring (640x540px) */}
          <div
            ref={outerRingRef}
            className="absolute w-[360px] h-[300px] sm:w-[640px] sm:h-[540px] rounded-[50%] border border-white/[0.12] flex items-center justify-center will-change-transform transform-style-3d"
          >
            <div className="absolute inset-0 rounded-[50%] border border-dashed border-[#00F0FF]/30 animate-spin" style={{ animationDuration: '95s' }} />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" />
          </div>

          {/* Ring 2: Oblique Counter-Rotating Tilted Ring (480x400px) */}
          <div
            ref={obliqueRingRef}
            className="absolute w-[290px] h-[240px] sm:w-[480px] sm:h-[400px] rounded-[50%] border border-[#00F0FF]/35 flex items-center justify-center will-change-transform transform-style-3d"
            style={{
              transform: 'rotateX(-28deg) rotateY(35deg)',
            }}
          >
            <div className="w-[92%] h-[92%] rounded-[50%] border border-dashed border-white/25 animate-spin" style={{ animationDuration: '65s', animationDirection: 'reverse' }} />
          </div>

          {/* Ring 3: Gyroscope Precision Reticle (330x330px) */}
          <div
            ref={gyroRingRef}
            className="absolute w-[210px] h-[210px] sm:w-[330px] sm:h-[330px] rounded-full border border-white/[0.18] flex items-center justify-center will-change-transform transform-style-3d"
            style={{
              transform: 'rotateX(40deg) rotateZ(-20deg)',
            }}
          >
            <div className="w-[85%] h-[85%] rounded-full border border-[#00F0FF]/30" />
          </div>

          {/* Central Singularity Aperture & Horizon Chamber */}
          <div
            ref={portalCoreRef}
            className="relative w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] rounded-full border-2 border-[#00F0FF] shadow-[0_0_90px_rgba(0,240,255,0.45)] flex items-center justify-center bg-[#050505] will-change-transform transform-style-3d transition-all duration-100 ease-out"
            style={{
              transform: `scale(${velScale}) rotate(${velRotate}deg)`,
              filter: `blur(${velBlur}px)`,
            }}
          >
            {/* Deep Event Horizon Core */}
            <div className="w-[78%] h-[78%] rounded-full bg-gradient-to-tr from-[#050505] via-[#0d0d0d] to-[#00F0FF]/25 border border-white/25 flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,240,255,0.6)]">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#050505] border border-[#00F0FF] shadow-[0_0_25px_#00F0FF] flex items-center justify-center">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-[#00F0FF] font-bold animate-pulse">
                  APERTURE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          FOREGROUND PARTICLES (Moving faster than camera)
          ============================================================ */}
      <div
        ref={fgParticlesRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          transform: `translate3d(${mouseFgX * 0.8}px, ${mouseFgY * 0.8}px, 0)`,
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g fill="#00F0FF">
            <circle cx="25%" cy="38%" r="2.5" opacity="0.8" />
            <circle cx="78%" cy="32%" r="3" opacity="0.85" />
            <circle cx="84%" cy="62%" r="2" opacity="0.75" />
            <circle cx="16%" cy="68%" r="2" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* ============================================================
          HERO TYPOGRAPHY: "BETWEEN WORLDS" (Separates into Depth)
          Breathing room with refined clamp scale
          ============================================================ */}
      <div className="relative z-25 max-w-6xl mx-auto w-full my-auto px-6 sm:px-12 flex flex-col justify-center pointer-events-auto">
        <div className="flex flex-col items-start select-none">
          {/* Section Marker */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#858585] tracking-[0.3em] uppercase mb-4 sm:mb-6">
            <span className="text-[#00F0FF] font-semibold">01</span>
            <span className="text-white/20">/</span>
            <span>05</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mx-1 animate-ping" />
            <span className="text-[#F5F5F0]/80">THE PORTAL</span>
          </div>

          {/* Word 1: BETWEEN (Separates backwards/left) */}
          <div ref={textBetweenRef} className="will-change-transform">
            <span className="font-display font-black text-huge tracking-tight uppercase leading-[0.9] text-white block">
              BETWEEN
            </span>
          </div>

          {/* Word 2: WORLDS (Pulls forward/right) */}
          <div ref={textWorldsRef} className="will-change-transform pl-6 sm:pl-20">
            <span className="font-display font-black text-huge tracking-tight uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F0] to-[#00F0FF] block">
              WORLDS
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          HUD / INTERFACE DETAILS (Fades as Camera Plunges)
          ============================================================ */}
      <div
        ref={hudRef}
        className="relative z-30 px-6 sm:px-12 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pointer-events-auto border-t border-white/[0.06] pt-4"
      >
        <div className="flex items-center gap-4 text-xs font-mono text-[#858585]">
          <span className="text-[#00F0FF] font-bold">SPATIAL PARALLAX</span>
          <span>•</span>
          <span className="hidden sm:inline">10 DECOUPLED STRATA</span>
        </div>

        {/* Scroll CTA */}
        <button
          onClick={handleScrollDown}
          className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#00F0FF] text-[#050505] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#38F4FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all group"
        >
          <span>TRAVEL THROUGH PORTAL</span>
          <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* ============================================================
          FOREGROUND GLASS ARC (Very close to virtual camera lens)
          ============================================================ */}
      <div
        ref={fgGlassArcRef}
        className="absolute -bottom-16 -left-16 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full border-2 border-white/[0.14] bg-white/[0.01] backdrop-blur-[1.5px] pointer-events-none z-35"
        style={{
          transform: `translate3d(${mouseFgX}px, ${mouseFgY}px, 0)`,
        }}
      />

      {/* Singularity Transition Flash */}
      <div
        ref={singularityFlashRef}
        className="absolute inset-0 bg-[#00F0FF] pointer-events-none z-50 opacity-0"
      />
    </section>
  );
};

export default PortalScene;
