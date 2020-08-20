import React from 'react';
import { Components } from 'meteor/vulcan:core';
import Discounts from '../../modules/discounts/collection.js';

const AdminDiscounts = () => (
  <div className="admin-discounts">
    <Components.Datatable
      collection={Discounts}
      options={
        {
          fragmentName: 'DiscountFragment',
        }
      }
      showNew={true}
      showEdit={true}
      newFormOptions={
        {
          queryFragmentName: 'DiscountFragment',
        }
      }
      editFormOptions={
        {
          queryFragmentName: 'DiscountFragment',
        }
      }
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/log-in',
};

export default AdminDiscounts;
