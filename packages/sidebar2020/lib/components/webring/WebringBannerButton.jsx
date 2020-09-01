import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { defaultBannerColor } from './WebringBanner.jsx';

const getBannerCode = (code) =>
  `<object type="image/svg+xml" data="${Meteor.absoluteUrl()}webring/banner/${code}.svg" height="60" width="225"/>`;

const WebringBannerButton = ({ document }) => (
  <Components.ModalTrigger label="Get Banner" title="SVG Webring Banner">
    <div>
      <h3>Site</h3>
      <p>
        <code>{document.url}</code>
      </p>
      <h3>Preview</h3>
      <div dangerouslySetInnerHTML={{ __html: getBannerCode(document.code) }} />
      <p>
        Color: <code>{document.color || defaultBannerColor}</code>. You can change the banner color by editing your
        webring site details.
      </p>
      <h3>Code</h3>
      <p>
        Paste this code anywhere on your site. Note: make sure you use an <code>object</code> tag to embed the SVG in
        order to enable links.
      </p>
      <textarea style={{ width: '100%', height: '100px', padding: '10px' }}>{getBannerCode(document.code)}</textarea>
    </div>
  </Components.ModalTrigger>
);

export default WebringBannerButton;
