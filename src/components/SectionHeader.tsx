import React from 'react';
import { cn } from '../lib/utils';
import RevealText from './RevealText';

interface SectionHeaderProps {
  number: string;
  total?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  total = '05',
  tag,
  title,
  subtitle,
  align = 'left',
  className,
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={cn('flex flex-col mb-12 sm:mb-16', alignClass, className)}>
      {/* Micro-label / numbering */}
      <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-horizon-text-muted mb-4 tracking-widest uppercase">
        <span className="text-horizon-accent font-semibold">{number}</span>
        <span className="text-white/20">/</span>
        <span className="text-horizon-text-dim">{total}</span>
        {tag && (
          <>
            <span className="w-1 h-1 rounded-full bg-horizon-accent/60 mx-1" />
            <span className="text-horizon-text-dim text-[11px] tracking-widest">{tag}</span>
          </>
        )}
      </div>

      {/* Main Title with Reveal */}
      <h2 className="text-section-title font-display font-bold text-white tracking-tight uppercase max-w-4xl leading-none">
        <RevealText splitBy="lines">{title}</RevealText>
      </h2>

      {/* Supporting text */}
      {subtitle && (
        <p className="mt-6 text-horizon-text-muted text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
