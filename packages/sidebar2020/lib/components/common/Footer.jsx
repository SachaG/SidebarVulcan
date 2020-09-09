import React from 'react';
import { Link } from 'react-router-dom';
import { getSetting } from 'meteor/vulcan:core';

const HostingLink = () => (
  <div className="nav-item footer-nav-item">
    Hosted on{' '}
    <a href={getSetting('hostingLink')} target="_blank" rel="noopener noreferrer">
      {getSetting('hosting')}
    </a>
  </div>
);

const Mentions = () => <div className="nav-item footer-nav-item">&copy; Sidebar 2012-2020</div>;

const footer = [
  {
    title: 'foo',
    items: [
      { name: 'Archives', to: '/archives' },
      { name: 'Categories', to: '/categories' },
      { name: 'Leaderboard', to: '/leaderboard' },
      { name: 'Sponsor', to: '/sponsor' },
      { name: 'Submit', to: '/submit' },
    ],
  },
  {
    title: 'foo',
    items: [
      { name: 'About', to: '/about' },
      { name: 'Webring', to: '/webring' },
      { name: 'Blog', to: '/blog' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Contact', href: 'mailto:hi@sidebar.io' },
    ],
  },
  // {
  //   title: 'foo',
  //   items: [
  //     { name: 'Twitter', href: 'https://twitter.com/sidebario', rel: 'me' },
  //     { name: 'Facebook', href: 'https://www.facebook.com/SidebarIO' },
  //     { name: 'RSS', href: 'https://sidebar.io/feed.xml' },
  //   ],
  // },
  {
    title: 'foo',
    items: [
      { name: 'RSS', href: 'https://sidebar.io/feed.xml' },
      { name: 'REST API', href: 'https://sidebar.io/api' },
      { name: 'GraphQL', href: 'https://sidebar.io/graphql' },
      { name: 'GitHub', href: 'https://github.com/SachaG/SidebarVulcan/' },
      {
        name: 'hosting',
        component: HostingLink,
      },
    ],
  },
  {
    title: 'foo',
    items: [
      {
        name: 'copy',
        component: Mentions,
      },
    ],
  },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      {footer.map((column, i) => (
        <FooterColumn column={column} key={i} />
      ))}
    </div>
  </footer>
);

const FooterColumn = ({ column }) => {
  const { title, items } = column;
  return (
    <div className="footer-column">
      {/* <h3 className="footer-column-title">{title}</h3> */}
      <div className="footer-column-items">
        {items.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

const NavItem = ({ item }) => {
  const { name, to, href, rel = '', component: Component } = item;
  return Component ? (
    <Component />
  ) : to ? (
    <Link to={to} className="nav-item footer-nav-item">
      {name}
    </Link>
  ) : (
    // eslint-disable-next-line
    <a href={href} className="nav-item footer-nav-item" target="_blank" rel={`${rel} noopener noreferrer`}>
      {name}
    </a>
  );
};

export default Footer;
