/*

Layout

*/

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
// import MobileNavWrapper from '../common/MobileNavWrapper.jsx';
import AdminHeader from './AdminHeader.jsx';
import Footer from '../common/Footer.jsx';
import { adminNav } from '../../modules/data.js';
import { useLocation } from 'react-router-dom';
import { Utils } from 'meteor/vulcan:core';

const AdminLayout = ({ currentUser, children, currentRoute }) => {
  const currentPage = adminNav.find((r) => r.path === currentRoute.path);
  const location = useLocation();
  const url = Utils.getSiteUrl() + location.pathname.slice(1);

  return (
    <div
      className={classNames('wrapper', 'wrapper-admin', `wrapper-${currentRoute.name.replace('.', '-')}`)}
      id="wrapper"
    >
      <Components.HeadTags title={`Sidebar | ${currentPage.name}`} url={url} />

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
