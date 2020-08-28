import React from 'react';
import { Link } from 'react-router-dom';
import AccountItem from '../users/AccountItem';
import { useCurrentUser } from 'meteor/vulcan:core';
import { adminNav } from '../../modules/data.js';

const AdminNav = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="nav">
      {adminNav.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
      <AccountItem currentUser={currentUser} />
    </div>
  );
};

const NavItem = ({ item }) => {
  const { name, path } = item;
  return (
    <Link to={path} className="nav-item">
      {name}
    </Link>
  );
};

export default AdminNav;
