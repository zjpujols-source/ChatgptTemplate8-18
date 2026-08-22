import { ArtistConfig } from '../types/artist';

export const defaultArtistConfig: ArtistConfig = {
  artistName: "bottara",
  tagline: "Official Artist Website",
  genre: "Pop / Electronic",
  bio: "",
  heroVideoUrl: "/hero-video.mp4",
  heroImage: "/hero-poster.jpg",
  profileImage: "",
  accentColor: "#a855f7",
  theme: "dark",
  socials: [
    {
      id: "instagram",
      platform: "instagram",
      url: "https://www.instagram.com/bottara.angele",
      label: "Instagram"
    },
    {
      id: "spotify",
      platform: "spotify",
      url: "https://open.spotify.com/artist/5KErt91aZzkDkoOd61Z4zG?si=hr4lqiNMSUKK17H6ADwnjQ",
      label: "Spotify",
      isStreaming: true
    },
    {
      id: "youtube",
      platform: "youtube",
      url: "https://www.youtube.com/@bottara.angele",
      label: "YouTube"
    },
    {
      id: "tiktok",
      platform: "tiktok",
      url: "https://www.tiktok.com/@bottara.angele",
      label: "TikTok"
    },
    {
      id: "apple-music",
      platform: "apple-music",
      url: "https://music.apple.com/us/artist/bottara/1652203374",
      label: "Apple Music",
      isStreaming: true
    }
  ],
  tabs: {
    music: {
      enabled: true,
      title: "MUSIC",
      releases: [
        {
          id: "bit-longer",
          title: "Bit Longer",
          type: "single",
          coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3b/9a/e1/3b9ae1e4-72a6-1cc6-ad87-dd9426fcefad/IMG_6611_2-copy-ac21002b.png/600x600bb.jpg",
          spotifyUrl: "https://open.spotify.com/artist/5KErt91aZzkDkoOd61Z4zG",
          appleMusicUrl: "https://music.apple.com/us/album/bit-longer-single/1761616182",
          youtubeMusicUrl: "https://music.youtube.com/watch?v=Zj4BlmE1DQ0"
        },
        {
          id: "give-it-to-me",
          title: "Give It To Me",
          type: "single",
          coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ff/fa/28/fffa2880-24f8-9744-c1d1-1e28d768886c/199633024733-copy-b4328294.png/600x600bb.jpg",
          spotifyUrl: "https://open.spotify.com/artist/5KErt91aZzkDkoOd61Z4zG",
          appleMusicUrl: "https://music.apple.com/us/album/give-it-to-me-single/1738520281",
          youtubeMusicUrl: "https://music.youtube.com/watch?v=-qVs4gvi2xc"
        },
        {
          id: "hollywood-heartbreak",
          title: "Hollywood Heartbreak",
          type: "single",
          coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7c/52/8b/7c528b32-4896-414e-752d-9ed2fc9ea371/199479900130-copy-5c9d6ed1.png/600x600bb.jpg",
          spotifyUrl: "https://open.spotify.com/artist/5KErt91aZzkDkoOd61Z4zG",
          appleMusicUrl: "https://music.apple.com/us/album/hollywood-heartbreak-single/1743128182",
          youtubeMusicUrl: "https://music.youtube.com/watch?v=AUsSkcygOjA"
        },
        {
          id: "god-complex",
          title: "God Complex",
          type: "single",
          coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f5/00/1d/f5001d5b-050c-393f-ed96-2d59dadc1a38/artwork.jpg/600x600bb.jpg",
          spotifyUrl: "https://open.spotify.com/artist/5KErt91aZzkDkoOd61Z4zG",
          appleMusicUrl: "https://music.apple.com/us/album/god-complex-single/1738520281",
          youtubeMusicUrl: "https://music.youtube.com/watch?v=Zj4BlmE1DQ0"
        }
      ]
    },
    videos: {
      enabled: true,
      title: "VIDEOS",
      items: [
        {
          id: "bit-longer-video",
          title: "Bit Longer (Official Music Video)",
          youtubeId: "Zj4BlmE1DQ0",
          thumbnail: "https://i.ytimg.com/vi/Zj4BlmE1DQ0/hqdefault.jpg"
        },
        {
          id: "give-it-to-me-video",
          title: "Give It To Me (Official Music Video)",
          youtubeId: "-qVs4gvi2xc",
          thumbnail: "https://i.ytimg.com/vi/-qVs4gvi2xc/hqdefault.jpg"
        },
        {
          id: "god-complex-video",
          title: "God Complex (Official Music Video)",
          youtubeId: "AUsSkcygOjA",
          thumbnail: "https://i.ytimg.com/vi/AUsSkcygOjA/hqdefault.jpg"
        },
        {
          id: "crumble-baby-video",
          title: "Crumble Baby (Official Music Video)",
          youtubeId: "t9D1DENCg6g",
          thumbnail: "https://i.ytimg.com/vi/t9D1DENCg6g/hqdefault.jpg"
        }
      ]
    },
    live: {
      enabled: true,
      title: "LIVE",
      status: "coming_soon"
    },
    shop: {
      enabled: true,
      title: "STORE",
      status: "coming_soon"
    },
    contact: {
      enabled: true,
      title: "CONTACT",
      managementEmail: ""
    }
  }
};
