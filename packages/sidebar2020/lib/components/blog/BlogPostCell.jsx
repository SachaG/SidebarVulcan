import React from 'react';
import ReactMarkdown from 'react-markdown';
import PageLayout from '../common/PageLayout';

const BlogPostCell = ({ variant = 'small', ...rest }) =>
  variant === 'small' ? (
    <BlogPostCellMedium {...rest} />
  ) : variant === 'medium' ? (
    <BlogPostCellMedium {...rest} />
  ) : (
    <BlogPostCellLarge {...rest} />
  );

const BlogPostCellMedium = ({ blogPost }) => {
  const { slug, title, excerpt, body, postedAtFormatted } = blogPost;
  return (
    <div>
      <h3>{postedAtFormatted}</h3>
      <p>{excerpt}</p>
    </div>
  );
};

const BlogPostCellLarge = ({ blogPost }) => {
  const { slug, title, excerpt, body, postedAtFormatted } = blogPost;
  return (
    <PageLayout name={slug} title={title} description={excerpt}>
      <div>
        <h3>{postedAtFormatted}</h3>
        <ReactMarkdown source={body} escapeHtml={false} />
      </div>
    </PageLayout>
  );
};

export default BlogPostCell;
