import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
import {Helmet} from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

const HomeLayout = ({ currentUser, children, currentRoute }) => (
  <div className={classNames('wrapper', 'wrapper-home', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">
    <Helmet>
      {/* <link
        name="bootstrap"
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"
      />
      <link
        name="font-awesome"
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      /> */}
    </Helmet>

    {/* <Components.HeadTags /> */}

    <div className="layout layout-home">
      <Header />
      <div className="main">
        <Components.FlashMessages />

        {/* <Components.Newsletter /> */}

        {children}
      </div>
    <Footer />

    </div>
  </div>
);

export default HomeLayout;
