import React, { useState } from 'react';
import { ArtistConfig, TabType } from '../types/artist';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  config: ArtistConfig;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenCustomizer: () => void;
  onOpenGitHubGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeTab,
  onSelectTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'music', label: 'Music' },
    { id: 'videos', label: 'Videos' },
    { id: 'live', label: 'Live' },
    { id: 'shop', label: 'Shop' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabClick = (tabId: TabType) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Spaced Artist Name */}
          <div 
            className="cursor-pointer group flex items-center" 
            onClick={() => handleTabClick('music')}
          >
            <span className="text-base sm:text-2xl font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase text-white font-sans transition-opacity group-hover:opacity-80">
              {config.artistName}
            </span>
          </div>

          {/* Desktop Navigation Links (Clean, No Boxes) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-xs uppercase tracking-[0.25em] font-bold transition-all duration-200 ${
                    isActive 
                      ? 'text-white underline decoration-white decoration-2 underline-offset-8' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                 >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-zinc-400 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-left text-sm uppercase tracking-[0.25em] font-bold transition-colors py-2 ${
                    isActive ? 'text-white underline decoration-2 underline-offset-8' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
