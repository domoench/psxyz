import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  deviceSizeForWidth,
  colors as themeColors,
  minAnimatedLogoScale,
} from '../theme';
import LogoSVGIcon from './svg/logo';

const initialLogoWidth = (deviceSize, isHomePage) => {
  const xlLogoWidth = 642;
  const logoDeviceScale = {
    xs: 0.53,
    sm: 0.65,
    md: 0.77,
    lg: 0.89,
    xl: 1.0,
  };
  const logoWidth = xlLogoWidth * logoDeviceScale[deviceSize];
  return isHomePage ? logoWidth : logoWidth * minAnimatedLogoScale;
};

const initialLogoPadding = (deviceSize, isHomePage) => {
  const xlPaddingSize = 50;
  const logoPaddingScale = {
    xs: 0.32,
    sm: 0.4,
    md: 0.66,
    lg: 0.83,
    xl: 1.0,
  };
  const logoPadding = xlPaddingSize * logoPaddingScale[deviceSize];
  return isHomePage ? logoPadding : logoPadding * minAnimatedLogoScale;
};

// Calculate Logo size and padding dynamicaly based on 2 things:
//   1. Device size: Determines initial size and padding
//   2. Scroll ratio: As the user scrolls down, the logoScale ratio
//      decreases.
// TODO: Is it necessary to animate the padding? Or could we just drop that?
const LogoWrapper = styled.div`
  ${props => `--initWidth: ${props.initWidth}px;`}
  ${props =>
    `--initPadding: ${props.initPadding}px;`}
  width: calc(var(--logoScale, 1) * var(--initWidth));
  padding: calc(var(--logoScale, 1) * var(--initPadding));
  transition: width 0.15s, height 0.15s, padding 0.15s;
`;

const Logo = ({ width, logoRef, location }) => {
  const isHomePage = location.pathname === '/';
  const deviceSize = deviceSizeForWidth(width);
  const initPadding = Math.floor(initialLogoPadding(deviceSize, isHomePage));
  const initWidth = Math.floor(initialLogoWidth(deviceSize, isHomePage));

  return (
    <LogoWrapper initPadding={initPadding} initWidth={initWidth} ref={logoRef}>
      <Link to="/">
        <LogoSVGIcon color={themeColors.black} />
      </Link>
    </LogoWrapper>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  logoRef: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Logo;
