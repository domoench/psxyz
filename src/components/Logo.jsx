import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deviceSizeForWidth, colors as themeColors } from '../theme';
import LogoSVGIcon from './svg/logo';

const LogoWrapper = styled.div`
  ${props => `padding: ${props.padding}px;`}
`;

const Logo = ({ width, scrollRatio }) => {
  const deviceSize = deviceSizeForWidth(width);
  const xlLogoSize = 642;
  const logoScale = {
    xs: 0.53,
    sm: 0.65,
    md: 0.77,
    lg: 0.89,
    xl: 1.0,
  };

  const xlPaddingSize = 50;
  const logoPaddingScale = {
    xs: 0.32,
    sm: 0.49,
    md: 0.66,
    lg: 0.83,
    xl: 1.0,
  };

  // TODO make the scaling a smarter, piecewise function at the threshold
  // that also considers mobile/desktop status.
  const logoDisappearThreshold = 0.25;
  const logoSizeFactor = 1.0 - scrollRatio / logoDisappearThreshold;

  return (
    <LogoWrapper
      padding={Math.floor(xlPaddingSize * logoPaddingScale[deviceSize])}
    >
      <Link to="/">
        <LogoSVGIcon
          width={Math.floor(
            xlLogoSize * logoScale[deviceSize] * logoSizeFactor
          )}
          color={themeColors.black}
        />
      </Link>
    </LogoWrapper>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  scrollRatio: PropTypes.number.isRequired,
};

export default Logo;
