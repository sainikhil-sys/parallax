import React from 'react';
import { useParallax } from '../../hooks/useParallax';
import type { UseParallaxOptions } from '../../hooks/useParallax';
import { cn } from '../../lib/utils';

export interface ParallaxLayerComponentProps extends UseParallaxOptions {
  children?: React.ReactNode;
  className?: string;
  zIndex?: number;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export const ParallaxLayer: React.FC<ParallaxLayerComponentProps> = ({
  children,
  className,
  speed = 0.5,
  horizontalSpeed = 0,
  scale,
  rotate,
  opacity,
  triggerRef,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 0.6,
  zIndex,
  style,
  as: Component = 'div',
}) => {
  const ref = useParallax<HTMLDivElement>({
    speed,
    horizontalSpeed,
    scale,
    rotate,
    opacity,
    triggerRef,
    start,
    end,
    scrub,
  });

  return (
    <Component
      ref={ref}
      className={cn('parallax-layer relative will-change-transform', className)}
      style={{
        zIndex,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export default ParallaxLayer;
