import React from 'react';
import { postStatusReverse, postStatusOptions } from '../../modules/data.js';
import { Components } from 'meteor/vulcan:core';

const PostStatusIndicator = ({ post }) => (
  <Components.TooltipTrigger
    trigger={
      <span className={`status-indicator status-indicator-${postStatusReverse[post.status]}`}>
        {postStatusReverse[post.status]}
      </span>
    }
  >
    <span className="post-status-tooltip">{postStatusOptions.find((s) => s.value === post.status).description}</span>
  </Components.TooltipTrigger>
);

export default PostStatusIndicator;
