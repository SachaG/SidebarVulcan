/*

Show a list of all bookings

http://docs.vulcanjs.org/core-components.html#Datatable

*/

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess, withMessages } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Users from 'meteor/vulcan:users';

const AdminUsers = () => (
  <div className="admin-users">
    <Components.Datatable
      collection={Users}
      options={
        {
          // fragmentName: 'PostFragment',
        }
      }
      showNew={true}
      showEdit={true}
      newFormOptions={
        {
          // queryFragmentName: 'PostFragment',
        }
      }
      editFormOptions={
        {
          // queryFragmentName: 'PostFragment',
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

registerComponent('AdminUsers', AdminUsers);

export default AdminUsers;
