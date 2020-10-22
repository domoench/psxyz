import React, { useLayoutEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deviceSizeForWidth, isMobile, colors as themeColors } from '../theme';
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

const LogoWrapper = styled.div`
  ${props => `--initWidth: ${props.initWidth}px;`}
  ${props => `--initPadding: ${props.initPadding}px;`}
  width: calc(var(--logoScale) * var(--initWidth));
  padding: calc(var(--logoScale) * var(--initPadding));
  transition: width 0.05s, height 0.05s, padding 0.05s;
`;

const Logo = ({ width }) => {
  const deviceSize = deviceSizeForWidth(width);
  const initPadding = Math.floor(initialLogoPadding(deviceSize));
  const initWidth = Math.floor(initialLogoWidth(deviceSize));

  const logoRef = React.createRef();

  useLayoutEffect(() => {
    document.body.addEventListener('scrollRatio', (e) => {
      const scrollRatio = e.detail.scrollRatio;
      const ls = logoScale(scrollRatio, deviceSize);
      logoRef.current?.style.setProperty(
        '--logoScale',
        logoScale(scrollRatio, deviceSizeForWidth(width))
      );
    }, { passive: true });
  });

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
};

export default Logo;
