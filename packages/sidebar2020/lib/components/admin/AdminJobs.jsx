import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess, withMessages } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Jobs from '../../modules/jobs/collection.js';

const AdminJobs = () => (
  <div className="admin-jobs">
    <Components.Datatable
      collection={Jobs}
      options={
        {
          fragmentName: 'JobFragment',
        }
      }
      showNew={true}
      showEdit={true}
      newFormOptions={
        {
          queryFragmentName: 'JobFragment',
        }
      }
      editFormOptions={
        {
          queryFragmentName: 'JobFragment',
          // addFields: ['clickCount'],
        }
      }
      // components={{
      //   CardItemDate,
      // }}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

registerComponent('AdminJobs', AdminJobs);

export default AdminJobs;
