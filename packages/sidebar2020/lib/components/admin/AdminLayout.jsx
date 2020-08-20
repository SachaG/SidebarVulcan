/*

Layout

*/

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import classNames from 'classnames';
// import MobileNavWrapper from '../common/MobileNavWrapper.jsx';
import AdminHeader from './AdminHeader.jsx';
import Footer from '../common/Footer.jsx';

const AdminLayout = ({ currentUser, children, currentRoute }) => (
  <div
    className={classNames('wrapper', 'wrapper-admin', `wrapper-${currentRoute.name.replace('.', '-')}`)}
    id="wrapper"
  >
    {/* <Components.Header /> */}

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

registerComponent('AdminLayout', AdminLayout, withCurrentUser);

export default withCurrentUser(AdminLayout);
