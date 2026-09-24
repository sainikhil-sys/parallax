import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1 (left to right)
  normalizedY: number; // -1 to 1 (top to bottom)
  smoothX: number;
  smoothY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    normalizedX: 0,
    normalizedY: 0,
    smoothX: 0,
    smoothY: 0,
  });

  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    normX: 0,
    normY: 0,
    smoothX: 0,
    smoothY: 0,
  });

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.normX = (e.clientX - halfW) / halfW;
      mouseRef.current.normY = (e.clientY - halfH) / halfH;
    };

    const updateSmooth = () => {
      // Lerp smooth position
      const factor = 0.08;
      mouseRef.current.smoothX += (mouseRef.current.normX - mouseRef.current.smoothX) * factor;
      mouseRef.current.smoothY += (mouseRef.current.normY - mouseRef.current.smoothY) * factor;

      setPosition({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        normalizedX: mouseRef.current.normX,
        normalizedY: mouseRef.current.normY,
        smoothX: mouseRef.current.smoothX,
        smoothY: mouseRef.current.smoothY,
      });

      animId = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return position;
}
