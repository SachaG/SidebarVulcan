import React from 'react';
import Nav from './Nav';
import Logo from './Logo';
import { IconSearch } from './Icons';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="header-inner">
      {/* <h1>Sidebar 2020</h1> */}
      <div className="header-one">
        <Link className="logo-link" to="/">
          <Logo />
        </Link>
        <h2 className="tagline">The five best design links, every weekday</h2>
      </div>
      <div className="header-two">
        <Nav />
      </div>
    </div>
  </div>
);

const Search = () => (
  <div className="header-search ">
    <IconSearch />
  </div>
);

export default Header;
