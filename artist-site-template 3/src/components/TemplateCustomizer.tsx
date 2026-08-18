import React, { useState } from 'react';
import { ArtistConfig, ThemePreset } from '../types/artist';
import { Sparkles, Github, Copy, Check, X, Palette, Image as ImageIcon, Share2, ToggleLeft, ToggleRight, Download, ExternalLink, RefreshCw, Upload, Terminal } from 'lucide-react';

interface TemplateCustomizerProps {
  config: ArtistConfig;
  onUpdateConfig: (newConfig: ArtistConfig) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'editor' | 'github';
}

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  config,
  onUpdateConfig,
  onReset,
  isOpen,
  onClose,
  initialTab = 'editor'
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'editor' | 'github'>(initialTab);
  const [copiedCode, setCopiedCode] = useState(false);
  const [newSocialLabel, setNewSocialLabel] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  if (!isOpen) return null;

  const accentColors = [
    { name: 'Purple Neon', hex: '#a855f7' },
    { name: 'Cyber Pink', hex: '#ec4899' },
    { name: 'Electric Blue', hex: '#3b82f6' },
    { name: 'Emerald Velvet', hex: '#10b981' },
    { name: 'Amber Sunset', hex: '#f59e0b' },
    { name: 'Crimson Stage', hex: '#ef4444' }
  ];

  const handleTextChange = (field: keyof ArtistConfig, value: string) => {
    onUpdateConfig({
      ...config,
      [field]: value
    });
  };

  const handleColorChange = (hex: string) => {
    onUpdateConfig({
      ...config,
      accentColor: hex
    });
  };

  const handleToggleLiveStatus = () => {
    const nextStatus = config.tabs.live.status === 'coming_soon' ? 'active' : 'coming_soon';
    onUpdateConfig({
      ...config,
      tabs: {
        ...config.tabs,
        live: {
          ...config.tabs.live,
          status: nextStatus
        }
      }
    });
  };

  const handleToggleShopStatus = () => {
    const nextStatus = config.tabs.shop.status === 'coming_soon' ? 'active' : 'coming_soon';
    onUpdateConfig({
      ...config,
      tabs: {
        ...config.tabs,
        shop: {
          ...config.tabs.shop,
          status: nextStatus
        }
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'profile') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === 'hero') {
        onUpdateConfig({ ...config, heroImage: dataUrl });
      } else {
        onUpdateConfig({ ...config, profileImage: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onUpdateConfig({ ...config, heroVideoUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleCopyConfig = () => {
    const codeString = `// Paste this into src/config/artistConfig.ts\n\nimport { ArtistConfig } from '../types/artist';\n\nexport const defaultArtistConfig: ArtistConfig = ${JSON.stringify(config, null, 2)};`;
    navigator.clipboard.writeText(codeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: config.accentColor }}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <span>Musician Template Studio</span>
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Real-time customization & GitHub deployment suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Modal Tabs */}
            <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => setActiveModalTab('editor')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeModalTab === 'editor'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Live Editor</span>
              </button>
              <button
                onClick={() => setActiveModalTab('github')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeModalTab === 'github'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub & Deploy Guide</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors ml-2"
              title="Close Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* TAB 1: LIVE EDITOR */}
          {activeModalTab === 'editor' && (
            <div className="space-y-8">
              
              {/* Info banner */}
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-200">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>
                    Any edits made here update your site live! When done, click <strong>Copy Config Code</strong> to save permanently into your project.
                  </span>
                </div>
                <button
                  onClick={onReset}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto font-mono text-[11px]"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to Defaults</span>
                </button>
              </div>

              {/* Section 1: Artist Brand & Texts */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span>1. Artist Identity & Bio</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                      Artist / Band Name
                    </label>
                    <input
                      type="text"
                      value={config.artistName}
                      onChange={(e) => handleTextChange('artistName', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                      Genre & Style
                    </label>
                    <input
                      type="text"
                      value={config.genre}
                      onChange={(e) => handleTextChange('genre', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                    Tagline (Hero Subtitle)
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => handleTextChange('tagline', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase mb-1">
                    Short Bio (Hero Summary)
                  </label>
                  <textarea
                    rows={2}
                    value={config.bio}
                    onChange={(e) => handleTextChange('bio', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Section 2: Colors & Theme */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-pink-400 font-bold flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span>2. Accent Color & Atmosphere</span>
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {accentColors.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleColorChange(col.hex)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 border transition-all ${
                        config.accentColor === col.hex
                          ? 'border-white scale-105 shadow-lg bg-neutral-800 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs font-mono text-neutral-500">Custom Hex:</span>
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-8 h-8 rounded-lg bg-transparent cursor-pointer border border-neutral-700"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: "Coming Soon" Tab Toggles (As requested!) */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span>3. "Coming Soon" Tab Toggles</span>
                </h4>
                <p className="text-xs text-neutral-400">
                  You requested to fill in "Coming Soon" for the Live tab and Shop tab. Here you can toggle them live anytime!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Live Tab Toggle Card */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">Live Dates Tab Status</div>
                      <div className="text-xs font-mono text-neutral-400">
                        Current: <span className="text-purple-400 uppercase font-bold">{config.tabs.live.status}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleLiveStatus}
                      className="p-2 text-neutral-300 hover:text-white transition-colors"
                      title="Toggle Live Tab Status"
                    >
                      {config.tabs.live.status === 'coming_soon' ? (
                        <ToggleLeft className="w-8 h-8 text-neutral-500" />
                      ) : (
                        <ToggleRight className="w-8 h-8 text-purple-400" />
                      )}
                    </button>
                  </div>

                  {/* Shop Tab Toggle Card */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">Shop / Merch Tab Status</div>
                      <div className="text-xs font-mono text-neutral-400">
                        Current: <span className="text-pink-400 uppercase font-bold">{config.tabs.shop.status}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleShopStatus}
                      className="p-2 text-neutral-300 hover:text-white transition-colors"
                      title="Toggle Shop Tab Status"
                    >
                      {config.tabs.shop.status === 'coming_soon' ? (
                        <ToggleLeft className="w-8 h-8 text-neutral-500" />
                      ) : (
                        <ToggleRight className="w-8 h-8 text-pink-400" />
                      )}
                    </button>
                  </div>

                </div>
              </div>

              {/* Section 4: Imagery & Video Background */}
              <div className="space-y-4">
                <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span>4. Hero Video Background & Photos</span>
                </h4>
                
                {/* Hero Looping Video Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-400 uppercase">
                    Hero Looping Background Video URL or MP4/WebM File
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={config.heroVideoUrl || ''}
                      onChange={(e) => handleTextChange('heroVideoUrl', e.target.value)}
                      placeholder="/hero-bg.mp4 or https://..."
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium cursor-pointer flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Video</span>
                      <input type="file" accept="video/mp4,video/webm,video/*" className="hidden" onChange={handleVideoUpload} />
                    </label>
                  </div>
                  {config.heroVideoUrl && (
                    <div className="h-24 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 relative">
                      <video
                        src={config.heroVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-2 text-[10px] bg-black/80 px-1.5 py-0.5 rounded font-mono text-neutral-400">Looping Video Preview</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  {/* Hero Banner Image */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-neutral-400 uppercase">
                      Fallback Hero Poster Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.heroImage}
                        onChange={(e) => handleTextChange('heroImage', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                      />
                      <label className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'hero')} />
                      </label>
                    </div>
                    <div className="h-20 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 relative">
                      <img src={config.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-2 text-[10px] bg-black/80 px-1.5 py-0.5 rounded font-mono text-neutral-400">Poster Preview</span>
                    </div>
                  </div>

                  {/* Profile Avatar Image */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-neutral-400 uppercase">
                      Artist Profile Photo URL or File
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.profileImage}
                        onChange={(e) => handleTextChange('profileImage', e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                      />
                      <label className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium cursor-pointer flex items-center gap-1 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profile')} />
                      </label>
                    </div>
                    <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-purple-500 bg-neutral-950 relative">
                      <img src={config.profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: GITHUB & DEPLOY GUIDE */}
          {activeModalTab === 'github' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/60 via-neutral-900 to-neutral-900 border border-purple-500/40 space-y-4">
                <div className="flex items-center gap-3">
                  <Github className="w-8 h-8 text-white" />
                  <div>
                    <h4 className="text-xl font-bold text-white font-serif">How to Upload to GitHub & Deploy</h4>
                    <p className="text-xs text-purple-200">
                      Take your musician website from AI Studio to a custom live domain in 3 simple steps!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1 */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 relative">
                  <div className="w-8 h-8 rounded-full bg-purple-900/60 text-purple-300 font-mono font-bold flex items-center justify-center text-sm border border-purple-500/40">
                    01
                  </div>
                  <h5 className="font-bold text-white text-base">Export from AI Studio</h5>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    In the top right or settings menu of Google AI Studio, click <strong>"Share / Export"</strong> and choose <strong>"Export to GitHub"</strong> (or download as ZIP). This creates a clean repository in your GitHub account!
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 relative">
                  <div className="w-8 h-8 rounded-full bg-pink-900/60 text-pink-300 font-mono font-bold flex items-center justify-center text-sm border border-pink-500/40">
                    02
                  </div>
                  <h5 className="font-bold text-white text-base">Edit 1 Single File</h5>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Once in your code editor or GitHub, open <code className="text-pink-300 bg-neutral-900 px-1 py-0.5 rounded">src/config/artistConfig.ts</code>. This single file controls your name, bio, socials, photos, and music releases!
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-900/60 text-emerald-300 font-mono font-bold flex items-center justify-center text-sm border border-emerald-500/40">
                    03
                  </div>
                  <h5 className="font-bold text-white text-base">Deploy for Free</h5>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Connect your GitHub repo to <strong>Vercel</strong>, <strong>Netlify</strong>, or <strong>Cloudflare Pages</strong>. They will automatically build your Vite TypeScript app and give you a free SSL custom domain!
                  </p>
                </div>

              </div>

              {/* Code Export snippet */}
              <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-mono text-neutral-300">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span>Your Current Customized Config Code</span>
                  </div>
                  <button
                    onClick={handleCopyConfig}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'Copied Config!' : 'Copy Config JSON'}</span>
                  </button>
                </div>

                <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 overflow-x-auto max-h-60 text-xs font-mono text-purple-200">
                  <pre>{`// File: src/config/artistConfig.ts\nexport const defaultArtistConfig = ${JSON.stringify({
                    artistName: config.artistName,
                    tagline: config.tagline,
                    genre: config.genre,
                    theme: config.theme,
                    accentColor: config.accentColor,
                    tabsStatus: {
                      live: config.tabs.live.status,
                      shop: config.tabs.shop.status
                    }
                  }, null, 2)};\n// ...and all your discography & socials!`}</pre>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-mono text-neutral-500">
            ✨ Changes save automatically to your current preview session
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyConfig}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shadow-lg text-white"
              style={{ backgroundColor: config.accentColor }}
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Copied Config Code!' : 'Copy Config JSON'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
