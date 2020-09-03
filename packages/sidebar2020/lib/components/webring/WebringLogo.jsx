import React from 'react';

const d = 100; // main dimension
const d2 = d / 2; // half of main dimension
const txtr = 0.75; // text path ratio
const c1r = txtr;
const c2r = txtr * 1.2; // second curve need to be a little larger
const cDr = txtr * 1.06; // decorative curves also

const WebringLogo = () => (
  <svg className="logo webring-logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
    <path fill="#fff" fillOpacity="0.2" d="M36.025 31.374H49.977999999999994V33.699999999999996H36.025z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M36.897 19.747H49.977999999999994V22.073H36.897z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M49.978 25.56H63.931V27.886H49.978z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M49.978 66.257H63.931V68.583H49.978z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M49.978 77.884H63.931V80.21H49.978z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M36.025 72.07H49.977999999999994V74.39599999999999H36.025z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M67.419 54.629H80.5V56.955H67.419z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M67.419 66.257H76.14V68.583H67.419z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M67.419 25.56H71.198V27.886H67.419z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M53.466 43.002H70.035V45.328H53.466z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M73.524 43.002H80.501V45.328H73.524z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M53.466 31.374H75.55799999999999V33.699999999999996H53.466z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M53.466 19.747H61.896V22.073H53.466z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M53.466 72.07H71.19800000000001V74.39599999999999H53.466z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M18.874 43.002H32.536V45.328H18.874z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M28.758 72.07H32.537V74.39599999999999H28.758z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M23.816 31.374H32.537V33.699999999999996H23.816z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M63.931 48.815H81.663V51.141H63.931z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M27.304 48.815H36.025V51.141H27.304z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M18.293 48.815H24.979V51.141H18.293z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M63.931 37.188H78.756V39.514H63.931z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M20.619 37.188H36.025V39.514H20.619z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M63.931 60.443H79.337V62.769H63.931z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M20.619 60.443H36.025V62.769H20.619z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M19.456 54.629H46.489999999999995V56.955H19.456z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M23.816 66.257H46.489999999999995V68.583H23.816z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M36.025 77.884H46.489999999999995V80.21H36.025z"></path>
    <path fill="#fff" fillOpacity="0.2" d="M28.758 25.56H46.489999999999995V27.886H28.758z"></path>
    <path fill="#fff" d="M39.513 37.188H60.443V39.514H39.513z"></path>
    <path fill="#fff" d="M39.513 48.815H60.443V51.141H39.513z"></path>
    <path fill="#fff" d="M39.513 60.443H60.443V62.769H39.513z"></path>
    <path fill="#fff" d="M49.978 54.629H63.931V56.955H49.978z"></path>
    <path fill="#fff" d="M36.025 43.002H49.977999999999994V45.328H36.025z"></path>

    <path
      id="curve1"
      fill="none"
      d={`M${(1 - c1r) * d2},${d2} a${d2 * c1r},${d2 * c1r} 0 0,1 ${c1r * d2},-${c1r * d2}`}
    />
    <text className="webring-logo-text webring-logo-text-c1" width="500">
      <textPath fill="white" xlinkHref="#curve1" startOffset="50%" textAnchor="middle">
        Sidebar
      </textPath>
    </text>

    <path
      id="curve1d"
      fill="none"
      className="webring-logo-curve-decorative"
      d={`M${d2},${(1 - cDr) * d2} a${d2 * cDr},${d2 * cDr} 0 0,1 ${cDr * d2},${cDr * d2}`}
    />

    <path
      id="curve2"
      fill="none"
      d={`M${d2},${d2 + c2r * d2} a${d2 * c2r},${d2 * c2r} 0 0,0 ${c2r * d2},-${c2r * d2}`}
    />
    <text className="webring-logo-text webring-logo-text-c2" width="500">
      <textPath fill="white" xlinkHref="#curve2" startOffset="50%" textAnchor="middle">
        Webring
      </textPath>
    </text>


    <path
      id="curve2d"
      fill="none"
      className="webring-logo-curve-decorative"
      d={`M${(1 - cDr) * d2},${d2} a${d2 * cDr},${d2 * cDr} 0 0,0 ${cDr * d2},${cDr * d2}`}
    />

  </svg>
);

export default WebringLogo;
