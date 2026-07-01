import React from 'react';
import ResourceCard from './ResourceCard';

function SRMResources({ resources, apiKey, onWatchNow }) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <section className="srm-resources-section">
      <h2 className="srm-title">SRM Resources</h2>
      {resources.map((subject, index) => (
        <div className="subject-section" key={subject.name || index}>
          <h3 className="subject-name">{subject.name}</h3>
          <div className="resources-grid">
            {subject.items.map((resource, rIndex) => (
              <ResourceCard
                key={resource.id || rIndex}
                resource={resource}
                apiKey={apiKey}
                onWatchNow={onWatchNow}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default SRMResources;
