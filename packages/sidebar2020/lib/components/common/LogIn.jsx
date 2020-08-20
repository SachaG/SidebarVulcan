import { Components, useCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import PageLayout from './PageLayout';

const LogIn = () => {
  const { loading, currentUser } = useCurrentUser();
  const history = useHistory();
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { redirect = '/' } = query;
  return (
    <PageLayout name="log-in" title="Log In Or Sign Up">
      {loading ? (
        <Components.Loading />
      ) : currentUser ? (
        <p>You are already logged in.</p>
      ) : (
        <div>
          <p>Log in or sign up using Twitter</p>
          <Components.AccountsLoginForm
            showSignUpLink={false}
            onSignedInHook={() => {
              history.push(`/log-in/finish/?redirect=${redirect}`);
            }}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default LogIn;
