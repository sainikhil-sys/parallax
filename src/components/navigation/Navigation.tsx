import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { List } from '@phosphor-icons/react';

export interface NavItem {
  id: string;
  number: string;
  label: string;
  title: string;
  href: string;
}

const SECTIONS: NavItem[] = [
  { id: 'portal', number: '01', label: '01', title: 'THE PORTAL', href: '#portal' },
  { id: 'fragments', number: '02', label: '02', title: 'FRAGMENTS', href: '#fragments' },
  { id: 'void', number: '03', label: '03', title: 'THE VOID', href: '#void' },
  { id: 'descent', number: '04', label: '04', title: 'DESCENT', href: '#descent' },
  { id: 'signal', number: '05', label: '05', title: 'SIGNAL', href: '#signal' },
];

interface NavigationProps {
  onNavigate?: (href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('portal');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          if (scrollPos >= item.el.offsetTop) {
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
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 flex justify-center px-4 sm:px-8 pointer-events-none ${
          isScrolled ? 'pt-4 sm:pt-6' : 'pt-6 sm:pt-8'
        }`}
      >
        <div className="w-full max-w-6xl flex items-center justify-between pointer-events-auto">
          {/* Left Brand */}
          <a
            href="#portal"
            onClick={(e) => handleLinkClick(e, '#portal')}
            data-cursor="home"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#050505]/70 border border-white/[0.08] backdrop-blur-md focus:outline-none transition-colors hover:border-[#00F0FF]/40"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono font-bold text-xs tracking-[0.25em] text-[#F5F5F0] group-hover:text-[#00F0FF] transition-colors">
              LIMINAL
            </span>
          </a>

          {/* Center Numbers: 01 02 03 04 05 */}
          <nav className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505]/70 border border-white/[0.08] backdrop-blur-md shadow-2xl">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={sec.href}
                  onClick={(e) => handleLinkClick(e, sec.href)}
                  data-cursor={sec.title}
                  className={`relative px-3 py-1 text-xs font-mono tracking-widest transition-colors rounded-full ${
                    isActive
                      ? 'text-[#050505] font-bold'
                      : 'text-[#858585] hover:text-[#F5F5F0]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.4)] -z-10" />
                  )}
                  {sec.number}
                </a>
              );
            })}
          </nav>

          {/* Right Menu Trigger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            data-cursor="menu"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#050505]/70 border border-white/[0.08] backdrop-blur-md hover:border-[#00F0FF]/40 transition-colors text-xs font-mono tracking-widest text-[#F5F5F0] focus:outline-none"
          >
            <List size={14} className="text-[#00F0FF]" />
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        sections={SECTIONS}
        activeSection={activeSection}
        onNavigate={(href) => {
          const targetId = href.replace('#', '');
          const el = document.getElementById(targetId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </>
  );
};

export default Navigation;
