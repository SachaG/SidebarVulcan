import React from 'react';
import { Link } from 'react-router-dom';
import AccountItem from '../users/AccountItem';
import { useCurrentUser, getSetting } from 'meteor/vulcan:core';

const nav = [
  // { name: 'Dashboard', to: '/admin/dashboard' },
  { name: 'Users', to: '/admin/users' },
  { name: 'Posts', to: '/admin/posts' },
  { name: 'Categories', to: '/admin/categories' },
  { name: 'Newsletters', to: '/admin/newsletters' },
  { name: 'Jobs', to: '/admin/jobs' },
  { name: 'Discounts', to: '/admin/discounts' },
  { name: 'Charges', to: '/admin/charges' },
];

if (Meteor.isDevelopment && getSetting('environment') === 'development') {
  nav.push({ name: 'Emails', to: '/admin/emails' });
  nav.push({ name: 'Database', to: '/admin/database' });
}

const AdminNav = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="nav">
      {nav.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
      <AccountItem currentUser={currentUser} />
    </div>
  );
};

const NavItem = ({ item }) => {
  const { name, to } = item;
  return (
    <Link to={to} className="nav-item">
      {name}
    </Link>
  );
};

export default AdminNav;
