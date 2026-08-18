/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { defaultArtistConfig } from './config/artistConfig';
import { ArtistConfig, TabType } from './types/artist';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MusicTab } from './components/MusicTab';
import { VideosTab } from './components/VideosTab';
import { LiveTab } from './components/LiveTab';
import { ShopTab } from './components/ShopTab';
import { ContactTab } from './components/ContactTab';
import { RecentVideoSection } from './components/RecentVideoSection';
import { TemplateCustomizer } from './components/TemplateCustomizer';
import { Footer } from './components/Footer';
import { Sparkles, Github } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<ArtistConfig>(defaultArtistConfig);
  const [activeTab, setActiveTab] = useState<TabType>('music');
  
  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<{ title: string; artist: string; coverArt: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Studio Customizer Modal State
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<'editor' | 'github'>('editor');

  const handlePlayTrack = (title: string, artist: string, coverArt?: string) => {
    setCurrentTrack({
      title,
      artist,
      coverArt: coverArt || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
    });
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const allTracks = config.tabs.music.releases.flatMap(r => r.tracks);
    const currentIndex = allTracks.findIndex(t => t.title === currentTrack?.title);
    if (currentIndex !== -1 && currentIndex + 1 < allTracks.length) {
      const next = allTracks[currentIndex + 1];
      setCurrentTrack({
        title: next.title,
        artist: config.artistName,
        coverArt: currentTrack?.coverArt || ""
      });
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    const allTracks = config.tabs.music.releases.flatMap(r => r.tracks);
    const currentIndex = allTracks.findIndex(t => t.title === currentTrack?.title);
    if (currentIndex > 0) {
      const prev = allTracks[currentIndex - 1];
      setCurrentTrack({
        title: prev.title,
        artist: config.artistName,
        coverArt: currentTrack?.coverArt || ""
      });
      setIsPlaying(true);
    }
  };

  const openCustomizer = (tab: 'editor' | 'github' = 'editor') => {
    setCustomizerTab(tab);
    setCustomizerOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased relative">
      
      {/* Navbar */}
      <Navbar
        config={config}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCustomizer={() => openCustomizer('editor')}
        onOpenGitHubGuide={() => openCustomizer('github')}
      />

      {/* Hero Banner (Always shown on Music/Home tab, or summarized on other tabs) */}
      {activeTab === 'music' && (
        <Hero
          config={config}
          onSelectTab={setActiveTab}
          onPlayTrack={handlePlayTrack}
          onUpdateConfig={setConfig}
        />
      )}

      {/* Main Tab Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20">
        {activeTab === 'music' && (
          <div id="music-section">
            <MusicTab
              config={config}
              onPlayTrack={handlePlayTrack}
              currentPlayingTrack={currentTrack?.title}
              isPlaying={isPlaying}
            />
            <RecentVideoSection config={config} />
          </div>
        )}
        {activeTab === 'videos' && <VideosTab config={config} />}
        {activeTab === 'live' && <LiveTab config={config} onOpenCustomizer={() => openCustomizer('editor')} />}
        {activeTab === 'shop' && <ShopTab config={config} onOpenCustomizer={() => openCustomizer('editor')} />}
        {activeTab === 'contact' && <ContactTab config={config} />}
      </main>

      {/* Floating Action Buttons (Customize & GitHub Guide on Bottom Left) - Only shown if showDevTools is true */}
      {config.showDevTools && (
        <div className="fixed z-40 left-4 sm:left-6 bottom-6 transition-all duration-300">
          <div className="flex flex-col gap-2 items-start">
            <button
              onClick={() => openCustomizer('editor')}
              className="px-4 py-2.5 rounded-none bg-zinc-900/95 hover:bg-white backdrop-blur-xl border border-white/40 text-white hover:text-black shadow-2xl flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-all hover:scale-105 active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform animate-pulse" />
              <span>Customize Template</span>
            </button>

            <button
              onClick={() => openCustomizer('github')}
              className="px-3.5 py-2 rounded-none bg-black/95 hover:bg-white backdrop-blur-xl border border-white/20 text-zinc-300 hover:text-black shadow-xl flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all hover:scale-105"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Guide</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        config={config}
        onSelectTab={setActiveTab}
        onOpenCustomizer={() => openCustomizer('editor')}
        onOpenGitHubGuide={() => openCustomizer('github')}
      />

      {/* Template Customizer Studio & GitHub Modal */}
      <TemplateCustomizer
        config={config}
        onUpdateConfig={setConfig}
        onReset={() => setConfig(defaultArtistConfig)}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        initialTab={customizerTab}
      />

    </div>
  );
}

