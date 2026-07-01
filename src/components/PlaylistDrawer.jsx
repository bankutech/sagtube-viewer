import React from 'react';
import PlaylistItem from './PlaylistItem';

export default function PlaylistDrawer({ items, activeId, onItemClick }) {
  return (
    <aside className="playlist-drawer" id="playlist-drawer">
      <div className="drawer-header">
        <h3>Playlist Items</h3>
        <span id="playlist-count">{items.length} videos</span>
      </div>
      <div className="playlist-items" id="playlist-items">
        {items.map(item => (
          <PlaylistItem 
            key={item.id} 
            item={item} 
            isActive={item.id === activeId} 
            onClick={() => onItemClick(item.id)} 
          />
        ))}
      </div>
    </aside>
  );
}
