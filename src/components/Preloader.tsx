import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Quick, premium progress animation under ~900ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 400);
          }, 150);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20 + 15);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.9 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-horizon-bg flex flex-col justify-between p-8 sm:p-14 select-none"
        >
          {/* Top Metadata */}
          <div className="flex justify-between items-center text-xs font-mono text-horizon-text-dim tracking-widest uppercase">
            <span>TECHFEST 2026</span>
            <span className="text-horizon-accent">INITIALIZING DEPTH ENGINE</span>
          </div>

          {/* Center Brand & Number */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display font-bold text-2xl sm:text-4xl tracking-widest text-white"
            >
              BEYOND<span className="text-horizon-accent">/</span>HORIZON
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-horizon-accent to-transparent"
            />

            <div className="font-mono text-horizon-accent text-sm tracking-widest font-semibold pt-1">
              01
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-horizon-text-muted">
            <span className="tracking-widest">LOADING EXPERIENCE</span>
            <span className="text-white font-semibold tabular-nums">{Math.min(progress, 100)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
