import React from 'react';
import { Link } from 'react-router-dom';
import { getSetting } from 'meteor/vulcan:core';

const footer = [
  { name: 'About', to: '/about' },
  { name: 'Leaderboard', to: '/leaderboard' },
  { name: 'Webring', to: '/webring' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Contact', href: 'mailto:hi@sidebar.io' },
  { name: 'Twitter', href: 'https://twitter.com/sidebario', rel: 'me' },
  { name: 'Facebook', href: 'https://www.facebook.com/SidebarIO' },
  { name: 'RSS', href: 'https://sidebar.io/feed.xml' },
  { name: 'REST API', href: 'https://sidebar.io/api' },
  { name: 'GraphQL', href: 'https://sidebar.io/graphql' },
  { name: 'GitHub', href: 'https://github.com/SachaG/SidebarVulcan/' },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      {footer.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}{' '}
      <div className="nav-item">
        Hosted on{' '}
        <a href={getSetting('hostingLink')} target="_blank" rel="noopener noreferrer">
          {getSetting('hosting')}
        </a>
      </div>
    </div>
  </footer>
);

const NavItem = ({ item }) => {
  const { name, to, href, rel = '' } = item;
  return to ? (
    <Link to={to} className="nav-item">
      {name}
    </Link>
  ) : (
    // eslint-disable-next-line
    <a href={href} className="nav-item" target="_blank" rel={`${rel} noopener noreferrer`}>
      {name}
    </a>
  );
};

export default Footer;
