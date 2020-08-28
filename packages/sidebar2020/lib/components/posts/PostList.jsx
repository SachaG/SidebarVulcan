import React from 'react';
import { Utils, Components } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import PostCell from './PostCell';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { postStatus } from '../../modules/data';
import merge from 'lodash/merge';
import PageLayout from '../common/PageLayout';

const PaginatedListItem = ({ document }) => <PostCell document={document} variant="medium" key={document._id} />;

const PostList = () => {
  const { domain, categorySlug, categoryId, date } = useParams();
  let input = { filter: { status: { _eq: postStatus.published } }, sort: { postedAt: 'desc' } };

  let heading;
  if (domain) {
    input = merge(input, { filter: { domain: { _eq: domain } } });
    heading = `Domain: ${domain}`;
  } else if (categoryId) {
    input = merge(input, { filter: { categoriesIds: { _contains: categoryId } } });
    heading = `Category: ${Utils.toTitleCase(categorySlug.replaceAll('-', ' '))}`;
  } else if (date) {
    const _gte = new Date(date).setHours(0, 0, 0, 0);
    const _lte = new Date(date).setHours(23, 59, 59, 999);
    input = merge(input, { filter: { postedAt: { _gte, _lte } } });
    heading = `Date: ${date.replace(new RegExp('-', 'g'), '/')}`;
  } else {
    heading = 'Browse Archives';
  }

  // const { loading, results } = useMulti2({ collection: Posts, fragmentName: 'PostFragment', input });
  return (
    <PageLayout
      name="post-list"
      title={heading}
      action={categoryId && <Link to="/categories">All Categories</Link>}
      description="Sidebar link archivess"
    >
      <div className="post-list">
        <Components.PaginatedList
          className="post-list-contents"
          components={{
            PaginatedListItem,
          }}
          options={{
            collection: Posts,
            fragmentName: 'PostFragment',
            input,
          }}
        />
      </div>
    </PageLayout>
  );
};

export default PostList;
