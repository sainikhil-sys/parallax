import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SectionItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', num: '01', title: 'Between Worlds', subtitle: 'Sculptural introduction' },
  { id: 'movement', num: '02', title: 'Movement', subtitle: 'Architectural weight' },
  { id: 'space', num: '03', title: 'Space', subtitle: 'Material & light' },
  { id: 'typography', num: '04', title: 'Form', subtitle: 'Typographic depth' },
  { id: 'stillness', num: '05', title: 'Stillness', subtitle: 'Kinetic balance' },
];

interface NavigationProps {
  onNavigate?: (href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeNum, setActiveNum] = useState('01');
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        num: s.num,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && scrollPos >= item.el.offsetTop) {
          setActiveNum(item.num);
          // Check if dark section (movement: 02, stillness: 05)
          setIsDarkSection(item.id === 'movement' || item.id === 'stillness');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between pointer-events-none ${
          isDarkSection ? 'text-[#F4F1EA]' : 'text-[#11110F]'
        }`}
      >
        {/* Top Left: ÉLAN */}
        <div className="pointer-events-auto">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-tight block">
              ÉLAN
            </span>
          </button>
        </div>

        {/* Top Center: 01 — 05 */}
        <div className="pointer-events-auto">
          <div className="flex items-center space-x-2 text-[12px] sm:text-[13px] tracking-widest uppercase font-sans font-medium opacity-75">
            <span className="tabular-nums font-semibold">{activeNum}</span>
            <span className="opacity-40">—</span>
            <span className="opacity-40">05</span>
          </div>
        </div>

        {/* Top Right: MENU */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[12px] sm:text-[13px] uppercase tracking-widest font-sans font-medium hover:opacity-60 transition-opacity cursor-pointer flex items-center space-x-2 py-1 px-2 -mr-2"
            aria-label="Open navigation menu"
          >
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Clean Editorial Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#151613] text-[#F4F1EA] flex flex-col justify-between p-8 sm:p-16 select-none"
          >
            {/* Top Bar of Menu */}
            <div className="flex items-center justify-between w-full">
              <span className="font-serif text-2xl tracking-tight">ÉLAN</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[13px] tracking-widest uppercase font-sans font-medium text-[#928E85] hover:text-[#F4F1EA] transition-colors py-2 px-3 cursor-pointer"
              >
                CLOSE [×]
              </button>
            </div>

            {/* Menu Links */}
            <div className="max-w-3xl my-auto py-12">
              <p className="text-[11px] tracking-widest uppercase font-sans text-[#77736B] mb-8">
                AN EXPLORATION OF MOTION &amp; DEPTH
              </p>
              <nav className="flex flex-col space-y-4 sm:space-y-6">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleNavClick(sec.id)}
                    className="group text-left flex items-baseline space-x-4 sm:space-x-8 cursor-pointer"
                  >
                    <span className="text-sm font-sans text-[#928E85] group-hover:text-[#A65D45] transition-colors tabular-nums">
                      {sec.num}
                    </span>
                    <span className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#EDE9DF] group-hover:text-[#F4F1EA] group-hover:translate-x-3 transition-all duration-300">
                      {sec.title}
                    </span>
                    <span className="hidden sm:inline-block text-xs font-sans text-[#77736B] group-hover:text-[#928E85] transition-colors">
                      / {sec.subtitle}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[rgba(244,241,234,0.12)] pt-6 text-[12px] font-sans text-[#77736B]">
              <span>ÉLAN — Digital Exhibition</span>
              <span>Techfest IIT Bombay — 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
