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
    }, 900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] bg-[#F4F1EA] flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-3xl sm:text-4xl text-[#11110F] font-normal tracking-tight"
            >
              ÉLAN
            </motion.h1>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#77736B]"
            >
              AN EXPLORATION OF MOTION &amp; DEPTH
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningSequence;
