
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { LayoutProps, NavItem } from '../types';
import SocialLinks from './SocialLinks';
import CursorBlob from './CursorBlob';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleTheme = () => setIsDark(!isDark);

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Experience', path: '/work' },
    { label: 'Projects', path: '/projects' },
    { label: 'Attributes', path: '/attributes' },
  ];

  return (
    <div className="max-h-screen flex flex-col relative overflow-x-hidden cursor-auto md:cursor-none selection:bg-primary/30">
      
      {/* Custom Cursor */}
      <CursorBlob />

      {/* Ambient Background - Clean & Soft */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-[0.03]" />
        
        {/* Gradient Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Artistic Typographic */}
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="group relative z-10">
                <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Still Human<span className="text-primary">.</span>
                </span>
              </NavLink>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                      isActive 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`
                  }
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-px bg-primary origin-left transition-transform duration-300 ${({ isActive }: any) => isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                </NavLink>
              ))}
              
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-all hover:rotate-12 duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-400"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-dark animate-fade-in-up">
            <div className="px-6 pt-4 pb-8 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-3 text-lg font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-slate-600 dark:text-slate-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Socials */}
      <SocialLinks />

      {/* Main Content */}
      <main className="flex-grow pt-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 md:py-16">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-100 dark:border-white/5 text-center bg-white/50 dark:bg-dark/50 backdrop-blur-sm relative z-10">
        <p className="text-xs text-slate-400 dark:text-slate-600 font-medium tracking-widest uppercase">
          Designed & Built by <span className="text-slate-600 dark:text-slate-400 font-bold">Abhi</span>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
