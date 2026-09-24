import React, { useState, useEffect } from 'react';
import type { NavSection } from '../types';
import MobileMenu from './MobileMenu';
import { Menu } from 'lucide-react';

const SECTIONS: NavSection[] = [
  { id: 'hero', number: '01', label: 'JOURNEY', href: '#hero' },
  { id: 'journey', number: '02', label: 'LAYERS', href: '#journey' },
  { id: 'future', number: '03', label: 'FUTURE', href: '#future' },
  { id: 'deeper', number: '04', label: 'DEPTH', href: '#deeper' },
  { id: 'finale', number: '05', label: 'END', href: '#finale' },
];

interface NavigationProps {
  onNavigate?: (href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const top = item.el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-horizon-bg/80 backdrop-blur-md border-b border-white/[0.06] py-3.5'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Logo Left */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            data-cursor="top"
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-display font-bold tracking-widest text-sm sm:text-base text-white group-hover:text-horizon-accent transition-colors">
              BEYOND
            </span>
            <span className="text-horizon-accent font-mono font-semibold">/</span>
            <span className="font-display font-medium tracking-widest text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
              HORIZON
            </span>
          </a>

          {/* Desktop Center/Right Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={sec.href}
                  onClick={(e) => handleLinkClick(e, sec.href)}
                  data-cursor="view"
                  className={`group flex items-center gap-1.5 py-1 text-xs font-mono tracking-widest transition-colors ${
                    isActive ? 'text-white' : 'text-horizon-text-muted hover:text-white'
                  }`}
                >
                  <span
                    className={`text-[10px] transition-colors ${
                      isActive
                        ? 'text-horizon-accent font-bold'
                        : 'text-horizon-text-dim group-hover:text-horizon-accent'
                    }`}
                  >
                    {sec.number}
                  </span>
                  <span className="relative">
                    {sec.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-horizon-accent" />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              data-cursor="menu"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-horizon-accent/50 text-xs font-mono tracking-widest text-white/90 hover:text-white bg-white/[0.02] backdrop-blur-sm transition-all"
            >
              <Menu className="w-3.5 h-3.5 text-horizon-accent" />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sections={SECTIONS}
        activeSection={activeSection}
        onNavigate={(href) => {
          const targetId = href.replace('#', '');
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </>
  );
};

export default Navigation;
