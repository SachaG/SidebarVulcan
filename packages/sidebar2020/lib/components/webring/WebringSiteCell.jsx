import React from 'react';

const WebringSiteCell = ({ document }) => {
  const { title, url, twitterAvatarUrl } = document;
  return (
    <div className="webring-cell">
      <a href={url} target="_blank" rel="noopener" className="webring-link">
        <span className="webring-avatar avatar-twitter">
          <img src={twitterAvatarUrl} alt={title} />
        </span>
        <h4 className="webring-title">{title}</h4>
      </a>
    </div>
  );
};

export default WebringSiteCell;
