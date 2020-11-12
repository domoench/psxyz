import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deviceSizeForWidth, colors as themeColors } from '../theme';
import LogoSVGIcon from './svg/logo';

const initialLogoWidth = deviceSize => {
  const xlLogoWidth = 642;
  const logoDeviceScale = {
    xs: 0.53,
    sm: 0.65,
    md: 0.77,
    lg: 0.89,
    xl: 1.0,
  };
  return xlLogoWidth * logoDeviceScale[deviceSize];
};

const initialLogoPadding = deviceSize => {
  const xlPaddingSize = 50;
  const logoPaddingScale = {
    xs: 0.32,
    sm: 0.4,
    md: 0.66,
    lg: 0.83,
    xl: 1.0,
  };
  return xlPaddingSize * logoPaddingScale[deviceSize];
};

// Calculate Logo size and padding dynamicaly based on 2 things:
//   1. Device size: Determines initial size and padding
//   2. Scroll ratio: As the user scrolls down, the logoScale ratio
//      decreases.
const LogoWrapper = styled.div`
  ${props => `--initWidth: ${props.initWidth}px;`}
  ${props => `--initPadding: ${props.initPadding}px;`}
  width: calc(var(--logoScale, 1) * var(--initWidth));
  padding: calc(var(--logoScale, 1) * var(--initPadding));
  transition: width 0.35s, height 0.35s, padding 0.35s;
`;

const Logo = ({ width, logoRef }) => {
  const deviceSize = deviceSizeForWidth(width);
  const initPadding = Math.floor(initialLogoPadding(deviceSize));
  const initWidth = Math.floor(initialLogoWidth(deviceSize));

  return (
    <LogoWrapper
      initPadding={initPadding}
      initWidth={initWidth}
      ref={logoRef}
      deviceSize={deviceSize}
    >
      <Link to="/">
        <LogoSVGIcon color={themeColors.black} />
      </Link>
    </LogoWrapper>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  logoRef: PropTypes.object.isRequired,
};

export default Logo;
