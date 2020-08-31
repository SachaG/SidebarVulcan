import React from 'react';

const style = `
#prevbutton , #nextbutton , #randombutton , #listbutton, #logo {
  cursor: pointer;
}
#prevbutton:hover #background, #nextbutton:hover #background_2, #randombutton:hover #background_3, #listbutton:hover #background_4{
  fill: #60C0F0;
}
`;

const WebringBanner = ({ webringHomeUrl, code, currentSite, previousSite, nextSite, randomSite }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="225"
      height="60"
      fill="none"
      viewBox="0 0 225 60"
    >
      <style>{style}</style>
      <g id="sidebar-webring-banner">
        <path id="Rectangle 3" fill="#F58964" d="M0 0H225V60H0z"></path>
        <a xlinkHref={webringHomeUrl} target="_top">
          <g id="logo">
            <mask id="mask0" width="60" height="60" x="0" y="0" maskUnits="userSpaceOnUse">
              <path id="Rectangle 1" fill="#C4C4C4" d="M0 0H60V60H0z"></path>
            </mask>
            <g mask="url(#mask0)">
              <path id="Rectangle 2" fill="#F36C3D" d="M0 0H60V60H0z"></path>
              <g id="bg" fill="#fff" fillOpacity="0.2">
                <path id="Rectangle" d="M14 8.667H30V11.334H14z"></path>
                <path id="Rectangle_2" d="M30 2H46V4.667H30z"></path>
                <path id="Rectangle_3" d="M30 48.667H46V51.334H30z"></path>
                <path id="Rectangle_4" d="M14 55.333H30V58H14z"></path>
                <path id="Rectangle_5" d="M50 35.333H60V38H50z"></path>
                <path id="Rectangle_6" d="M52.667 48.667H62.667V51.334H52.667z"></path>
                <path id="Rectangle_7" d="M50 2H60V4.667H50z"></path>
                <path id="Rectangle_8" d="M34 22H60V24.667H34z"></path>
                <path id="Rectangle_9" d="M34 8.667H60V11.334H34z"></path>
                <path id="Rectangle_10" d="M34 55.333H60V58H34z"></path>
                <path id="Rectangle_11" d="M0 22H10V24.667H0z"></path>
                <path id="Rectangle_12" d="M0 55.333H10V58H0z"></path>
                <path id="Rectangle_13" d="M0 8.667H10V11.334H0z"></path>
                <path id="Rectangle_14" d="M46 28.667H60V31.334000000000003H46z"></path>
                <path id="Rectangle_15" d="M0 28.667H14V31.334000000000003H0z"></path>
                <path id="Rectangle_16" d="M46 15.333H60V18H46z"></path>
                <path id="Rectangle_17" d="M0 15.333H14V18H0z"></path>
                <path id="Rectangle_18" d="M46 42H60V44.667H46z"></path>
                <path id="Rectangle_19" d="M0 42H14V44.667H0z"></path>
                <path id="Rectangle_20" d="M0 35.333H26V38H0z"></path>
                <path id="Rectangle_21" d="M0 48.667H26V51.334H0z"></path>
                <path id="Rectangle_22" d="M0 2H26V4.667H0z"></path>
              </g>
              <g id="s" fill="#fff">
                <path id="Rectangle_23" d="M18 15.333H42V18H18z"></path>
                <path id="Rectangle_24" d="M18 28.667H42V31.334000000000003H18z"></path>
                <path id="Rectangle_25" d="M18 42H42V44.667H18z"></path>
                <path id="Rectangle_26" d="M30 35.333H46V38H30z"></path>
                <path id="Rectangle_27" d="M14 22H30V24.667H14z"></path>
              </g>
            </g>
          </g>
        </a>
        <g id="prevbutton">
          <a xlinkHref={previousSite.webringUrl} target="_top">
            <path id="background" fill="#F36C3D" d="M65 20H100V55H65z"></path>
            <g id="icon">
              <g id="Outline Icons">
                <g id="Group" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                  <path id="Vector" d="M75.5 37.5l-5-5 5-5"></path>
                  <path id="Vector_2" d="M70.5 32.5h23"></path>
                </g>
              </g>
            </g>
            <path
              id="Prev"
              fill="#fff"
              d="M72.773 52v-2.664h1.53c1.161 0 1.791-.675 1.791-1.809s-.63-1.809-1.791-1.809h-2.286V52h.756zm0-5.625h1.512c.63 0 1.008.333 1.008.918v.468c0 .585-.378.918-1.008.918h-1.512v-2.304zm5.397 2.943h.998L80.698 52h.847l-1.603-2.718c1-.099 1.549-.747 1.549-1.755 0-1.134-.63-1.809-1.791-1.809h-2.287V52h.757v-2.682zm0-.639v-2.304h1.511c.63 0 1.008.333 1.008.918v.468c0 .585-.377.918-1.007.918h-1.513zM86.68 52v-.657h-3.114v-2.196h3.006v-.657h-3.006v-2.115h3.114v-.657h-3.87V52h3.87zm3.93 0l1.862-6.282H91.7l-.891 3.141-.676 2.376h-.044l-.675-2.376-.891-3.141h-.802L89.585 52h1.025z"
            ></path>
          </a>
        </g>
        <g id="nextbutton">
          <a xlinkHref={nextSite.webringUrl} target="_top">
            <path id="background_2" fill="#F36C3D" d="M105 20H140V55H105z"></path>
            <g id="icon_2">
              <g id="Outline Icons_2">
                <g id="Group_2" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                  <path id="Vector_3" d="M128.5 27.5l5 5-5 5"></path>
                  <path id="Vector_4" d="M133.5 32.5h-23"></path>
                </g>
              </g>
            </g>
            <path
              id="Next"
              fill="#fff"
              d="M114.816 52h1.071v-6.282h-.684v5.265h-.063l-2.142-5.265h-1.071V52h.684v-5.319h.063L114.816 52zm6.468 0v-.657h-3.114v-2.196h3.006v-.657h-3.006v-2.115h3.114v-.657h-3.87V52h3.87zm3.884-3.213l1.944-3.069h-.828l-.756 1.215-.774 1.269h-.036l-.783-1.269-.729-1.215h-.855l1.935 3.078L122.234 52h.828l.792-1.251.855-1.368h.036l.828 1.368.747 1.251h.855l-2.007-3.213zm7.403-2.412v-.657h-4.95v.657h2.097V52h.756v-5.625h2.097z"
            ></path>
          </a>
        </g>
        <g id="randombutton">
          <a xlinkHref={randomSite.webringUrl} target="_top">
            <path id="background_3" fill="#F36C3D" d="M145 20H180V55H145z"></path>
            <g id="icon_3">
              <g id="Outline Icons 1">
                <g id="Outline Icons_3">
                  <g id="Group_3" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                    <path id="Vector_5" d="M150.927 31.199l2.787 4.151 3.205-3.838"></path>
                    <path id="Vector_6" d="M173.5 35.5l-2.786-4.15-3.206 3.838"></path>
                    <path
                      id="Vector_7"
                      d="M170.677 31.387c.834 4.408-2.273 8.729-6.509 9.729a8.497 8.497 0 01-7.931-2.224"
                    ></path>
                    <path
                      id="Vector_8"
                      d="M153.719 35.325c-1.314-4.883 1.969-9.675 6.538-10.753a8.492 8.492 0 018.324 2.641"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
            <path
              id="Random"
              fill="#fff"
              d="M147.566 49.318h.999l1.53 2.682h.846l-1.602-2.718c.999-.099 1.548-.747 1.548-1.755 0-1.134-.63-1.809-1.791-1.809h-2.286V52h.756v-2.682zm0-.639v-2.304h1.512c.63 0 1.008.333 1.008.918v.468c0 .585-.378.918-1.008.918h-1.512zm8.96 3.321l-1.926-6.282h-.999L151.675 52h.783l.531-1.791h2.205l.531 1.791h.801zm-1.512-2.448h-1.845l.882-3.033h.081l.882 3.033zM160.402 52h1.071v-6.282h-.684v5.265h-.063l-2.142-5.265h-1.071V52h.684v-5.319h.063L160.402 52zm2.642 0h1.755c1.53 0 2.286-1.08 2.286-3.141s-.756-3.141-2.286-3.141h-1.755V52zm.756-.657v-4.968h.963c.999 0 1.521.738 1.521 1.998v.972c0 1.26-.522 1.998-1.521 1.998h-.963zm6.486.765c1.53 0 2.196-1.197 2.196-3.249s-.666-3.249-2.196-3.249c-1.53 0-2.196 1.197-2.196 3.249s.666 3.249 2.196 3.249zm0-.657c-.999 0-1.395-.819-1.395-2.079v-1.026c0-1.26.396-2.079 1.395-2.079s1.395.819 1.395 2.079v1.026c0 1.26-.396 2.079-1.395 2.079zm6.791.549h.693v-6.282h-.936l-1.107 2.772h-.054l-1.107-2.772h-.972V52h.693v-5.139h.072l1.323 3.231 1.323-3.231h.072V52z"
            ></path>
          </a>
        </g>
        <g id="listbutton">
          <a xlinkHref={webringHomeUrl} target="_top">
            <path id="background_4" fill="#F36C3D" d="M185 20H220V55H185z"></path>
            <g id="icon_4">
              <g id="Outline Icons 1_2">
                <g id="Outline Icons_4">
                  <g id="Group_4">
                    <g id="Group_5">
                      <path
                        id="Vector_9"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M210 26.5h-14.957"
                      ></path>
                    </g>
                    <g id="Group_6">
                      <path
                        id="Vector_10"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M210 30.5h-14.957"
                      ></path>
                    </g>
                    <g id="Group_7">
                      <path
                        id="Vector_11"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M210 34.5h-14.957"
                      ></path>
                    </g>
                    <g id="Group_8">
                      <path
                        id="Vector_12"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        d="M210 38.5h-14.957"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <path
              id="List"
              fill="#fff"
              d="M197.022 52v-.657h-2.979v-5.625h-.756V52h3.735zm5.226 0v-.603h-1.566v-5.076h1.566v-.603h-3.888v.603h1.566v5.076h-1.566V52h3.888zm3.434.108c1.395 0 2.196-.702 2.196-1.863 0-.819-.405-1.503-1.638-1.719l-.675-.117c-.891-.153-1.179-.513-1.179-1.071 0-.711.477-1.08 1.323-1.08.783 0 1.233.315 1.584.774l.531-.459c-.423-.603-1.107-.963-2.106-.963-1.278 0-2.097.594-2.097 1.746 0 .792.387 1.503 1.62 1.71l.702.117c.855.144 1.17.468 1.17 1.08 0 .756-.495 1.197-1.404 1.197-.756 0-1.269-.297-1.755-.909l-.549.45c.468.648 1.152 1.107 2.277 1.107zm7.889-5.733v-.657h-4.95v.657h2.097V52h.756v-5.625h2.097z"
            ></path>
          </a>
        </g>
        <path
          id="sidebarWebring"
          fill="#fff"
          d="M91.576 14.144c1.86 0 2.928-.936 2.928-2.484 0-1.092-.54-2.004-2.184-2.292l-.9-.156c-1.188-.204-1.572-.684-1.572-1.428 0-.948.636-1.44 1.764-1.44 1.044 0 1.644.42 2.112 1.032l.708-.612c-.564-.804-1.476-1.284-2.808-1.284-1.704 0-2.796.792-2.796 2.328 0 1.056.516 2.004 2.16 2.28l.936.156c1.14.192 1.56.624 1.56 1.44 0 1.008-.66 1.596-1.872 1.596-1.008 0-1.692-.396-2.34-1.212l-.732.6c.624.864 1.536 1.476 3.036 1.476zm9.811-.144v-.804h-2.088V6.428h2.088v-.804h-5.184v.804h2.088v6.768h-2.088V14h5.184zm2.144 0h2.34c2.04 0 3.048-1.44 3.048-4.188 0-2.748-1.008-4.188-3.048-4.188h-2.34V14zm1.008-.876V6.5h1.284c1.332 0 2.028.984 2.028 2.664v1.296c0 1.68-.696 2.664-2.028 2.664h-1.284zm11.287.876v-.876h-4.152v-2.928h4.008V9.32h-4.008V6.5h4.152v-.876h-5.16V14h5.16zm2.011 0h3.204c1.296 0 2.256-1.056 2.256-2.412 0-1.164-.684-1.752-1.62-1.968v-.036c.768-.24 1.308-.804 1.308-1.8 0-1.308-.876-2.16-2.304-2.16h-2.844V14zm1.008-.876v-3.036h1.896c.924 0 1.488.432 1.488 1.272v.492c0 .852-.564 1.272-1.488 1.272h-1.896zm0-3.864V6.5h1.728c.84 0 1.356.384 1.356 1.152v.468c0 .768-.516 1.14-1.356 1.14h-1.728zM130.817 14l-2.568-8.376h-1.332L124.349 14h1.044l.708-2.388h2.94l.708 2.388h1.068zm-2.016-3.264h-2.46l1.176-4.044h.108l1.176 4.044zm4.459-.312h1.332l2.04 3.576h1.128l-2.136-3.624c1.332-.132 2.064-.996 2.064-2.34 0-1.512-.84-2.412-2.388-2.412h-3.048V14h1.008v-3.576zm0-.852V6.5h2.016c.84 0 1.344.444 1.344 1.224v.624c0 .78-.504 1.224-1.344 1.224h-2.016zM148.095 14l1.02-5.004h.096l1.02 5.004h1.452l.659-8.376h-.875l-.348 4.8-.18 2.532h-.096l-1.104-5.148h-1.128l-1.104 5.148h-.096l-.18-2.532-.348-4.8h-.9l.66 8.376h1.452zm10.903 0v-.876h-4.152v-2.928h4.008V9.32h-4.008V6.5h4.152v-.876h-5.16V14h5.16zm2.011 0h3.204c1.296 0 2.256-1.056 2.256-2.412 0-1.164-.684-1.752-1.62-1.968v-.036c.768-.24 1.308-.804 1.308-1.8 0-1.308-.876-2.16-2.304-2.16h-2.844V14zm1.008-.876v-3.036h1.896c.924 0 1.488.432 1.488 1.272v.492c0 .852-.564 1.272-1.488 1.272h-1.896zm0-3.864V6.5h1.728c.84 0 1.356.384 1.356 1.152v.468c0 .768-.516 1.14-1.356 1.14h-1.728zm7.219 1.164h1.332l2.04 3.576h1.128l-2.136-3.624c1.332-.132 2.064-.996 2.064-2.34 0-1.512-.84-2.412-2.388-2.412h-3.048V14h1.008v-3.576zm0-.852V6.5h2.016c.84 0 1.344.444 1.344 1.224v.624c0 .78-.504 1.224-1.344 1.224h-2.016zm11.3 4.428v-.804h-2.088V6.428h2.088v-.804h-5.184v.804h2.088v6.768h-2.088V14h5.184zm5.815 0h1.428V5.624h-.912v7.02h-.084l-2.856-7.02h-1.428V14h.912V6.908h.084L186.351 14zm7.711 0h.936V9.86h-2.7v.804h1.764v.864c0 1.032-.648 1.764-1.728 1.764-1.368 0-1.86-1.188-1.86-2.868V9.128c0-1.68.612-2.772 1.956-2.772 1.008 0 1.404.612 1.704 1.356l.864-.396c-.36-.912-1.032-1.836-2.604-1.836-2.016 0-2.988 1.536-2.988 4.392 0 2.736.888 4.272 2.7 4.272 1.152 0 1.62-.612 1.896-1.26h.06V14z"
        ></path>
      </g>
    </svg>
  );
};

export default WebringBanner;
