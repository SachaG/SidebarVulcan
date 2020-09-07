import React from 'react';
import ReactMarkdown from 'react-markdown';
import { expandQueryFragments, Components, Utils } from 'meteor/vulcan:core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BlogPostCell from './BlogPostCell.jsx';

const blogPostsQuery = `
query blogPostsQuery{
  blogPosts{
    ...BlogPostFragment
  }
}
`;

const BlogPost = () => {
  const { loading, data = {} } = useQuery(gql(expandQueryFragments(blogPostsQuery)));

  if (loading) {
    return <Components.Loading />;
  }
  const { blogPosts } = data;
  return (
    <div className="bloghome-page">
      <Components.HeadTags
        title={`Sidebar | Blog`}
        description="The latest articles from the Sidebar blog."
        url={Utils.getSiteUrl() + '/blog'}
      />
      <div className="blogpost-list">
        {blogPosts.map((blogPost) => (
          <BlogPostCell key={blogPost.slug} blogPost={blogPost} variant="medium" />
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
