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

const FooterPill = styled.div`
  padding: 0.25em 0.5em;
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
        py={4}
        px={10}
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
          py={4}
          px={10}
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
  padding: 0.25em 1em;
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
  padding: 1em;
`;

const Footer = ({ width, location }) => {
  const deviceSize = deviceSizeForWidth(width);
  const fontSize =
    deviceSize === 'xs' ? fontStyles.title3.size : fontStyles.title2.size;

  return (
    <StyledFooter>
      <Pills>
        <FooterPill>
          <LinkPill
            to="/contact/"
            text="CONTACT"
            fontSize={fontSize}
            location={location}
          />
        </FooterPill>

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
      <Copyright>© 2019 Public Service</Copyright>
    </StyledFooter>
  );
};

Footer.propTypes = {
  location: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default Footer;
