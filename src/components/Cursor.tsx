import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device has coarse pointer (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target has cursor attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, [data-cursor], input, [role="button"]');
        if (interactiveEl) {
          setIsHovered(true);
          const customText = interactiveEl.getAttribute('data-cursor');
          setCursorText(customText || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-horizon-accent pointer-events-none z-[9999] shadow-[0_0_8px_rgba(0,229,255,0.8)]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Outer interactive follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-horizon-accent/40 pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovered ? 36 : 18),
          y: mousePosition.y - (isHovered ? 36 : 18),
          width: isHovered ? 72 : 36,
          height: isHovered ? 72 : 36,
          backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 229, 255, 0.02)',
          borderColor: isHovered ? 'rgba(0, 229, 255, 0.7)' : 'rgba(255, 255, 255, 0.18)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.2 }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-horizon-accent font-semibold px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default Cursor;
