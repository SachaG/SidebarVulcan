import React from 'react';
import { Components, registerComponent, Utils } from 'meteor/vulcan:core';
import Newsletters from '../../modules/newsletters/collection';

const NewsletterCell = ({ variant = 's', loading, document: newsletter }) => {
  const { subject, _id, createdAtFormatted } = newsletter;
  return (
    <div className="newsletter-cell">
      <h5 className="newsletter-cell-date">{createdAtFormatted}</h5>
      <h4 className="newsletter-cell-subject">{Utils.trimWords(subject, 8)}</h4>
    </div>
    // <Components.ModalTrigger
    //   title={`Edit newsletter ${subject}`}
    //   component={<Components.Button className="cell post-cell">{Utils.trimWords(subject, 8)}</Components.Button>}
    // >
    //   <Components.SmartForm collection={Newsletters} documentId={_id} />
    // </Components.ModalTrigger>
  );
};

registerComponent('NewsletterCell', NewsletterCell);

export default NewsletterCell;
