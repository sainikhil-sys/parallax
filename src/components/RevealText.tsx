import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  splitBy?: 'words' | 'lines';
  triggerStart?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.9,
  as: Component = 'div',
  splitBy = 'words',
  triggerStart = 'top 85%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.reveal-unit');

    gsap.fromTo(
      elements,
      {
        y: '105%',
        opacity: 0,
        rotateX: -15,
      },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: duration,
        delay: delay,
        stagger: 0.035,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );
  }, [delay, duration, prefersReducedMotion, triggerStart]);

  if (splitBy === 'words') {
    const words = children.split(' ');
    return (
      <Component
        ref={containerRef as any}
        className={cn('inline-block perspective-1000', className)}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <span className="reveal-unit inline-block will-change-transform transform-style-3d origin-bottom">
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // Split by line breaks
  const lines = children.split('\n');
  return (
    <Component
      ref={containerRef as any}
      className={cn('inline-block perspective-1000', className)}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span className="reveal-unit block will-change-transform transform-style-3d origin-bottom">
            {line}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default RevealText;
