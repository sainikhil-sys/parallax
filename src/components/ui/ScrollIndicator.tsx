import React, { useEffect, useState } from 'react';

export const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-none select-none">
      <span className="font-mono text-[9px] tracking-widest text-[#858585] [writing-mode:vertical-lr] uppercase">
        SCROLL
      </span>

      {/* Vertical Track Line */}
      <div className="relative w-[1.5px] h-24 bg-white/[0.1] rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div
          className="absolute top-0 left-0 right-0 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Dynamic Tracker Dot */}
      <div
        className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] transition-transform duration-75"
        style={{
          transform: `scale(${1 + scrollProgress * 0.5})`,
        }}
      />
    </div>
  );
};

export default ScrollIndicator;
