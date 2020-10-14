import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import NewsletterForm from '../newsletters/NewsletterForm';

const WebringLayout = ({ currentUser, children, currentRoute }) => (
  <div className={classNames('wrapper', 'wrapper-blog', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">
    <div className="layout layout-blog">
      <Link className="logo-link blog-logo" to="/">
        <Logo />
      </Link>
      <div className="blog-heading">
        <h2 className="blog-main-link">
          <Link to="/blog">
            <span>The</span>{' '}
            <span>Sidebar</span>{' '}
            <span>Blog</span>
          </Link>
        </h2>
        <div className="blog-newsletter">
          <div>
            <h3 className="webring-header-item-title">Sign Up for the Newsletter</h3>
            <p>Get the best of Sidebar in your inbox every weekday.</p>
            <NewsletterForm />
          </div>
        </div>
        {/* <Nav /> */}
      </div>
      <div className="blog-contents">{children}</div>
    </div>
    <Footer />
  </div>
);

export default WebringLayout;
