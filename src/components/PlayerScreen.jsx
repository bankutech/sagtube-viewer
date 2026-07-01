import React from 'react';
import VideoPlayer from './VideoPlayer';
import VideoInfo from './VideoInfo';
import PlaylistDrawer from './PlaylistDrawer';

export default function PlayerScreen({ videoId, videoDetails, playlistItems, onPlaylistItemClick }) {
  return (
    <div id="app-screen" className="screen">
      <div className="app-layout">
        <main className="main-content">
          <section className="player-section">
            <div className="player-container">
              <VideoPlayer videoId={videoId} />
            </div>
            
            <VideoInfo videoId={videoId} details={videoDetails} />
          </section>
        </main>

        {playlistItems && playlistItems.length > 0 && (
          <PlaylistDrawer 
            items={playlistItems} 
            activeId={videoId} 
            onItemClick={onPlaylistItemClick} 
          />
        )}
      </div>
    </div>
  );
}
