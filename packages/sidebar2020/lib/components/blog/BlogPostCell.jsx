import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

const RouterLink = (props) => {
  return props.href.match(/^(https?:)?\/\//) ? (
    <a className="global-link" href={props.href}>
      {props.children}
    </a>
  ) : (
    <Link className="local-link" to={props.href}>
      {props.children}
    </Link>
  );
};

const getProps = ({ src, alt, title }) => ({
  src,
  alt: alt.replace(/\(\d+\)$/, ''),
  title: title,
  height: alt.replace(/.*\((\d+)\)$/, '$1') | 0,
});

const ImageLoader = (props) => {
  const { src, alt, title, height } = getProps(props);
  return (
    <span className="image-wrapper">
      <span className="image-image">
        {/* <LazyLoad height={height || null}>
          <img src={src} alt={alt} />
        </LazyLoad> */}
        <img src={src} alt={alt} style={{ maxHeight: height }} />
      </span>
      <span className="image-description">{title}</span>
    </span>
  );
};

const BlogPostCell = ({ variant = 'small', ...rest }) =>
  variant === 'small' ? (
    <BlogPostCellMedium {...rest} />
  ) : variant === 'medium' ? (
    <BlogPostCellMedium {...rest} />
  ) : (
    <BlogPostCellLarge {...rest} />
  );

const BlogPostCellMedium = ({ blogPost }) => {
  const { slug, title, excerpt, body, postedAtFormatted, pagePath } = blogPost;
  return (
    <div className="blogpost-cell blogpost-cell-medium">
      <div className="blogpost-date">{postedAtFormatted}</div>
      <h3 className="blogpost-title blogpost-title-link">
        <Link to={pagePath}>{title}</Link>
      </h3>
      <p className="blogpost-excerpt">{excerpt}</p>
    </div>
  );
};

const BlogPostCellLarge = ({ blogPost }) => {
  const { slug, title, excerpt, body, postedAtFormatted, user, image } = blogPost;
  const { avatarUrl, twitterScreenName, displayName } = user;
  return (
    <div className="blogpost-cell blogpost-cell-large">
      <div className="blogpost-meta">
        <div className="blogpost-meta-inner">
          <div className="blogpost-date">{postedAtFormatted}</div>
          <a
            className="blogpost-credit"
            href={`https://twitter.com/${twitterScreenName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="blogpost-twitter avatar-twitter">
              <img src={avatarUrl} alt={twitterScreenName} />
            </span>
            <span className="blogpost-name">{displayName}</span>
          </a>
        </div>
      </div>

      <div className="blogpost-main">
        <div className="blogpost-contents">
          <h2 className="blogpost-title">{title}</h2>
          <h3 className="blogpost-excerpt">{excerpt}</h3>
          <div className="blogpost-body">
            <ReactMarkdown escapeHtml={false} renderers={{ link: RouterLink, image: ImageLoader }}>
              {body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCell;
