import React from 'react';
import LibraryCard from './LibraryCard';

function SavedLibrary({ library, onCardClick, onRemove }) {
  if (!library || library.length === 0) {
    return null;
  }

  return (
    <section className="saved-library-section">
      <h2 className="library-title">Saved Library</h2>
      <div className="library-grid">
        {library.map((item, index) => (
          <LibraryCard
            key={item.id || index}
            item={item}
            onClick={() => onCardClick(item)}
            onRemove={(e) => {
              e.stopPropagation();
              onRemove(item);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default SavedLibrary;
