import React, { useEffect, useRef } from 'react';

export default function PlaylistItem({ item, isActive, onClick }) {
  const itemRef = useRef(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

  return (
    <div 
      ref={itemRef}
      className={`playlist-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <img src={item.thumb} alt={item.title} className="playlist-thumb" loading="lazy" />
      <div className="playlist-info">
        <div className="playlist-title">{item.title}</div>
        <div className="playlist-channel">{item.channel}</div>
      </div>
    </div>
  );
}
