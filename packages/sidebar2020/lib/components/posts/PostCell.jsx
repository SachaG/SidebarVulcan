import React from 'react';
import { Components, registerComponent, Utils, useCurrentUser } from 'meteor/vulcan:core';
import Posts from '../../modules/posts/collection';
import CategoryCell from '../categories/CategoryCell';
import ReactPlaceholder from 'react-placeholder';
import { Link } from 'react-router-dom';
import PostCredit from './PostCredit';
import { LinkContainer } from 'react-router-bootstrap';
import PostEditButton from './PostEditButton';
import PostStatusIndicator from './PostStatusIndicator';
import Users from 'meteor/vulcan:users';
import { postStatus } from '../../modules/data';
import PostInvoice from './PostInvoice';
import {
  DomainPlaceholder,
  TitlePlaceholder,
  BodyPlaceholder,
  AvatarPlaceholder,
  CategoriesPlaceholder,
} from '../common/Placeholders.jsx';

const hasPendingCheckout = (post) => post.isSponsored && !post.paidAt;

const PostCell = ({ variant = 'small', ...rest }) =>
  variant === 'small' ? (
    <PostCellSmall {...rest} />
  ) : variant === 'medium' ? (
    <PostCellMedium {...rest} />
  ) : (
    <PostCellLarge {...rest} />
  );

registerComponent('PostCell', PostCell);

const PostCellSmall = ({ document: post }) => {
  const { title, domain, _id } = post;
  return (
    <Components.ModalTrigger
      title={`Edit post ${title}`}
      component={
        <div className="cell post-cell post-cell-small">
          <div className="post-domain">{domain}</div>
          <div className="post-title">{Utils.trimWords(title, 8)}</div>
        </div>
      }
    >
      <Components.SmartForm collection={Posts} documentId={_id} />
    </Components.ModalTrigger>
  );
};

const PostCellMedium = ({
  document: post,
  index,
  showLoadingAnimation = false,
  loading = false,
  showPlaceholders = false,
  showDate = true,
  showFinishCheckout = false,
  showEdit = false,
  showStatus = false,
  showActions = false,
  showWebring = false,
}) => {
  if (!post) {
    return <p>No post found.</p>;
  }
  if (loading) {
    return <PostCellMediumLoading />;
  }
  const {
    _id,
    postedAtFormatted,
    scheduledAtFormatted,
    paidAt,
    title,
    domain,
    htmlBody,
    categories,
    urlRedirect,
    isSponsored,
    webringSite,
  } = post;

  const date = postedAtFormatted || scheduledAtFormatted;

  return (
    <div className={`post-cell post-cell-medium ${index === 1 && 'post-cell-first'}`}>
      {index && <div className="post-index">{index}</div>}
      <div className="post-content">
        <div className="post-subheading">
          {showWebring && (
            <h4 className="post-webringsite">
              <PostCredit post={post} />
              <span>{webringSite.title}</span>
            </h4>
          )}

          {showDate && date && (
            <div className="post-date">
              <Link to={`/date/${date.replace(new RegExp('/', 'g'), '-')}`}>{date}</Link>
            </div>
          )}

          {domain && (
            <h4 className="post-domain">
              <Link to={`/domain/${domain}`}>{domain}</Link>
            </h4>
          )}
        </div>

        <h3 className="post-title">
          <a className="post-link" href={urlRedirect}>
            {title}
          </a>
          {isSponsored && (
            <Link to="/sponsor" className="post-sponsored">
              Sponsored
            </Link>
          )}
        </h3>

        <div className="post-body-container">
          <div className="post-body" dangerouslySetInnerHTML={{ __html: htmlBody }} />
        </div>
        {!showWebring && <div className="post-footer">
          <PostCredit post={post} />
          <div className="post-categories">
            {categories &&
              categories.map((category) => <CategoryCell key={category._id} variant="small" document={category} />)}
          </div>
        </div>}
        {showActions && (
          <div className="post-actions">
            {showEdit && <PostEditButton post={post} />}
            {showFinishCheckout && hasPendingCheckout(post) && (
              <LinkContainer className="post-finish-checkout" to={`/sponsor/checkout/${_id}`}>
                <Components.Button size="sm" variant="secondary">
                  Finish Checkout
                </Components.Button>
              </LinkContainer>
            )}
            {paidAt && (
              <Components.ModalTrigger
                title="Sponsored Link Invoice"
                component={
                  <Components.Button className="post-view-invoice" size="sm" variant="secondary">
                    View Invoice
                  </Components.Button>
                }
              >
                <PostInvoice post={post} />
              </Components.ModalTrigger>
            )}
          </div>
        )}
      </div>
      {showStatus && [postStatus.published, postStatus.scheduled].includes(post.status) && (
        <div className="post-status">
          <PostStatusIndicator post={post} />
        </div>
      )}
    </div>
  );
};

const PostCellMediumLoading = ({ index }) => (
  <div className="post-cell post-cell-medium post-cell-medium-loading">
    {index && <div className="post-index">{index}</div>}
    <div className="post-content">
      <DomainPlaceholder className="post-domain" />
      <TitlePlaceholder className="post-title" />
      <div className="post-body-container">
        <BodyPlaceholder />
      </div>
      <div className="post-footer">
        <AvatarPlaceholder className="post-credit" />
        <CategoriesPlaceholder className="post-categories" />
      </div>
    </div>
  </div>
);

const PostCellLarge = ({ document: post }) => {
  const { title } = post;
  return <div>{title}</div>;
};

export default PostCell;
