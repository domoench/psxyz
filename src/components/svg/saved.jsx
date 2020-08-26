import React from 'react';
import PropTypes from 'prop-types';

import { StyledPath } from '../reusable/styled';

const SavedSVGIcon = ({ color, width }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 11 14"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledPath
      d="M1.06349 14C1.48413 14 1.73017 13.7857 2.34127 13.2222L4.96825 10.7619C5.08731 10.6508 5.16666 10.619 5.2381 10.619C5.30952 10.619 5.38889 10.6508 5.50793 10.7619L8.40476 13.4841C8.73016 13.7857 8.99206 14 9.4127 14C9.99206 14 10.4762 13.6349 10.4762 12.8333V2.20635C10.4762 0.777784 9.70634 0 8.28572 0H2.19048C0.76985 0 0 0.777784 0 2.20635V12.8333C0 13.6349 0.484121 14 1.06349 14Z"
      fill={color}
    />
  </svg>
);

SavedSVGIcon.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default SavedSVGIcon;
