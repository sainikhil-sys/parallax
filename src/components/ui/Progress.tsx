import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
  showIndicator?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  className,
  showIndicator = false,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full bg-gradient-to-r from-[#00F0FF]/60 to-[#00F0FF] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showIndicator && (
        <div className="flex justify-between font-mono text-[9px] text-[#858585]">
          <span>CALIBRATION</span>
          <span className="text-[#00F0FF]">{clampedValue.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
};

export default Progress;
