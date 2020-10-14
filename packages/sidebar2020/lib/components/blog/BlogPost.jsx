import React from 'react';
import ReactMarkdown from 'react-markdown';
import { expandQueryFragments, Components, Utils } from 'meteor/vulcan:core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import BlogPostCell from './BlogPostCell.jsx';
import { Link } from 'react-router-dom';

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

  if (!blogPost) {
    return (
      <div>
        <Components.Error404 />
      </div>
    );
    
  }
  const { title, excerpt, image } = blogPost;
  return (
    <div className="blogpost-page">
      <Components.HeadTags
        title={`Sidebar | ${title}`}
        description={excerpt}
        url={Utils.getSiteUrl(false) + '/blog/' + slug}
        image={Utils.getSiteUrl(false) + image}
      />
      <div className="blog-archives-link">
        <Link to="/blog">← Back to blog archives</Link>
      </div>
      {image && (
        <div className="blogpost-image">
          <img src={image} />
        </div>
      )}
      <div className="blogpost-page-inner">
        <BlogPostCell blogPost={blogPost} variant="large" />
      </div>
    </div>
  );
};

export default BlogPost;
