import React from "react";
import { useCurrentUser } from "meteor/vulcan:core";
import { Link } from "react-router-dom";
import Users from "meteor/vulcan:users";
import AccountItem from "../users/AccountItem";

export const sponsorLink =
  "https://uxdesigncc.medium.com/sponsor-sidebar-io-d511b6cf032b";

const nav = [
  // { name: 'Categories', to: '/categories' },
  {
    name: "Sponsor",
    to: sponsorLink,
  },
  // {
  //   name: 'Jobs',
  //   to: '/jobs',
  // },
  {
    name: "Submit a Link",
    to: "/submit",
  },
];

const Nav = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="nav">
      {nav.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
      {currentUser && Users.isAdmin(currentUser) && (
        <NavItem item={{ name: "Admin", to: "/admin/posts" }} />
      )}
      {currentUser ? (
        <AccountItem currentUser={currentUser} />
      ) : (
        <NavItem item={{ name: "Log-in", to: "/log-in" }} />
      )}
    </div>
  );
};

const NavItem = ({ item }) => {
  const { name, to } = item;
  return to.includes("http") ? (
    <a href={to} target="_blank" rel="noreferrer" className="nav-item">
      {name}
    </a>
  ) : (
    <Link to={to} className="nav-item">
      {name}
    </Link>
  );
};

export default Nav;
