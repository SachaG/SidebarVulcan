import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';

const WebringLayout = ({ currentUser, children, currentRoute }) => (
  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">
    <div className="layout layout-webring">{children}</div>
    <Footer />
  </div>
);

export default WebringLayout;
