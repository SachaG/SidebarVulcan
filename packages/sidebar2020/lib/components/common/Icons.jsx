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

const icons = {
  IconSearch,
};

export default icons;
