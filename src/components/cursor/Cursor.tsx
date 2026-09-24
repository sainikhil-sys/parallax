import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, [data-cursor], [role="button"], input');
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
      {/* Center pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00F0FF] pointer-events-none z-[9999] shadow-[0_0_8px_#00F0FF]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1200, damping: 50, mass: 0.08 }}
      />

      {/* Outer interactive follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/20 pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[0.5px]"
        animate={{
          x: mousePosition.x - (cursorText ? 42 : isHovered ? 28 : 16),
          y: mousePosition.y - (cursorText ? 42 : isHovered ? 28 : 16),
          width: cursorText ? 84 : isHovered ? 56 : 32,
          height: cursorText ? 84 : isHovered ? 56 : 32,
          backgroundColor: cursorText ? 'rgba(0, 240, 255, 0.12)' : isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          borderColor: cursorText ? 'rgba(0, 240, 255, 0.8)' : isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.15 }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#00F0FF] font-semibold select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default Cursor;
