import React from 'react';
import PropTypes from 'prop-types';

const SavedSVGIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 11 14" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M0.782428 14C1.14481 14 1.33425 13.7856 2.10843 13.0518L4.87576 10.4299C5.01577 10.298 5.08989 10.2568 5.18049 10.2568C5.26285 10.2568 5.34521 10.3062 5.47698 10.4299L8.71377 13.5135C8.99378 13.7856 9.20793 14 9.57854 14C10.0068 14 10.3527 13.7362 10.3527 13.0848V2.10248C10.3527 0.709083 9.66914 0 8.28548 0H2.06726C0.683601 0 0 0.709083 0 2.10248V13.0848C0 13.7362 0.345915 14 0.782428 14ZM1.31777 12.1943C1.26011 12.2521 1.186 12.2191 1.186 12.1366V2.11898C1.186 1.52532 1.50721 1.19553 2.13314 1.19553H8.2196C8.84553 1.19553 9.16674 1.52532 9.16674 2.11898V12.1366C9.16674 12.2191 9.10086 12.2521 9.03497 12.1943L5.92998 9.25089C5.70759 9.04476 5.47698 8.87986 5.18049 8.87986C4.87576 8.87986 4.64515 9.04476 4.42277 9.25089L1.31777 12.1943Z" fill={color} />
  </svg>
);

SavedSVGIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default SavedSVGIcon;