import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroScreen from './components/HeroScreen';
import SavedLibrary from './components/SavedLibrary';
import SRMResources from './components/SRMResources';
import PlayerScreen from './components/PlayerScreen';
import useTheme from './hooks/useTheme';
import useLibrary from './hooks/useLibrary';
import { SRM_RESOURCES } from './resources';
import { YOUTUBE_API_KEY } from './config';
import { fetchVideoDetails, fetchPlaylist } from './hooks/useYouTubeAPI';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { library, addToLibrary, removeFromLibrary } = useLibrary();

  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Player state
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);

  // Extract IDs from URL
  const extractYouTubeIDs = (url) => {
    let videoId = null;
    let playlistId = null;
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.searchParams.has('v')) videoId = parsedUrl.searchParams.get('v');
      else if (parsedUrl.hostname === 'youtu.be') videoId = parsedUrl.pathname.slice(1);
      if (parsedUrl.searchParams.has('list')) playlistId = parsedUrl.searchParams.get('list');
    } catch {
      // Ignore invalid URL
    }
    return { videoId, playlistId };
  };

  const handleLoadUrl = async (url) => {
    if (!url) return;
    setLoading(true);
    setInputUrl(url);

    let { videoId, playlistId } = extractYouTubeIDs(url);
    if (!videoId && !playlistId) {
        // Assume exact string might be an ID if no match
        if (url.length === 11) videoId = url;
        else if (url.startsWith('PL')) playlistId = url;
    }

    if (!videoId && !playlistId) {
      alert("Invalid YouTube URL");
      setLoading(false);
      return;
    }

    try {
      if (playlistId) {
        const items = await fetchPlaylist(playlistId, YOUTUBE_API_KEY);
        if (!items || items.length === 0) throw new Error("Playlist not found or empty");
        
        setPlaylistItems(items);
        setActivePlaylistId(playlistId);
        
        // Load first video if no videoId specified
        const targetVideoId = videoId || items[0].id;
        setActiveVideoId(targetVideoId);
        
        const details = await fetchVideoDetails(targetVideoId, YOUTUBE_API_KEY);
        setVideoDetails(details);
        
        // Add to library
        addToLibrary(url, items[0].title || "Saved Playlist", "playlist", playlistId);
      } else if (videoId) {
        setPlaylistItems([]);
        setActivePlaylistId(null);
        setActiveVideoId(videoId);
        
        const details = await fetchVideoDetails(videoId, YOUTUBE_API_KEY);
        setVideoDetails(details);
        
        addToLibrary(url, details.title, "video", videoId);
      }
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
      alert("Error loading content: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar 
        urlValue={inputUrl}
        onUrlChange={setInputUrl}
        onLoad={() => handleLoadUrl(inputUrl)}
        loading={loading}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {!isPlaying ? (
        <HeroScreen>
          <SavedLibrary 
            library={library} 
            onCardClick={(url) => handleLoadUrl(url)}
            onRemove={removeFromLibrary}
          />
          <SRMResources 
            resources={SRM_RESOURCES} 
            apiKey={YOUTUBE_API_KEY} 
            onWatchNow={(url) => handleLoadUrl(url)}
          />
        </HeroScreen>
      ) : (
        <PlayerScreen 
          videoId={activeVideoId}
          videoDetails={videoDetails}
          playlistItems={playlistItems}
          onPlaylistItemClick={(id) => handleLoadUrl(`https://youtube.com/watch?v=${id}&list=${activePlaylistId}`)}
        />
      )}
    </>
  );
}
