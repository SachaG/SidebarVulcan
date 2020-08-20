import { Components, useCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Posts from '../../modules/posts/collection';
import PostCell from '../posts/PostCell';
import { useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const PaginatedListItem = ({ document }) => (
  <PostCell
    document={document}
    variant="medium"
    showStatus={true}
    showActions={true}
    showEdit={true}
    showFinishCheckout={true}
    key={document._id}
  />
);

const UserAccount = () => {
  const client = useApolloClient();
  const { loading, currentUser } = useCurrentUser();

  return (
    <div className="page accounts-page">
      <div className="page-heading">
        <h2 className="page-heading-title">Account</h2>
        {currentUser && (
          <Components.Button
            className="page-heading-action"
            onClick={() => {
              Meteor.logout(() => client.resetStore());
            }}
          >
            Log Out
          </Components.Button>
        )}
      </div>
      {loading ? (
        <Components.Loading />
      ) : currentUser ? (
        <UserAccountPostList currentUser={currentUser} />
      ) : (
        <p>
          Please <Link to="/log-in?redirect=/account">log in or sign up</Link>.
        </p>
      )}
    </div>
  );
};

const UserAccountPostList = ({ currentUser }) => (
  <div className="post-list">
    <div className="post-list-heading">
      <h2>Submitted Posts</h2>
    </div>
    <Components.PaginatedList
      className="post-list-contents"
      components={{
        PaginatedListItem,
      }}
      options={{
        collection: Posts,
        fragmentName: 'PostFragment',
        input: { filter: { userId: { _eq: currentUser._id } } },
      }}
    />
  </div>
);

export default UserAccount;
