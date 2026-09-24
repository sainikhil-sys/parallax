import React from 'react';
import { cn } from '../lib/utils';

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

interface StatBlockProps {
  stats: StatItem[];
  className?: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({ stats, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/[0.08] backdrop-blur-[2px]',
        className
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col items-start space-y-2 relative group md:pl-6 first:pl-0"
        >
          {/* Subtle left divider accent */}
          {i > 0 && (
            <div className="hidden md:block absolute left-0 top-2 bottom-2 w-[1px] bg-white/[0.08]" />
          )}

          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white group-hover:text-horizon-accent transition-colors duration-300">
              {stat.value}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-horizon-text-muted font-medium">
              {stat.label}
            </span>
            {stat.sublabel && (
              <span className="font-mono text-[11px] text-horizon-text-dim tracking-wider">
                {stat.sublabel}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatBlock;
