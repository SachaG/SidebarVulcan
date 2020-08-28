import React from 'react';
import { Components } from 'meteor/vulcan:core';
import WebringSites from '../../modules/sites/collection.js';
import Users from 'meteor/vulcan:users';

const WebringSiteCell = ({ document, currentUser }) => {
  const { title, url, twitterAvatarUrl } = document;
  return (
    <div className="webring-cell">
      <a href={url} target="_blank" rel="noopener" className="webring-link">
        <span className="webring-avatar avatar-twitter">
          <img src={twitterAvatarUrl} alt={title} loading="lazy" height="54" width="54"/>
        </span>
        <h4 className="webring-title">{title}</h4>
      </a>
      {Users.owns(currentUser, document) && (
        <Components.EditButton collection={WebringSites} documentId={document._id} />
      )}
    </div>
  );
};

export default WebringSiteCell;
