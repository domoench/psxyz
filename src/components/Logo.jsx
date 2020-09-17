import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deviceSizeForWidth, colors as themeColors } from '../theme';
import LogoSVGIcon from './svg/logo';

const LogoWrapper = styled.div`
  ${props => `padding: ${props.padding}px;`}
`;

const Logo = ({ width }) => {
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

  return (
    <LogoWrapper
      padding={Math.floor(xlPaddingSize * logoPaddingScale[deviceSize])}
    >
      <Link to="/">
        <LogoSVGIcon
          width={Math.floor(xlLogoSize * logoScale[deviceSize])}
          color={themeColors.black}
        />
      </Link>
    </LogoWrapper>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Logo;
