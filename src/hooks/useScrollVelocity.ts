import { useState, useEffect, useRef } from 'react';

export interface ScrollVelocityData {
  velocity: number; // smoothed velocity 0 to 1
  rawVelocity: number;
  direction: 1 | -1 | 0;
  isFast: boolean;
}

export function useScrollVelocity(): ScrollVelocityData {
  const [data, setData] = useState<ScrollVelocityData>({
    velocity: 0,
    rawVelocity: 0,
    direction: 0,
    isFast: false,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const smoothedVelocity = useRef(0);

  useEffect(() => {
    lastTime.current = Date.now();
    let animId: number;
    let targetVelocity = 0;
    let currentDir: 1 | -1 | 0 = 0;

    const onScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;
      const deltaTime = Math.max(1, now - lastTime.current);

      const pixelsPerMs = Math.abs(deltaY) / deltaTime;
      targetVelocity = Math.min(pixelsPerMs * 0.4, 1.5);
      currentDir = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;

      lastScrollY.current = currentY;
      lastTime.current = now;
    };

    const updateLoop = () => {
      // Lerp smooth velocity down when scrolling stops
      smoothedVelocity.current += (targetVelocity - smoothedVelocity.current) * 0.1;
      targetVelocity *= 0.92; // natural decay

      setData({
        velocity: Math.min(Math.max(smoothedVelocity.current, 0), 1),
        rawVelocity: targetVelocity,
        direction: currentDir,
        isFast: smoothedVelocity.current > 0.4,
      });

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return data;
}
