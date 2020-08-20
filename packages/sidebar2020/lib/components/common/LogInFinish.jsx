import { Components, useCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import PageLayout from './PageLayout';
import Users from 'meteor/vulcan:users';

const LogInFinish = () => {
  const { loading, currentUser } = useCurrentUser();
  const history = useHistory();
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { redirect = '/' } = query;
  if (loading) {
    return <Components.Loading />;
  } else if (!currentUser) {
    history.push('/log-in');
    return null;
  } else if (currentUser.email) {
    history.push(redirect);
    return null;
  } else {
    return (
      <PageLayout name="log-in-finish" title="Complete Your Profile">
        <Components.SmartForm
          collection={Users}
          documentId={currentUser._id}
          showDelete={false}
          prefilledProps={{ emailIsRequired: true, email: null }}
          successCallback={() => {
            history.push(redirect);
          }}
        />
      </PageLayout>
    );
  }
};

export default LogInFinish;
