import React, { useState } from 'react';
import { Components } from 'meteor/vulcan:core';
// import WebringBanner from './WebringBanner.jsx';

const getBannerCode = (code, color) =>
  `<object type="image/svg+xml" data="${Meteor.absoluteUrl()}webring/banner/${code}.svg${
    color ? `?color=${color}` : ''
  }" height="60" width="225"/>`;

const WebringBannerButton = ({ document }) => (
  <Components.ModalTrigger label="Get Banner" title={`SVG Webring Banner for ${document.title}`}>
    <WebringBannerForm document={document} />
  </Components.ModalTrigger>
);

export const WebringBannerForm = ({ document }) => {
  const [color, setColor] = useState('f36c3d');
  const bannerCode = getBannerCode(document.code, color);

  return (
    <div>
      <h3>Color</h3>
      <Components.FormComponentDefault
        inputProperties={{
          value: color,
          onChange: (e) => setColor(e.target.value),
        }}
      />
      <p>
        Enter a hexadecimal code without the “#”. Defaults to <code>#f36c3d</code>;
      </p>
      <h3>Preview</h3>
      <p dangerouslySetInnerHTML={{ __html: bannerCode }} />
      <h3>Code</h3>
      <p>
        Paste this code anywhere on your site. Note: make sure you use an <code>object</code> tag to embed the SVG in
        order to enable links.
      </p>
      <Components.FormComponentTextarea
        inputProperties={{
          value: bannerCode,
        }}
      />
    </div>
  );
};
export default WebringBannerButton;
