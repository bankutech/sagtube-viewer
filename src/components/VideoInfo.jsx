import React from 'react';
import AISummarizer from './AISummarizer';

export default function VideoInfo({ videoId, details }) {
  if (!details) {
    return (
      <div className="video-info-section" id="video-details">
        <h2 id="video-title">Loading...</h2>
        <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
    );
  }

  const formatNumber = (num) => parseInt(num || 0).toLocaleString();

  return (
    <div className="video-info-section" id="video-details">
      <div className="video-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <h2 id="video-title">{details.title}</h2>
        <AISummarizer videoId={videoId} />
      </div>
      <div className="video-stats">
        <span id="view-count">{formatNumber(details.viewCount)} views</span> &bull; <span id="like-count">{formatNumber(details.likeCount)} likes</span>
      </div>
      <div className="video-tags" id="video-tags">
        {details.tags?.map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <div className="video-description">
        <h4 className="section-label-small">Description</h4>
        <div id="desc-text" className="desc-text-box">
            {details.description}
        </div>
      </div>
    </div>
  );
}
