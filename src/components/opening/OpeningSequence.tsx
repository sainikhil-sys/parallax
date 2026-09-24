import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 750);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] bg-[#F5F5F0] flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="font-sans font-black text-2xl sm:text-3xl text-[#111111] uppercase tracking-tighter"
            >
              PARALLAX<span className="text-[#B8FF3D]">/</span>
            </motion.h1>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666666]"
            >
              INTERACTIVE MOTION LABORATORY
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningSequence;
