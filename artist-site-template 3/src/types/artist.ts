export type TabType = 'music' | 'videos' | 'live' | 'shop' | 'contact';

export type ThemePreset = 'dark-velvet' | 'midnight-cyber' | 'warm-indie' | 'neon-synth' | 'clean-acoustic';

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'spotify' | 'apple-music' | 'soundcloud' | 'bandcamp' | 'twitter' | 'facebook' | 'discord' | 'website';
  label: string;
  url: string;
  isStreaming?: boolean; // If true, highlighted in "Listen On" sections
  followers?: string;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  previewUrl?: string; // Optional audio file or demo stream
  isFeatured?: boolean;
}

export interface Release {
  id: string;
  title: string;
  type: 'Album' | 'EP' | 'Single';
  releaseDate: string;
  coverArt: string;
  description: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
  amazonMusicUrl?: string;
  deezerUrl?: string;
  tidalUrl?: string;
  soundcloudUrl?: string;
  songlinkUrl?: string;
  tracks: Track[];
}

export interface VideoItem {
  id: string;
  title: string;
  type: 'Music Video' | 'Live Session' | 'Lyric Video' | 'Vlog';
  thumbnail: string;
  youtubeId: string; // YouTube video ID or embed URL
  duration: string;
  views: string;
  date: string;
  featured?: boolean;
}

export interface LiveShow {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  status: 'Available' | 'Sold Out' | 'Coming Soon' | 'Postponed';
  ticketUrl?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'Vinyl' | 'Apparel' | 'Accessories' | 'Digital';
  price: number;
  image: string;
  tag?: 'Limited Edition' | 'Pre-order' | 'Best Seller' | 'New';
  description: string;
}

export interface ArtistConfig {
  // Brand & Name
  name: string; // Site Brand / Display Name
  artistName: string; // Primary Artist / Band Name
  tagline?: string;
  genre?: string;
  location?: string;
  bio?: string;
  fullBio?: string;
  showDevTools?: boolean; // Controls whether floating "Customize Template" & "GitHub Guide" buttons appear

  // Visuals & Imagery (Easy to swap out!)
  heroImage: string;
  heroVideoUrl?: string;
  profileImage: string;
  galleryImages: {
    id: string;
    url: string;
    caption: string;
    aspect: 'portrait' | 'landscape' | 'square';
  }[];

  // Theme styling
  theme: ThemePreset;
  accentColor: string; // e.g., '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'

  // Socials & Streaming Links
  socials: SocialLink[];

  // Tab Content & Statuses
  tabs: {
    music: {
      enabled: boolean;
      featuredReleaseId: string;
      releases: Release[];
    };
    videos: {
      enabled: boolean;
      featuredVideoId: string;
      items: VideoItem[];
    };
    live: {
      enabled: boolean;
      status: 'coming_soon' | 'active'; // Configured to "coming_soon" as requested!
      comingSoonTitle: string;
      comingSoonSubtitle: string;
      expectedYear: string;
      shows: LiveShow[]; // Sample data for when artist toggles active
    };
    shop: {
      enabled: boolean;
      status: 'coming_soon' | 'active'; // Configured to "coming_soon" as requested!
      comingSoonTitle: string;
      comingSoonSubtitle: string;
      dropDateText: string;
      previewItems: ShopItem[]; // Teaser merch items
    };
    contact: {
      enabled: boolean;
      managementEmail: string;
      bookingEmail: string;
      pressKitUrl: string;
      recordLabel: string;
    };
  };
}
