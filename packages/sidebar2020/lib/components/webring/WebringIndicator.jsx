import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { IconWebring } from '../common/Icons.jsx';

const WebringIndicator = ({ post }) => (
  <Components.TooltipTrigger
    trigger={
      <span className="webring-indicator">
      <IconWebring />
    </span>
    }
  >
    <span className="post-status-tooltip">Submitted via the Sidebar webring</span>
  </Components.TooltipTrigger>
);

export default WebringIndicator;

