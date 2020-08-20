import React from 'react';
import { Components } from 'meteor/vulcan:lib';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../modules/helpers.js';
import PostCell from '../posts/PostCell';
import JobCell from '../jobs/JobCell';

const StripeId = ({ document }) => (
  <a href={document.stripeChargeUrl} target="_blank" rel="noopener noreferrer">
    {document.stripeId}
  </a>
);

const ChargeAmount = ({ document: charge }) => <div>{formatMoney(charge.amount/100)}</div>;

const AssociatedDocument = ({ document: charge }) => {
  const { associatedDocument } = charge;
  if (!associatedDocument) {
    return null;
  }
  switch (associatedDocument.__typename) {
    case 'Post':
      return <PostCell variant="small" document={associatedDocument} />;
    case 'Job':
      return <JobCell variant="small" document={associatedDocument} />;
    default:
      return null;
  }
};

const AdminCharges = (props) => (
  <div className="charges">
    <Components.Datatable
      showSearch={false}
      showEdit={false}
      showNew={false}
      collectionName="Charges"
      options={{
        fragmentName: 'ChargeFragment',
      }}
      columns={[
        '_id',
        {
          name: 'createdAt',
          sortable: true,
        },
        'user',
        { name: 'Amount', component: ChargeAmount },
        'type',
        { name: 'Document', component: AssociatedDocument },
        // 'source',
        // 'productKey',
        // 'test',
        {
          name: 'stripeId',
          component: StripeId,
        },
      ]}
      initialState={{
        sort: {
          createdAt: 'desc',
        },
        limit: 5
      }}
    />
  </div>
);

export default AdminCharges;
