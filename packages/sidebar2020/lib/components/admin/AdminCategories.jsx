import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import Categories from '../../modules/categories/collection.js';

const AdminCategories = () => (
  <div className="admin-categories">
    <Components.Datatable
      collection={Categories}
      columns={['name']}
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

registerComponent('AdminCategories', AdminCategories, [withAccess, accessOptions]);

export default withAccess(accessOptions)(AdminCategories);
