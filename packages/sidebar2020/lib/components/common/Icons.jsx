import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';

export const IconClose = ({ width = 24, height = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <g id="Outline_Icons_1_">
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        id="Outline_Icons"
      >
        <line x1=".5" y1=".5" x2="23.5" y2="23.5" />
        <line x1="23.5" y1=".5" x2=".5" y2="23.5" />
      </g>
    </g>
    <rect fill="none" width="24" height="24" id="Invisible_Shape" />
  </svg>
);

registerComponent('IconClose', IconClose);

export const IconSearch = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" x="0" y="0" viewBox="0 0 24 24">
      <g>
        <path d="M9 18a8.955 8.955 0 005.633-1.992l7.658 7.697a1 1 0 001.418-1.411l-7.668-7.706A8.944 8.944 0 0018 9c0-4.963-4.037-9-9-9S0 4.037 0 9c0 4.962 4.037 9 9 9zM9 2c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7-3.86 0-7-3.141-7-7 0-3.86 3.14-7 7-7z"></path>
      </g>
      <path fill="none" d="M0 0H24V24H0z"></path>
    </svg>
  );
};

export const IconWebring = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" x="0" y="0" viewBox="0 0 24 24">
      <g>
        <g>
          <path d="M14.474 10.232l-.706-.706a4.004 4.004 0 00-5.658-.001l-4.597 4.597a4.004 4.004 0 000 5.657l.707.706a3.97 3.97 0 002.829 1.173 3.973 3.973 0 002.827-1.172l2.173-2.171a.999.999 0 10-1.414-1.414l-2.173 2.17c-.755.756-2.071.757-2.828 0l-.707-.706a2.004 2.004 0 010-2.829l4.597-4.596c.756-.756 2.073-.756 2.828 0l.707.707a1.001 1.001 0 001.415-1.415z"></path>
          <path d="M20.486 4.221l-.707-.706a3.97 3.97 0 00-2.829-1.173 3.977 3.977 0 00-2.827 1.172L12.135 5.5a.999.999 0 101.414 1.414l1.988-1.984c.755-.756 2.071-.757 2.828 0l.707.706c.779.78.779 2.049 0 2.829l-4.597 4.596c-.756.756-2.073.756-2.828 0a.999.999 0 00-1.414 0 .999.999 0 00-.001 1.414 4.001 4.001 0 005.657.001l4.597-4.597a4.005 4.005 0 000-5.658z"></path>
        </g>
      </g>
      <path fill="none" d="M0 0H24V24H0z"></path>
    </svg>
  );
};

const icons = {
  IconClose,
  IconSearch,
  IconWebring,
};

export default icons;
