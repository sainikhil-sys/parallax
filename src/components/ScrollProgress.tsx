import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2px] bg-white/[0.04]">
      <div
        className="h-full bg-gradient-to-r from-horizon-accent/70 via-horizon-accent to-white transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,229,255,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
