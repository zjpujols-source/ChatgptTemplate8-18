export type TabType = 'music' | 'videos' | 'live' | 'shop' | 'contact';

export type ThemePreset = 'dark' | 'light' | 'neon' | 'monochrome';

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'spotify' | 'youtube' | 'tiktok' | 'apple-music' | 'soundcloud' | 'twitter' | string;
  url: string;
  label: string;
  isStreaming?: boolean;
}

export interface Release {
  id: string;
  title: string;
  type: 'single' | 'album' | 'ep';
  releaseDate?: string;
  coverArt?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
  amazonMusicUrl?: string;
  deezerUrl?: string;
  tidalUrl?: string;
  soundcloudUrl?: string;
  songlinkUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail?: string;
}

export interface ArtistConfig {
  artistName: string;
  tagline: string;
  genre?: string;
  bio?: string;
  heroVideoUrl: string;
  heroImage: string;
  profileImage: string;
  accentColor: string;
  theme: ThemePreset;
  socials: SocialLink[];
  tabs: {
    music: {
      enabled: boolean;
      title: string;
      releases: Release[];
    };
    videos: {
      enabled: boolean;
      title: string;
      items: VideoItem[];
    };
    live: {
      enabled: boolean;
      title: string;
      status: 'active' | 'coming_soon';
    };
    shop: {
      enabled: boolean;
      title: string;
      status: 'active' | 'coming_soon';
    };
    contact: {
      enabled: boolean;
      title: string;
      managementEmail?: string;
      bookingEmail?: string;
      pressEmail?: string;
    };
  };
}
