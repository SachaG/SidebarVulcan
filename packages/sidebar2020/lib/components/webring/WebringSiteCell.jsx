import React from 'react';
import { Components } from 'meteor/vulcan:core';
import WebringSites from '../../modules/sites/collection.js';
import Users from 'meteor/vulcan:users';

const getBannerCode = (code) =>
  `<object type="image/svg+xml" data="https://sidebar.io/webring/banner/${code}.svg" height="60" width="225"/>`;

const WebringSiteCell = ({ document, currentUser }) => {
  const { title, url, twitterAvatarUrl } = document;
  return (
    <div className="webring-cell">
      <a href={url} target="_blank" rel="noopener" className="webring-link">
        <span className="webring-avatar avatar-twitter">
          <img src={twitterAvatarUrl} alt={title} loading="lazy" height="54" width="54" />
        </span>
        <h4 className="webring-title">{title}</h4>
      </a>
      {Users.owns(currentUser, document) && (
        <div className="webring-cell-actions">
          <Components.EditButton collection={WebringSites} documentId={document._id} />
          <Components.ModalTrigger label="Get Banner" title="SVG Banner Code">
            <div>
              <p>
                Note: make sure you use an <code>object</code> tag to embed the SVG in order to enable links.
              </p>
              <textarea style={{ width: '100%', height: '100px', padding: '10px' }}>{getBannerCode(document.code)}</textarea>
            </div>
          </Components.ModalTrigger>
        </div>
      )}
    </div>
  );
};

export default WebringSiteCell;
