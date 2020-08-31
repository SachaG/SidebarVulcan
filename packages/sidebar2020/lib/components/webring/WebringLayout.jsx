import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import WebringLogo from './WebringLogo.jsx';

const WebringLayout = ({ currentUser, children, currentRoute }) => (
  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">
    <div className="layout layout-default">
      <div className="layout-inner">
        <div className="header">
          <div className="header-inner">
            {/* <h1>Sidebar 2020</h1> */}
            <div className="header-one">
              <Link className="logo-link" to="/">
                <WebringLogo />
              </Link>
              <h2 className="tagline">The five best design links, every weekday</h2>
            </div>
            <div className="header-two">
              <Nav />
            </div>
          </div>
        </div>
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

export default WebringLayout;
