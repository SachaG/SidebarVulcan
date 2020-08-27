import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import Sites from '../../modules/sites/collection';
import { Link, useHistory } from 'react-router-dom';
import PageLayout from '../common/PageLayout';

const WebringApply = () => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  return (
    <PageLayout name="webring-apply" title="Join the Sidebar Webring">
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
