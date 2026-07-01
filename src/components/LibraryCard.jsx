import React from 'react';

function LibraryCard({ item, onClick, onRemove }) {
  return (
    <div className="library-card" onClick={onClick}>
      <div className="card-header">
        <span className="card-type">{item.type}</span>
        <button className="card-remove-btn" onClick={onRemove}>
          ×
        </button>
      </div>
      <div className="card-title">{item.title}</div>
    </div>
  );
}

export default LibraryCard;
