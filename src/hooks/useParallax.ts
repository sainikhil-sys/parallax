import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface UseParallaxOptions {
  speed?: number; // 0.1 = far background, 0.5 = mid, 1.0 = standard, 1.3 = fast foreground
  horizontalSpeed?: number;
  scale?: [number, number]; // [startScale, endScale]
  rotate?: [number, number]; // [startDeg, endDeg]
  opacity?: [number, number]; // [startOpacity, endOpacity]
  triggerRef?: React.RefObject<HTMLElement | null>;
  start?: string; // default "top bottom"
  end?: string; // default "bottom top"
  scrub?: boolean | number;
  direction?: 'up' | 'down' | 'both';
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const targetRef = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const {
    speed = 0.5,
    horizontalSpeed = 0,
    scale,
    rotate,
    opacity,
    triggerRef,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 0.6,
  } = options;

  useEffect(() => {
    if (prefersReducedMotion || !targetRef.current) return;

    const element = targetRef.current;
    const trigger = triggerRef?.current || element;

    // Calculate vertical movement range based on speed multiplier
    // A speed of 0.2 moves less (-60px to 60px), speed of 1.2 moves aggressively (-300px to 300px)
    const baseDistance = 200;
    const yMovement = (speed - 0.5) * baseDistance * 2;
    const xMovement = horizontalSpeed * baseDistance;

    const animProps: gsap.TweenVars = {
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: start,
        end: end,
        scrub: scrub,
        invalidateOnRefresh: true,
      },
    };

    if (yMovement !== 0) {
      animProps.y = yMovement;
    }

    if (xMovement !== 0) {
      animProps.x = xMovement;
    }

    if (scale) {
      gsap.set(element, { scale: scale[0] });
      animProps.scale = scale[1];
    }

    if (rotate) {
      gsap.set(element, { rotate: rotate[0] });
      animProps.rotate = rotate[1];
    }

    if (opacity) {
      gsap.set(element, { opacity: opacity[0] });
      animProps.opacity = opacity[1];
    }

    // Force 3D transform acceleration
    gsap.set(element, {
      force3D: true,
      transformPerspective: 1000,
      willChange: 'transform, opacity',
    });

    const tween = gsap.to(element, animProps);

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [
    speed,
    horizontalSpeed,
    scale,
    rotate,
    opacity,
    triggerRef,
    start,
    end,
    scrub,
    prefersReducedMotion,
  ]);

  return targetRef;
}
