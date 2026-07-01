import React, { useState, useEffect } from 'react';

function ResourceCard({ resource, apiKey, onWatchNow }) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!resource.url || !apiKey) return;

    const videoIdMatch = resource.url.match(
      /(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) return;

    const fetchThumbnail = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const thumbs = data.items[0].snippet.thumbnails;
          setThumbnail(thumbs.medium?.url || thumbs.default?.url);
        }
      } catch (err) {
        console.error('Failed to fetch thumbnail:', err);
      }
    };

    fetchThumbnail();
  }, [resource.url, apiKey]);

  return (
    <div className="resource-card">
      {thumbnail && (
        <img className="resource-thumb" src={thumbnail} alt={resource.channel || 'Thumbnail'} />
      )}
      {resource.channel && (
        <div className="resource-channel">{resource.channel}</div>
      )}
      {resource.description && (
        <p className="resource-desc">{resource.description}</p>
      )}
      <button className="resource-btn" onClick={() => onWatchNow(resource.url)}>
        Watch Now
      </button>
    </div>
  );
}

export default ResourceCard;
