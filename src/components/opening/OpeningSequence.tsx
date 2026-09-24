import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'text' | 'line' | 'reveal' | 'done'>('text');

  useEffect(() => {
    // Phase 1: Tiny intro text (0 - 450ms)
    const t1 = setTimeout(() => {
      setPhase('line');
    }, 450);

    // Phase 2: Expanding thin line (450 - 950ms)
    const t2 = setTimeout(() => {
      setPhase('reveal');
    }, 950);

    // Phase 3: Transition out (1250ms)
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center select-none"
        >
          {/* Phase 1: Tiny Text */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#F5F5F0] font-semibold uppercase"
            >
              LIMINAL
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-mono text-[10px] tracking-[0.25em] text-[#858585] uppercase"
            >
              AN INTERACTIVE STUDY OF DEPTH
            </motion.span>
          </div>

          {/* Phase 2: Expanding Thin Horizon Line */}
          <div className="relative w-full max-w-md h-[1.5px] mt-6 overflow-hidden flex items-center justify-center">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: phase === 'line' || phase === 'reveal' ? 1 : 0,
                opacity: phase === 'line' || phase === 'reveal' ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_12px_#00F0FF]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningSequence;
