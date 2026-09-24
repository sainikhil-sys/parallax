import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import type { NavSection } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: NavSection[];
  activeSection: string;
  onNavigate: (href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  sections,
  activeSection,
  onNavigate,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-horizon-bg/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-display font-bold tracking-widest text-sm text-white">
              BEYOND<span className="text-horizon-accent">/</span>HORIZON
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2.5 rounded-full border border-white/10 text-white hover:border-horizon-accent hover:text-horizon-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-8 flex flex-col space-y-6">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx + 0.1, duration: 0.4 }}
                >
                  <button
                    onClick={() => {
                      onNavigate(section.href);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between group py-2 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-horizon-accent/80">
                        {section.number}
                      </span>
                      <span
                        className={`font-display text-2xl sm:text-3xl font-medium tracking-tight transition-colors ${
                          isActive
                            ? 'text-horizon-accent'
                            : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-horizon-text-dim group-hover:text-horizon-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer Metadata */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-xs font-mono text-horizon-text-dim gap-2">
            <span>TECHFEST IIT BOMBAY 2026</span>
            <span className="text-horizon-accent">PARALLAX ENGINE 3.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
