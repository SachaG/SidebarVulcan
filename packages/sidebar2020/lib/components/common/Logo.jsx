import React from "react";

const Logo = ({ width = 180, height = 180 }) => (
  <svg
    className="logo"
    xmlns="http://www.w3.org/2000/svg"
    width="900"
    height="900"
    fill="none"
    viewBox="0 0 900 900"
  >
    <path fill="#E45C28" d="M0 0h900v900H0z"></path>
    <path
      fill="#F6F6F6"
      d="M133.875 130h623.25v110h-623.25zM253.895 344l472.491 103.48-23.533 107.453-472.491-103.48zM134 660h623v110H134z"
    ></path>
    <path
      fill="#F6F6F6"
      d="m131 311.946 419.396-117.335 29.637 105.932-419.396 117.335zM321 592.144l427.115-85.05 21.482 107.883-427.115 85.049z"
    ></path>
    <path
      fill="#E45C28"
      fillRule="evenodd"
      d="M563.094 240H388.161l162.235-45.389zM349.704 364.983l-106.958 29.924L253.895 344zM711.744 514.337l-8.891 40.595-92.854-20.335zM543.489 660l-201.007 40.026-7.97-40.026z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Logo;
