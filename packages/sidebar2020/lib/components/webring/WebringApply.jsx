import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import Sites from '../../modules/sites/collection';
import { Link, useHistory } from 'react-router-dom';
import PageLayout from '../common/PageLayout';
import ReactMarkdown from 'react-markdown';

const contents = `Apply to join the Sidebar Webring by giving us some information about your site. You will be notified by email if your submission is approved. 

#### Who Can Apply?

Anybody can apply, but sites that meet the following criteria have a higher chance of being accepted:

- You're a **personal & independent blog** with a single writer and voice (as opposed to company or corporate blogs).
- Your site has a nice, well-crafted design and layout. 
- You don't publish more than once a day (to avoid flooding the feed).
- You've had pieces of content featured in Sidebar before.
- You write mainly about design.
- You are willing to show a small webring banner somewhere on your site (coming soon).

If you hear nothing back for a week or so, please consider that your application wasn't accepted this time :( Also note that you can submit multiple sites if you'd like. 
`;

const WebringApply = () => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  return (
    <PageLayout name="webring-apply" title="Join the Sidebar Webring">
      <ReactMarkdown>{contents}</ReactMarkdown>
      {currentUser ? (
        <Components.SmartForm
          collection={Sites}
          successCallback={() => {
            history.push(`/webring/thanks`);
          }}
        />
      ) : (
        <p>
          Please <Link to="/log-in?redirect=/webring/apply">log in or sign up</Link> first.
        </p>
      )}
    </PageLayout>
  );
};

export default WebringApply;
