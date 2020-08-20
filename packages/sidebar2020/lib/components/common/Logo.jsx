import React from 'react';

const Logo = ({ width = 180, height = 168 }) => (
  <svg
    className="logo"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    viewBox="0 0 180 168"
  >
    <g transform="translate(-180 85)">
      <g className="logo-bars">
        <use fill="#FFF" transform="translate(234 -45)" xlinkHref="#path0_fill"></use>
        <use fill="#FFF" transform="translate(234 -5)" xlinkHref="#path0_fill"></use>
        <use fill="#FFF" transform="translate(234 35)" xlinkHref="#path0_fill"></use>
        <use fill="#FFF" transform="translate(270 15)" xlinkHref="#path1_fill"></use>
        <use fill="#FFF" transform="translate(222 -25)" xlinkHref="#path1_fill"></use>
        <g className="logo-bgbars">
          <use fill="#FFF" fillOpacity="0.2" transform="translate(222 -65)" xlinkHref="#path1_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(270 -85)" xlinkHref="#path1_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(270 55)" xlinkHref="#path1_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(222 75)" xlinkHref="#path1_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(330 15)" xlinkHref="#path2_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(330 55)" xlinkHref="#path2_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(330 -85)" xlinkHref="#path2_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(282 -25)" xlinkHref="#path3_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(282 -65)" xlinkHref="#path3_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(282 75)" xlinkHref="#path3_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 -25)" xlinkHref="#path2_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 75)" xlinkHref="#path2_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 -65)" xlinkHref="#path2_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(318 -5)" xlinkHref="#path4_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 -5)" xlinkHref="#path4_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(318 -45)" xlinkHref="#path4_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 -45)" xlinkHref="#path4_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(318 35)" xlinkHref="#path4_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 35)" xlinkHref="#path4_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 15)" xlinkHref="#path3_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 55)" xlinkHref="#path3_fill"></use>
          <use fill="#FFF" fillOpacity="0.2" transform="translate(180 -85)" xlinkHref="#path3_fill"></use>
        </g>
      </g>
    </g>
    <defs>
      <path id="path0_fill" d="M0 0h72v8H0V0z"></path>
      <path id="path1_fill" d="M0 0h48v8H0V0z"></path>
      <path id="path2_fill" d="M0 0h30v8H0V0z"></path>
      <path id="path3_fill" d="M0 0h78v8H0V0z"></path>
      <path id="path4_fill" d="M0 0h42v8H0V0z"></path>
    </defs>
  </svg>
);

export default Logo;
