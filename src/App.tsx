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
import { Footer } from './components/Footer';
import { TemplateCustomizer } from './components/TemplateCustomizer';

export const App: React.FC = () => {
  const [config, setConfig] = useState<ArtistConfig>(defaultArtistConfig);
  const [activeTab, setActiveTab] = useState<TabType>('music');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  const handlePlayTrack = (title: string, artist: string, coverArt?: string) => {
    // Optional track playback handler
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <Navbar
        config={config}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="pt-16 sm:pt-20">
        {activeTab === 'music' && (
          <>
            <Hero config={config} />
            <MusicTab config={config} onPlayTrack={handlePlayTrack} />
            <RecentVideoSection config={config} />
          </>
        )}
        {activeTab === 'videos' && <VideosTab config={config} />}
        {activeTab === 'live' && <LiveTab config={config} />}
        {activeTab === 'shop' && <ShopTab config={config} />}
        {activeTab === 'contact' && <ContactTab config={config} />}
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onSelectTab={setActiveTab}
      />

      {/* Template Customizer Modal (Internal state ready if opened via dev triggers) */}
      <TemplateCustomizer
        config={config}
        onUpdateConfig={setConfig}
        onReset={() => setConfig(defaultArtistConfig)}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
};

export default App;
