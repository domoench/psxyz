import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Pill from './reusable/Pill';
import Anchor from './reusable/Anchor';
import {
  colors as themeColors,
  fontStyles,
  deviceSizeForWidth,
} from '../theme';
import { colorsType } from './reusable/types';

const FOOTER_PILL_PY = 4;
const FOOTER_PILL_PX = 15;

const FooterPill = styled.div`
  padding: 5px 12px 5px 0;
  line-height: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${fontStyles.title2.family};
  ${props => `color: ${props.color};`}
`;

const LinkPill = ({ to, text, fontSize, location }) => {
  const [hover, setHover] = useState(false);
  const active = location.pathname === to;
  const colors = hover
    ? {
        color: themeColors.white,
        borderColor: themeColors.black,
        bgColor: themeColors.black,
      }
    : {
        color: active ? themeColors.white : themeColors.black,
        borderColor: themeColors.gray,
        bgColor: active ? themeColors.black : themeColors.transparent,
      };

  return (
    <StyledLink
      color={colors.color}
      to={to}
      activeClassName="active"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Pill
        borderRadius={26}
        py={FOOTER_PILL_PY}
        px={FOOTER_PILL_PX}
        colors={colors}
        fontSize={fontSize}
      >
        {text}
      </Pill>
    </StyledLink>
  );
};

LinkPill.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  fontSize: PropTypes.number.isRequired,
};

const AnchorPill = ({
  href,
  defaultColors,
  hoverColors,
  children,
  fontSize,
}) => {
  // TODO I do this hover management in many components. refactor?
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Anchor href={href} altText="imagemaker source url" color={colors.color}>
        <Pill
          borderRadius={26}
          py={FOOTER_PILL_PY}
          px={FOOTER_PILL_PX}
          colors={colors}
          fontSize={fontSize}
        >
          {children}
        </Pill>
      </Anchor>
    </div>
  );
};

AnchorPill.propTypes = {
  href: PropTypes.string.isRequired,
  defaultColors: colorsType.isRequired,
  hoverColors: colorsType.isRequired,
  children: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
};

const StyledFooter = styled.div`
  display: flex;
  ${props => `padding: 6px ${props.padding}px;`}
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${themeColors.grayTint};
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Copyright = styled.span`
  padding: 6px 0;
`;

const padding = deviceSize => {
  const xlPaddingSize = 44;
  const paddingScale = {
    xs: 0.53,
    sm: 0.65,
    md: 0.77,
    lg: 0.89,
    xl: 1.0,
  };
  return Math.floor(xlPaddingSize * paddingScale[deviceSize]);
};

const Footer = ({ width, location }) => {
  const deviceSize = deviceSizeForWidth(width);
  const fontSize =
    deviceSize === 'xs' ? fontStyles.title3.size : fontStyles.title2.size;

  return (
    <StyledFooter padding={padding(deviceSize)}>
      <Pills>
        <FooterPill>
          <LinkPill
            to="/privacy/"
            text="PRIVACY & TERMS"
            fontSize={fontSize}
            location={location}
          />
        </FooterPill>

        <FooterPill>
          <AnchorPill
            href="https://www.instagram.com/publicservice.xyz/"
            defaultColors={{
              color: themeColors.black,
              borderColor: themeColors.gray,
              bgColor: themeColors.transparent,
            }}
            hoverColors={{
              color: themeColors.white,
              borderColor: themeColors.black,
              bgColor: themeColors.black,
            }}
            fontSize={fontSize}
          >
            INSTAGRAM
          </AnchorPill>
        </FooterPill>
      </Pills>
      <Copyright>© {`${new Date().getFullYear()}`} Public Service</Copyright>
    </StyledFooter>
  );
};

Footer.propTypes = {
  location: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default Footer;
