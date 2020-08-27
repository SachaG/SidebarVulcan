import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

// const SidebarPortal = ({ children }) => {

//   if (!canUseDOM()) {
//     return null;
//   }
  
//   const mount = document.getElementById('sidebar-portal');
//   console.log(mount);
//   const el = document.createElement('div');

//   useEffect(() => {
//     mount.appendChild(el);
//     return () => mount.removeChild(el);
//   }, [el, mount]);

//   return createPortal(children, el);
// };


class SidebarPortal extends React.Component {
  constructor() {
    super();
    this.el = canUseDOM() && document.createElement("div");
  }

  getPortalRoot = () => {
    return document.getElementById('sidebar-portal');
  }
  componentDidMount = () => {
    canUseDOM() && this.getPortalRoot().appendChild(this.el);
  };

  componentWillUnmount = () => {
    canUseDOM() && this.getPortalRoot().removeChild(this.el);
  };

  render() {
    const { children } = this.props;
    return canUseDOM() ? createPortal(children, this.el) : null;
  }
}

export default SidebarPortal;
