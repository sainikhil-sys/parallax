import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from '@phosphor-icons/react';

interface NavSection {
  id: string;
  number: string;
  label: string;
  title: string;
  href: string;
}

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
          className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <span className="font-mono text-xs tracking-[0.3em] font-bold text-[#F5F5F0]">
              LIMINAL <span className="text-[#00F0FF]">//</span> SPATIAL
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-full border border-white/10 text-[#F5F5F0] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav List */}
          <nav className="my-auto py-8 flex flex-col space-y-6">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx + 0.1, duration: 0.35 }}
                >
                  <button
                    onClick={() => {
                      onNavigate(section.href);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between group py-2 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#00F0FF]">
                        {section.number}
                      </span>
                      <span
                        className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                          isActive
                            ? 'text-[#00F0FF]'
                            : 'text-[#F5F5F0]/80 group-hover:text-[#F5F5F0]'
                        }`}
                      >
                        {section.title}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={24}
                      className="text-[#858585] group-hover:text-[#00F0FF] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer Metadata */}
          <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between text-xs font-mono text-[#858585] gap-2">
            <span>TECHFEST IIT BOMBAY 2026</span>
            <span className="text-[#00F0FF]">PARALLAX DEPTH SYSTEM</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
