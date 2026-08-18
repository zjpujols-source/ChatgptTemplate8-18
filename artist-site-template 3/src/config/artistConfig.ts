/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ============================================================================
 * 🎵 MUSICIAN WEBSITE TEMPLATE — ARTIST CONFIGURATION
 * ============================================================================
 *
 * Welcome! This single file controls almost everything on your site.
 * When you deploy to GitHub / Vercel / Netlify, edit the values below to
 * swap in your own name, bio, photos, socials, and music.
 *
 * Sections marked ← EDIT THIS are the ones you'll actually want to fill in.
 * Everything else already works with safe placeholder content.
 */

import { ArtistConfig } from '../types/artist';

export const defaultArtistConfig: ArtistConfig = {
  // --------------------------------------------------------------------------
  // 1. BRAND & IDENTITY   ← EDIT THIS
  // --------------------------------------------------------------------------
  name: "Your Artist Name | Official Site",
  artistName: "Your Artist Name",
  showDevTools: false, // Set to true if you want the floating "Customize Template" & "GitHub Guide" buttons visible
  tagline: "",
  genre: "",
  location: "",
  bio: "A short one- or two-sentence bio goes here.",
  fullBio: "A longer bio for your About section goes here. Talk about where you're from, what you sound like, and what you've released so far.",

  // --------------------------------------------------------------------------
  // 2. VISUALS & IMAGERY   ← EDIT THIS
  // heroVideoUrl: drop your ~8 second video in /public and point to it here
  // (e.g. "/my-video.mp4"). A generic placeholder loop ships in /public
  // as hero-bg.mp4 so the page renders correctly out of the box.
  // --------------------------------------------------------------------------
  heroImage: "", // No artist image. Keep empty when using the hero video.
  heroVideoUrl: "/hero-bg.mp4",
  profileImage: "",

  galleryImages: [],

  // --------------------------------------------------------------------------
  // 3. THEME & COLOR PALETTE
  // Choose: 'dark-velvet', 'midnight-cyber', 'warm-indie', 'neon-synth', or 'clean-acoustic'
  // --------------------------------------------------------------------------
  theme: "dark-velvet",
  accentColor: "#a855f7", // Purple / Violet glow

  // --------------------------------------------------------------------------
  // 4. SOCIAL & STREAMING LINKS   ← EDIT THIS
  // Add, remove, or reorder entries freely. Supported "platform" values:
  // instagram, tiktok, youtube, spotify, apple-music, soundcloud, bandcamp,
  // twitter, facebook, discord, website
  // --------------------------------------------------------------------------
  socials: [
    { id: "soc-instagram", platform: "instagram", label: "Instagram", url: "https://instagram.com/yourhandle" },
    { id: "soc-tiktok", platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@yourhandle" },
    { id: "soc-youtube", platform: "youtube", label: "YouTube", url: "https://youtube.com/@yourhandle" },
    { id: "soc-spotify", platform: "spotify", label: "Spotify", url: "https://open.spotify.com/artist/yourid", isStreaming: true },
    { id: "soc-apple", platform: "apple-music", label: "Apple Music", url: "https://music.apple.com/us/artist/yourid", isStreaming: true }
  ],

  // --------------------------------------------------------------------------
  // 5. TABS CONTENT & STATUS
  // --------------------------------------------------------------------------
  tabs: {
    // ---- MUSIC TAB ----   ← EDIT THIS
    // One placeholder release so the layout renders correctly.
    // Duplicate this block for each release.
    music: {
      enabled: true,
      featuredReleaseId: "rel-1",
      releases: [
        {
          id: "rel-1",
          title: "Your Track Title",
          type: "Single",
          releaseDate: "",
          coverArt: "",
          description: "A short description of this release.",
          spotifyUrl: "",
          appleMusicUrl: "",
          tracks: [
            { id: "trk-1", title: "Your Track Title", duration: "3:00", isFeatured: true }
          ]
        }
      ]
    },

    // ---- VIDEOS TAB ----   ← EDIT THIS
    // youtubeId is the part after "watch?v=" in a YouTube URL.
    videos: {
      enabled: true,
      featuredVideoId: "vid-1",
      items: [
        {
          id: "vid-1",
          title: "Your Video Title",
          type: "Music Video",
          thumbnail: "",
          youtubeId: "",
          duration: "",
          views: "",
          date: "",
          featured: true
        }
      ]
    },

    // ---- LIVE TAB ----
    // Leave status as "coming_soon" until you have real dates to add,
    // then switch to "active" and fill in `shows`.
    live: {
      enabled: true,
      status: "coming_soon",
      comingSoonTitle: "TOUR DATES COMING SOON",
      comingSoonSubtitle: "Sign up to be the first to know when tickets go on sale.",
      expectedYear: "2026",
      shows: []
    },

    // ---- SHOP TAB ----
    // Leave status as "coming_soon" until you have real merch to add,
    // then switch to "active" and fill in `previewItems`.
    shop: {
      enabled: true,
      status: "coming_soon",
      comingSoonTitle: "MERCH DROPPING SOON",
      comingSoonSubtitle: "Sign up to get first access when the store goes live.",
      dropDateText: "",
      previewItems: []
    },

    // ---- CONTACT TAB ----   ← EDIT THIS
    contact: {
      enabled: true,
      managementEmail: "hello@yourartistname.com",
      bookingEmail: "hello@yourartistname.com",
      pressKitUrl: "",
      recordLabel: ""
    }
  }
};
