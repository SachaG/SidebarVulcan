import React from 'react';
import Logo from '../common/Logo';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';

const AdminHeader = () => (
  <div className="header">
    <div className="header-inner">
      <div className="header-one">
        <Link className="logo-link" to="/">
          <Logo />
        </Link>
      </div>
      <div className="header-two">
        <AdminNav />
      </div>
    </div>
  </div>
);

export default AdminHeader;