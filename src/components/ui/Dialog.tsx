import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-2xl bg-[#0c0c0c] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-[#F5F5F0]">
                  {title}
                </h3>
                {subtitle && (
                  <p className="font-mono text-xs text-[#858585] tracking-widest mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg border border-white/10 text-[#858585] hover:text-[#F5F5F0] hover:border-[#00F0FF] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="text-sm text-[#F5F5F0]/90">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
