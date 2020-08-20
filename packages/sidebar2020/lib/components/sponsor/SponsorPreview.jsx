import React from 'react';
import PostCell from '../posts/PostCell';
import PostEditButton from '../posts/PostEditButton';
import isEmpty from 'lodash/isEmpty';

const SponsorPreview = ({ showEdit = false, document, ...rest }) => {
  const { isSponsored, ...restOfDocument } = document;
  return (
    <div className="sponsor-preview">
      <div className="sponsor-preview-heading">
        <h3>Preview</h3>
        {showEdit && <PostEditButton post={document} />}
      </div>
      <div className="sponsor-preview-contents">
        <PostCell document={document} {...rest} variant="medium" loading={isEmpty(restOfDocument)} />
      </div>
    </div>
  );
};

export default SponsorPreview;
