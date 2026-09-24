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
    <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center pointer-events-none select-none opacity-40 hover:opacity-100 transition-opacity">
      {/* 1px Minimal Hairline Track */}
      <div className="relative w-[1px] h-20 bg-[#DDD8CB] overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bg-[#A65D45]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
