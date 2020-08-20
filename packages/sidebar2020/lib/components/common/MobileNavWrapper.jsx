import React, { PureComponent } from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import PropTypes from 'prop-types';
import Nav from './Nav.jsx';
import { IconClose } from './Icons.jsx';

class MobileNavWrapper extends PureComponent {
  state = {
    navOpen: false,
  };

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  getChildContext = () => {
    return {
      toggleNav: this.toggleNav,
    };
  };

  render() {
    return (
      <div
        className={`mobile-nav-wrapper ${
          this.state.navOpen ? 'mobile-nav-open' : 'mobile-nav-closed'
        }`}
      >
        <div className="mobile-nav">
          <div className="mobile-nav-close-wrapper">
            <Components.Button
              variant="info"
              className="mobile-nav-toggle mobile-nav-close"
              onClick={this.toggleNav}
            >
              <IconClose />
            </Components.Button>
          </div>
          <Nav variant="flat" />
        </div>
        <div className="main-content-area">
          {this.props.children}
          <div className="main-content-overlay" />
        </div>
      </div>
    );
  }
}

MobileNavWrapper.childContextTypes = {
  toggleNav: PropTypes.func,
};

registerComponent('MobileNavWrapper', MobileNavWrapper);

export default MobileNavWrapper;