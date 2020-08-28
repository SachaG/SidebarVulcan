/*

Layout

*/

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
// import MobileNavWrapper from '../common/MobileNavWrapper.jsx';
import AdminHeader from './AdminHeader.jsx';
import Footer from '../common/Footer.jsx';
import { Helmet } from 'react-helmet';
import { adminNav } from '../../modules/data.js';

const AdminLayout = ({ currentUser, children, currentRoute }) => {
  const currentPage = adminNav.find((r) => r.path === currentRoute.path);
  return (
    <div
      className={classNames('wrapper', 'wrapper-admin', `wrapper-${currentRoute.name.replace('.', '-')}`)}
      id="wrapper"
    >
      <Helmet>
        <title>Sidebar | {currentPage.name}</title>
      </Helmet>

      <AdminHeader />

      <div className="content-wrapper">
        <div className="admin-main">
          <Components.FlashMessages />
          {React.cloneElement(children, { currentUser })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

registerComponent('AdminLayout', AdminLayout, withCurrentUser);

export default withCurrentUser(AdminLayout);
