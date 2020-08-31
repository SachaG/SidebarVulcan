import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ currentUser, children, currentRoute }) => (
  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">
    <div className="layout layout-default">
      <div className="layout-inner">
        <Header />
        <div className="main">
          <Components.FlashMessages />
          {children}
        </div>
      </div>
      <div className="sidebar">
        <div id="sidebar-portal" />
      </div>
    </div>
    <Footer />
  </div>
);

registerComponent('Layout', Layout, withCurrentUser);
