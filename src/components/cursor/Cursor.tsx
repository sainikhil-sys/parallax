import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isTouchDevice) return;

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
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision pointer dot - inverted blend mode */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#11110F] pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1200, damping: 50, mass: 0.08 }}
      />

      {/* Subtle editorial follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center mix-blend-difference"
        animate={{
          x: mousePosition.x - (cursorText ? 36 : isHovered ? 24 : 14),
          y: mousePosition.y - (cursorText ? 36 : isHovered ? 24 : 14),
          width: cursorText ? 72 : isHovered ? 48 : 28,
          height: cursorText ? 72 : isHovered ? 48 : 28,
          borderColor: isHovered ? '#F4F1EA' : 'rgba(244, 241, 234, 0.4)',
          borderWidth: 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.15 }}
      >
        {cursorText && (
          <span className="font-sans text-[8px] uppercase tracking-widest text-[#F4F1EA] font-medium select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default Cursor;
