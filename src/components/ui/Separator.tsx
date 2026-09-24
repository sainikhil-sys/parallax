import React from 'react';
import { cn } from '../../lib/utils';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  glow?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className,
  glow = false,
}) => {
  return (
    <div
      role="separator"
      className={cn(
        'shrink-0 bg-white/[0.08]',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        glow && 'bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent',
        className
      )}
    />
  );
};

export default Separator;
