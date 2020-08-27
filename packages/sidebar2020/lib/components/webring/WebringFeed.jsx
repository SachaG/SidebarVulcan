import React from 'react';
import PageLayout from '../common/PageLayout';
import { Components } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import PostCell from '../posts/PostCell';

const PostListItem = ({ document }) => <PostCell document={document} showWebring={true} variant="medium" key={document._id} />;

const WebringFeed = () => {
  
  const input = { filter: { webringSiteId: { _is_null: false } }, sort: { postedAt: 'desc' } };

  return (
    <PageLayout name="webring" title="Webring Feed">
      <div className="webring-feed">
        <div className="post-list">
          <Components.PaginatedList
            className="post-list-contents"
            components={{
              PaginatedListItem: PostListItem,
            }}
            options={{
              collection: Posts,
              fragmentName: 'PostFragment',
              input,
            }}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default WebringFeed;
