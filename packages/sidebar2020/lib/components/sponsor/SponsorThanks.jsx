import React from 'react';
import { Components } from 'meteor/vulcan:core';
import ReactMarkdown from 'react-markdown';
import { LinkContainer } from 'react-router-bootstrap';

const contents = `
Thanks, your payment has been processed and your sponsored link is now scheduled. You can review and edit your information by accessing your account page.

For any questions, please email [sponsor@sidebar.io](mailto:sponsor@sidebar.io).
`;

const SponsorThanks = () => (
  <div>
    <h2>Thanks!</h2>
    <div>
      <ReactMarkdown source={contents} />
    </div>
    <div>
      <LinkContainer to="/account">
        <Components.Button>My Account →</Components.Button>
      </LinkContainer>
    </div>
  </div>
);

export default SponsorThanks;
