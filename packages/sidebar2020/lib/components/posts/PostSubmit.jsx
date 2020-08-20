import React from 'react';
import { Components, useCurrentUser } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import { Link, useHistory } from 'react-router-dom';
import PageLayout from '../common/PageLayout';

const PostSubmit = () => {
  const history = useHistory();
  const { currentUser } = useCurrentUser();
  return (
    <PageLayout name="post-submit" title="Submit a Link">
      {currentUser ? (
        <Components.SmartForm
          collection={Posts}
          fields={['url', 'title', 'credit', 'body', 'categoriesIds']}
          successCallback={() => {
            history.push(`/submit/thanks`);
          }}
        />
      ) : (
        <p>
          Please <Link to="/log-in?redirect=/submit">log in or sign up</Link> first.
        </p>
      )}
    </PageLayout>
  );
};

export default PostSubmit;
