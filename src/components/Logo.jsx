import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deviceSizeForWidth, isMobile, colors as themeColors } from '../theme';
import LogoSVGIcon from './svg/logo';

const LogoWrapper = styled.div`
  ${props => `padding: ${props.padding}px;`}
`;

const xlLogoSize = 642;
const logDeviceScale = {
  xs: 0.53,
  sm: 0.65,
  md: 0.77,
  lg: 0.89,
  xl: 1.0,
};

const xlPaddingSize = 50;
const logoPaddingScale = {
  xs: 0.32,
  sm: 0.4,
  md: 0.66,
  lg: 0.83,
  xl: 1.0,
};

// Dynamically scale the logo based on how far down the page the user scrolls
const logoScale = (scrollRatio, deviceSize) => {
  // The scrollRatio point at which point we stop affecting Logo size
  // On mobile: Beyond this point logo disappears
  // On desktop: Beyond this point logo stays at minimum size
  const scrollThreshold = 0.1;

  // Logo will scale down from 1.0 to minLogoScale as the scrollRatio
  // goes from 0 to scrollThreshold.
  const minLogoScale = 0.5;

  let scale;
  if (scrollRatio < scrollThreshold) {
    scale = ((minLogoScale - 1) * scrollRatio) / scrollThreshold + 1;
  } else {
    scale = isMobile(deviceSize) ? 0 : minLogoScale;
  }
  return scale;
};

const Logo = ({ width, scrollRatio }) => {
  const deviceSize = deviceSizeForWidth(width);
  const logoPadding = Math.floor(xlPaddingSize * logoPaddingScale[deviceSize]);
  const logoWidth = Math.floor(
    xlLogoSize * logDeviceScale[deviceSize] * logoScale(scrollRatio, deviceSize)
  );

  return (
    <LogoWrapper padding={logoPadding}>
      <Link to="/">
        <LogoSVGIcon width={logoWidth} color={themeColors.black} />
      </Link>
    </LogoWrapper>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  scrollRatio: PropTypes.number.isRequired,
};

export default Logo;
