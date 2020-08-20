import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';

const defaultFields = ['url', 'title', 'credit', 'body', 'categoriesIds'];

const PostEditButton = ({ post, fields = defaultFields }) => (
  <Components.EditButton
    collection={Posts}
    documentId={post && post._id}
    fields={fields}
    size="sm"
    variant="secondary"
    modalProps={{
      title: `Edit “${post && post.title}”`,
    }}
    formProps={{
      queryFragmentName: 'PostFragment',
      mutationFragmentName: 'PostFragment',
    }}
  />
);

export default PostEditButton;
