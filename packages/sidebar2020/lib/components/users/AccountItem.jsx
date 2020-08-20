import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';

const AccountItem = ({ currentUser }) => (
  <Link to="/account" className="nav-item nav-item-account">
    <Components.Avatar user={currentUser} link={false} />
    {/* <span>Account</span> */}
  </Link>
);

export default AccountItem;