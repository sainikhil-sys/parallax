import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SvgLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const followerRef = useRef<SVGCircleElement>(null);
  const ringsGroupRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const pathLength = pathRef.current?.getTotalLength() || 1000;

      // Set initial path state
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 1. Self-drawing path on scroll
      tl.to(
        pathRef.current,
        {
          strokeDashoffset: 0,
          ease: 'none',
        },
        0
      );

      // 2. Follower circle traverses along path progression via native SVG getPointAtLength
      const progressObj = { value: 0 };
      tl.to(
        progressObj,
        {
          value: 1,
          ease: 'none',
          onUpdate: () => {
            if (pathRef.current && followerRef.current) {
              const pt = pathRef.current.getPointAtLength(progressObj.value * pathLength);
              followerRef.current.setAttribute('cx', pt.x.toString());
              followerRef.current.setAttribute('cy', pt.y.toString());
            }
          },
        },
        0
      );

      // 3. Staggered concentric rings scaling and morphing
      const rings = ringsGroupRef.current?.querySelectorAll('circle');
      if (rings && rings.length > 0) {
        tl.fromTo(
          rings,
          { scale: 0.2, opacity: 0.1, transformOrigin: 'center' },
          {
            scale: 1,
            opacity: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0
        );
      }

      // 4. Parallax typography text drift
      if (textRef.current) {
        tl.to(textRef.current, { y: '35vh', ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="svg"
      ref={containerRef}
      className="relative min-h-[175vh] w-full bg-[#F5F5F0] text-[#111111] overflow-hidden select-none py-[12vh]"
    >
      {/* Top Header Tag */}
      <div className="px-6 sm:px-12 md:px-20 mb-8 flex justify-between items-center relative z-20">
        <span className="text-[11px] font-mono tracking-widest text-[#666666] uppercase">
          05 // VECTOR CRAFTSMANSHIP
        </span>
        <span className="text-[11px] font-mono tracking-widest text-[#111111] uppercase">
          PATH INTERPOLATION
        </span>
      </div>

      <div className="relative w-full h-[90vh] flex flex-col justify-between px-6 sm:px-12 md:px-20">
        {/* Floating Typography */}
        <div ref={textRef} className="relative z-20 max-w-xl will-change-transform">
          <h2 className="text-grotesk-heading text-[#111111] mb-6">
            VECTOR
            <br />
            <span className="text-[#FF6B4A]">
              PRECISION.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#666666] font-sans font-light max-w-md leading-relaxed">
            Continuous curve drawing and geometric morphing scrubbed synchronously through scroll displacement.
          </p>
        </div>

        {/* Large SVG Canvas for Drawing and Staggering */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full max-w-[1200px] overflow-visible"
            fill="none"
          >
            {/* Concentric Stagger Rings */}
            <g ref={ringsGroupRef} className="stroke-[#111111]/20 stroke-[1.5]">
              <circle cx="750" cy="300" r="40" />
              <circle cx="750" cy="300" r="90" className="stroke-[#B8FF3D] stroke-[2]" />
              <circle cx="750" cy="300" r="140" />
              <circle cx="750" cy="300" r="190" className="stroke-[#FF6B4A]/40" />
              <circle cx="750" cy="300" r="240" />
            </g>

            {/* Self-drawing S-Curve Path */}
            <path
              ref={pathRef}
              d="M 50 480 C 300 480, 250 120, 500 150 C 750 180, 650 450, 950 300"
              stroke="#111111"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Follower Dot in Acid Lime */}
            <circle
              ref={followerRef}
              cx="50"
              cy="480"
              r="10"
              className="fill-[#B8FF3D] stroke-[#111111] stroke-2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SvgLab;
