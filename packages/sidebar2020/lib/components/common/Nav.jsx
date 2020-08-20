import React from 'react';
import { useCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';
import AccountItem from '../users/AccountItem';

const nav = [
  { name: 'Categories', to: '/categories' },
  {
    name: 'Sponsor',
    to: '/sponsor',
  },
  // {
  //   name: 'Jobs',
  //   to: '/jobs',
  // },
  {
    name: 'Submit',
    to: '/submit',
  },
];

const Nav = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="nav">
      {nav.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
      {currentUser && Users.isAdmin(currentUser) && <NavItem item={{ name: 'Admin', to: '/admin/posts' }} />}
      {currentUser ? <AccountItem currentUser={currentUser} /> : <NavItem item={{ name: 'Log-in', to: '/log-in' }} />}
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


export default Nav;
