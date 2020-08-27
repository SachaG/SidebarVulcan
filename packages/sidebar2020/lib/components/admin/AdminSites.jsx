import React, { useState } from 'react';
import { Components, useUpdate2 } from 'meteor/vulcan:core';
import WebringSites from '../../modules/sites/collection.js';
import { webringStatus, webringStatusReverse } from '../../modules/data.js';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Status = ({ document }) => (
  <div>
    <span className={`status-indicator status-indicator-${webringStatusReverse[document.status]}`}>
      {webringStatusReverse[document.status]}
    </span>
  </div>
);

const Actions = ({ document: webringSite }) => {
  const [updateSite, { called, loading }] = useUpdate2({
    collectionName: 'WebringSites',
    fragmentName: 'WebringSiteFragment',
  });

  const input = {
    id: webringSite._id,
    data: {},
  };

  const approveSite = async () => {
    input.data.status = webringStatus.approved;
    await updateSite({ input });
  };
  const rejectSite = async () => {
    input.data.status = webringStatus.rejected;
    await updateSite({ input });
  };

  if (webringSite.status !== webringStatus.pending) {
    return null;
  }

  return (
    <SplitButton
      id="dropdown-split-variants-actions"
      variant="primary"
      className="actions-button"
      title={
        <span className={`actions-button-inner ${loading && 'actions-button-loading'}`}>
          <span className="actions-button-label">Approve</span>
          <span className="actions-button-spinner">{loading && <Components.Loading />}</span>
        </span>
      }
      onClick={approveSite}
    >
      <Dropdown.Item eventKey="1" onClick={rejectSite}>
        Reject
      </Dropdown.Item>
    </SplitButton>
  );
};
const AdminSites = () => (
  <div className="admin-users">
    <Components.Datatable
      collection={WebringSites}
      options={{
        fragmentName: 'WebringSiteFragment',
      }}
      columns={[
        'title',
        'url',
        'feedUrl',
        { name: 'status', component: Status },
        { name: 'actions', component: Actions },
      ]}
    />
  </div>
);

export default AdminSites;
