import { Components, useCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Posts from '../../modules/posts/collection';
import WebringSites from '../../modules/sites/collection';
import PostCell from '../posts/PostCell';
import { useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import WebringSiteCell from '../webring/WebringSiteCell';
import PageLayout from '../common/PageLayout';

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
    <PageLayout
      name="account"
      title="Account"
      action={
        currentUser && (
          <Components.Button
            className="page-heading-action"
            onClick={() => {
              Meteor.logout(() => client.resetStore());
            }}
          >
            Log Out
          </Components.Button>
        )
      }
    >
      {loading ? (
        <Components.Loading />
      ) : currentUser ? (
        <div className="account-contents">
          {currentUser.webringSites && <UserAccountWebringSites currentUser={currentUser} />}
          <UserAccountPostList currentUser={currentUser} />
        </div>
      ) : (
        <p>
          Please <Link to="/log-in?redirect=/account">log in or sign up</Link>.
        </p>
      )}
    </PageLayout>
  );
};

const UserAccountWebringSites = ({ currentUser }) => (
  <div className="webring-list">
    <div className="webring-list-heading">
      <h3>Webring Sites</h3>
    </div>
    <div className="webring-list-contents">
      {currentUser.webringSites.map((document) => (
        <WebringSiteCell document={document} key={document._id} currentUser={currentUser} />
      ))}
    </div>
  </div>
);

const UserAccountPostList = ({ currentUser }) => (
  <div className="post-list">
    <div className="post-list-heading">
      <h3>Submitted Posts</h3>
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
