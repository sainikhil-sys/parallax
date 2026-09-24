import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  magneticPull?: number; // 0.15 to 0.4
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  href,
  magneticPull = 0.28,
  variant = 'primary',
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * magneticPull;
    const deltaY = (clientY - centerY) * magneticPull;

    setPosition({ x: deltaX, y: deltaY });
    setTextOffset({ x: deltaX * 0.45, y: deltaY * 0.45 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setTextOffset({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-horizon-text text-horizon-bg hover:bg-horizon-accent hover:text-horizon-bg shadow-[0_0_25px_rgba(0,229,255,0.15)]';
      case 'outline':
        return 'border border-horizon-border text-horizon-text hover:border-horizon-accent hover:text-horizon-accent bg-horizon-card/40 backdrop-blur-sm';
      case 'secondary':
        return 'bg-horizon-surface text-horizon-text hover:bg-horizon-elevated border border-horizon-border';
      case 'ghost':
        return 'text-horizon-text-muted hover:text-horizon-text hover:bg-white/[0.04]';
      default:
        return '';
    }
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      className={cn('inline-block cursor-pointer select-none', className)}
    >
      <div
        className={cn(
          'relative px-7 py-3.5 rounded-full font-mono text-xs tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2.5 overflow-hidden group',
          getVariantStyles()
        )}
      >
        {/* Subtle hover background sweep */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

        <motion.span
          animate={{ x: textOffset.x, y: textOffset.y }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.15 }}
          className="relative z-10 flex items-center gap-2"
        >
          {children}
        </motion.span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className="inline-block" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent p-0 border-0 outline-none focus-visible:ring-2 focus-visible:ring-horizon-accent focus-visible:ring-offset-2 focus-visible:ring-offset-horizon-bg rounded-full"
    >
      {content}
    </button>
  );
};

export default MagneticButton;
