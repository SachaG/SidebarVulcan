import React from 'react';
import ReactMarkdown from 'react-markdown';
import { expandQueryFragments, Components } from 'meteor/vulcan:core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import BlogPostCell from './BlogPostCell.jsx';

const blogPostQuery = `
query blogPostQuery($slug: String){
  blogPost(slug: $slug){
    ...BlogPostFragment
  }
}
`;

const BlogPost = () => {
  const { slug } = useParams();
  const { loading, data = {} } = useQuery(gql(expandQueryFragments(blogPostQuery)), { variables: { slug } });

  if (loading) {
    return <Components.Loading />;
  }
  const { blogPost } = data;
  return <BlogPostCell blogPost={blogPost} variant="large" />;
};

export default BlogPost;
