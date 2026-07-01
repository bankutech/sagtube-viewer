import React from 'react';

function Navbar({ urlValue, onUrlChange, onLoad, loading, theme, onToggleTheme }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onLoad();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>SagTube</span>
          <span>Viewer</span>
        </div>

        <div className="input-container-small">
          <input
            type="text"
            value={urlValue}
            onChange={(e) => onUrlChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste YouTube Video or Playlist URL..."
          />
          <button className="watch-btn" onClick={onLoad} disabled={loading}>
            {loading ? '...' : 'Load'}
          </button>
        </div>

        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
