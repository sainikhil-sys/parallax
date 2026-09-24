import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StaggerLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tiles = gridContainerRef.current?.querySelectorAll('.lab-tile');

      // Stagger timeline scrubbing with scroll
      if (tiles && tiles.length > 0) {
        gsap.fromTo(
          tiles,
          {
            scale: 0.3,
            rotate: 0,
            opacity: 0.2,
            y: 50,
          },
          {
            scale: 1,
            rotate: (i) => (i % 2 === 0 ? 180 : -180),
            opacity: 0.9,
            y: (i) => (i % 3 === 0 ? -40 : 40),
            stagger: {
              grid: [6, 12],
              from: 'center',
              amount: 1.2,
            },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          }
        );
      }

      // Parallax typography movement
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: '45vh',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate 72 clean graphic design elements (grid of 6 x 12)
  const elements = Array.from({ length: 72 }, (_, i) => {
    const types = ['cross', 'square', 'circle', 'dash'];
    const type = types[i % types.length];
    const isLime = i % 7 === 0;
    const isCoral = i % 11 === 0;

    return { id: i, type, isLime, isCoral };
  });

  return (
    <section
      id="stagger"
      ref={containerRef}
      className="relative min-h-[180vh] w-full bg-[#111111] text-[#F5F5F0] overflow-hidden select-none py-[14vh]"
    >
      {/* Background Graphic Grid Header */}
      <div className="px-6 sm:px-12 md:px-20 mb-8 flex justify-between items-center relative z-20">
        <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase">
          03 // GRAPHIC STAGGER MATRIX
        </span>
        <span className="text-[11px] font-mono tracking-widest text-[#B8FF3D] uppercase">
          [72 NODES]
        </span>
      </div>

      {/* Floating Centered Typography */}
      <div
        ref={textRef}
        className="relative z-30 pt-[10vh] px-6 sm:px-12 md:px-20 max-w-4xl will-change-transform"
      >
        <h2 className="text-grotesk-heading text-[#F5F5F0] mb-6">
          SCROLL
          <br />
          CHANGES
          <br />
          <span className="text-[#B8FF3D]">
            EVERYTHING.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#888888] font-sans font-light max-w-md leading-relaxed">
          Hundreds of geometric graphic nodes synchronously choreograph their scale, rotation, and translation in response to physical scroll displacement.
        </p>
      </div>

      {/* Crisp Graphic Element Matrix */}
      <div
        ref={gridContainerRef}
        className="absolute inset-0 top-[20vh] grid grid-cols-6 sm:grid-cols-12 gap-6 sm:gap-10 p-8 sm:p-16 pointer-events-none z-10 opacity-75 place-items-center"
      >
        {elements.map((item) => (
          <div
            key={item.id}
            className="lab-tile w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center will-change-transform"
          >
            {item.type === 'cross' && (
              <div
                className={`relative w-4 h-4 ${
                  item.isLime ? 'text-[#B8FF3D]' : item.isCoral ? 'text-[#FF6B4A]' : 'text-white'
                }`}
              >
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current -translate-y-1/2" />
                <div className="absolute top-0 left-1/2 h-full w-[1.5px] bg-current -translate-x-1/2" />
              </div>
            )}
            {item.type === 'square' && (
              <div
                className={`w-3.5 h-3.5 border ${
                  item.isLime
                    ? 'border-[#B8FF3D] bg-[#B8FF3D]/20'
                    : item.isCoral
                    ? 'border-[#FF6B4A]'
                    : 'border-white/40'
                }`}
              />
            )}
            {item.type === 'circle' && (
              <div
                className={`w-3.5 h-3.5 rounded-full ${
                  item.isLime
                    ? 'bg-[#B8FF3D]'
                    : item.isCoral
                    ? 'bg-[#FF6B4A]'
                    : 'border border-white/40'
                }`}
              />
            )}
            {item.type === 'dash' && (
              <div
                className={`w-5 h-[2px] ${
                  item.isLime ? 'bg-[#B8FF3D]' : item.isCoral ? 'bg-[#FF6B4A]' : 'bg-white/40'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaggerLab;
