import React from 'react';
import { Components } from 'meteor/vulcan:core';

const PostCredit = ({ post }) => {
  const { credit, twitterAvatarUrl, twitterName, user = {} } = post;
  const { twitterScreenName: userTwitterScreenName, avatarUrl: userAvatarUrl /* displayName: userDisplayName */ } = user;

  const avatarUrl = twitterAvatarUrl || userAvatarUrl;
  const twitterScreenName = credit || userTwitterScreenName;

  return (
    <div className="post-credit">
      <Components.TooltipTrigger
        trigger={
          <a
            className="post-twitter"
            href={`https://twitter.com/${twitterScreenName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={avatarUrl} alt={twitterScreenName} />
          </a>
        }
      >
        <span className="post-twitter-tooltip">
          {credit && credit !== userTwitterScreenName && (
            <span>
              By {twitterName} (
              <a href={`https://twitter.com/${credit}`} target="_blank" rel="noopener noreferrer">
                @{credit}
              </a>
              ),{' '}
            </span>
          )}
          {userTwitterScreenName && (
            <span>
              {credit ? 'submitted' : 'Submitted'} by{' '}
              <a href={`https://twitter.com/${userTwitterScreenName}`} target="_blank" rel="noopener noreferrer">
                @{userTwitterScreenName}
              </a>
            </span>
          )}
        </span>
      </Components.TooltipTrigger>
    </div>
  );
};

export default PostCredit;
