import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LabSection {
  id: string;
  num: string;
  title: string;
}

const SECTIONS: LabSection[] = [
  { id: 'hero', num: '01', title: 'Parallax Typography' },
  { id: 'layers', num: '02', title: 'Layer Separation' },
  { id: 'stagger', num: '03', title: 'Staggered Shapes' },
  { id: 'typo', num: '04', title: 'Typographic Motion' },
  { id: 'svg', num: '05', title: 'SVG Motion' },
  { id: 'finale', num: '06', title: 'Conclusion' },
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
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        num: s.num,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && scrollPos >= item.el.offsetTop) {
          setActiveNum(item.num);
          // Check if dark section (stagger: 03)
          setIsDarkSection(item.id === 'stagger');
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
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-400 px-6 sm:px-12 py-5 sm:py-6 flex items-center justify-between pointer-events-none ${
          isDarkSection ? 'text-[#F5F5F0]' : 'text-[#111111]'
        }`}
      >
        {/* Top Left: PARALLAX/ */}
        <div className="pointer-events-auto">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left group cursor-pointer"
          >
            <span className="font-sans font-bold text-sm sm:text-base tracking-tight uppercase hover:text-[#B8FF3D] transition-colors">
              PARALLAX<span className="opacity-40 font-normal">/</span>
            </span>
          </button>
        </div>

        {/* Top Center: 01 02 03 04 05 */}
        <div className="pointer-events-auto hidden sm:flex items-center space-x-6 text-[12px] font-sans font-medium">
          {SECTIONS.slice(0, 5).map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleNavClick(sec.id)}
              className={`transition-colors cursor-pointer ${
                activeNum === sec.num
                  ? 'font-bold opacity-100 underline decoration-2 underline-offset-4 decoration-[#B8FF3D]'
                  : 'opacity-40 hover:opacity-100'
              }`}
            >
              {sec.num}
            </button>
          ))}
        </div>

        {/* Top Right: MENU */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[12px] sm:text-[13px] uppercase tracking-wider font-sans font-semibold hover:opacity-60 transition-opacity cursor-pointer py-1 px-2 -mr-2"
            aria-label="Open menu"
          >
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Clean Anime.js Inspired Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#111111] text-[#F5F5F0] flex flex-col justify-between p-8 sm:p-16 select-none"
          >
            {/* Top Bar of Menu */}
            <div className="flex items-center justify-between w-full">
              <span className="font-sans font-bold text-base tracking-tight uppercase">
                PARALLAX<span className="text-[#B8FF3D]">/</span> EXPERIMENTS
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[12px] tracking-widest uppercase font-sans font-semibold text-[#888888] hover:text-[#B8FF3D] transition-colors py-2 px-3 cursor-pointer"
              >
                CLOSE [×]
              </button>
            </div>

            {/* Menu Links */}
            <div className="max-w-2xl my-auto py-10">
              <p className="text-[11px] tracking-widest uppercase font-sans text-[#888888] mb-8">
                SELECT AN EXPERIMENT
              </p>
              <nav className="flex flex-col space-y-4 sm:space-y-6">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleNavClick(sec.id)}
                    className="group text-left flex items-baseline space-x-4 sm:space-x-6 cursor-pointer"
                  >
                    <span className="text-xs font-mono text-[#888888] group-hover:text-[#B8FF3D] transition-colors">
                      {sec.num}
                    </span>
                    <span className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F5F0] group-hover:text-[#B8FF3D] group-hover:translate-x-2 transition-all duration-200">
                      {sec.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-6 text-[12px] font-sans text-[#888888]">
              <span>Interactive Motion Laboratory</span>
              <span>Techfest 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
