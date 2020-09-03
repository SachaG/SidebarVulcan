import React from 'react';
import { Components } from 'meteor/vulcan:core';
import WebringSites from '../../modules/sites/collection.js';
import Users from 'meteor/vulcan:users';
import WebringBannerButton from './WebringBannerButton.jsx';
import PostCell from '../posts/PostCell.jsx';

const WebringSiteCell = (props) => {
  const { variant = 'medium', ...rest } = props;
  if (variant === 'medium') {
    return <WebringSiteCellMedium {...rest} />;
  } else if (variant === 'large') {
    return <WebringSiteCellLarge {...rest} />;
  }
};

const WebringSiteCellMedium = ({ document, currentUser }) => {
  const { title, url, twitterAvatarUrl } = document;
  return (
    <div className="webring-cell webring-cell-medium">
      <a href={url} target="_blank" rel="noopener" className="webring-link">
        <span className="webring-avatar avatar-twitter">
          <img src={twitterAvatarUrl} alt={title} loading="lazy" height="54" width="54" />
        </span>
        <h4 className="webring-title">{title}</h4>
      </a>
      {Users.owns(currentUser, document) && (
        <div className="webring-cell-actions">
          <Components.EditButton collection={WebringSites} documentId={document._id} />
          <WebringBannerButton document={document} />
        </div>
      )}
    </div>
  );
};

const WebringSiteCellLarge = ({ document: webringSite, currentUser }) => {
  const { title, url, twitterAvatarUrl, posts } = webringSite;
  return (
    <div className="webring-cell webring-cell-large">
      <a href={url} target="_blank" rel="noopener" className="webring-link">
        <span className="webring-avatar avatar-twitter">
          <img src={twitterAvatarUrl} alt={title} loading="lazy" height="54" width="54" />
        </span>
        <h4 className="webring-title">{title}</h4>
      </a>
      <div className="webring-posts">
        {posts.map((post) => (
          <WebringSiteCellPost variant="small" document={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

const WebringSiteCellPost = ({ document: post }) => {
  const { title, url, postedAtFormatted } = post;
  return (
    <div className="webring-cell-post">
      <div className="post-date">{postedAtFormatted}</div>
      <h3 className="post-title">
        <a className="post-link" href={url}>
          {title}
        </a>
      </h3>
    </div>
  );
};

export default WebringSiteCell;
