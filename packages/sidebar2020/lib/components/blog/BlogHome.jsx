import React from 'react';
import ReactMarkdown from 'react-markdown';
import { expandQueryFragments, Components } from 'meteor/vulcan:core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BlogPostCell from './BlogPostCell.jsx';
import PageLayout from '../common/PageLayout';

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
    <PageLayout name="bloghome" title="Sidebar Blog" description="The latest articles from the Sidebar blog.">
      {blogPosts.map((blogPost) => (
        <BlogPostCell key={blogPost.slug} blogPost={blogPost} variant="medium" />
      ))}
    </PageLayout>
  );
};

export default BlogPost;
