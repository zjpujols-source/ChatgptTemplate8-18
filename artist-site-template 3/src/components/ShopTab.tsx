import React from 'react';
import { ArtistConfig } from '../types/artist';

interface ShopTabProps {
  config: ArtistConfig;
  onOpenCustomizer?: () => void;
}

export const ShopTab: React.FC<ShopTabProps> = () => {
  return (
    <div className="py-24 sm:py-40 animate-in fade-in duration-500 bg-black text-white min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6 block">
        / MERCHANDISE
      </span>
      <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-sans leading-none">
        COMING SOON
      </h2>
    </div>
  );
};
