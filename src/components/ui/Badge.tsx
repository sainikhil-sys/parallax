import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'outline' | 'glow';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white/[0.05] text-[#F5F5F0]/80 border-white/10',
    accent: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30',
    outline: 'bg-transparent text-[#858585] border-white/10',
    glow: 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]',
  }[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border backdrop-blur-sm select-none',
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
