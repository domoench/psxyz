import React from 'react';
import PropTypes from 'prop-types';

import { StyledPath } from '../reusable/styled';

const CloseSVGIcon = ({ color, width, className }) => (
  <svg
    className={className}
    width={width}
    height={width}
    viewBox="0 0 9 9"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledPath
      d="M0.309129 7.09723C-0.0922985 7.49866 -0.116385 8.24532 0.317153 8.67886C0.750691 9.1124 1.50538 9.09634 1.90681 8.69491L4.50003 6.09366L7.09326 8.68689C7.51073 9.10437 8.24133 9.10437 8.67487 8.67083C9.10841 8.23728 9.10039 7.5067 8.69094 7.08921L6.09771 4.49598L8.69094 1.9108C9.10039 1.48529 9.10841 0.754682 8.67487 0.329168C8.24133 -0.104371 7.51073 -0.104371 7.09326 0.31312L4.50003 2.8983L1.90681 0.305079C1.50538 -0.0963468 0.750691 -0.112394 0.317153 0.321144C-0.116385 0.754682 -0.0922985 1.50133 0.309129 1.90276L2.90235 4.49598L0.309129 7.09723Z"
      fill={color}
    />
  </svg>
);

CloseSVGIcon.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CloseSVGIcon;
