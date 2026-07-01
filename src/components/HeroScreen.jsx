import React from 'react';

function HeroScreen({ children }) {
  return (
    <div className="hero-screen">
      <section className="hero-section">
        <div className="hero-breadcrumbs">SAGTUBE.COM</div>
        <h1 className="hero-title">
          SagTube <span className="hero-title-red">Viewer</span> – Immersive Theater
        </h1>
        <p className="hero-subtitle">
          Paste any YouTube video or playlist URL to start watching in a clean, distraction-free player.
        </p>
      </section>
      {children}
    </div>
  );
}

export default HeroScreen;
