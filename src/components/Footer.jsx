import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Pill from './reusable/Pill';
import Anchor from './reusable/Anchor';
import { colors as themeColors, fonts, fontSize } from '../theme';
import { colorsType } from './reusable/types';

const FooterPill = styled.div`
  padding: 0.25em 0.5em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${fonts.sansSerif};
  ${props => `color: ${props.color};`}
`;

const LinkPill = ({
  to,
  text,
}) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const colors = hover ? {
    color: themeColors.white,
    borderColor: themeColors.black,
    bgColor: themeColors.black,
  } : {
    color: active ? themeColors.white : themeColors.black,
    borderColor: themeColors.gray,
    bgColor: active ? themeColors.black : themeColors.white,
  };

  return (
    <StyledLink
      color={colors.color}
      to={to}
      getProps={({ isCurrent }) => {
        setActive(isCurrent);
      }}
      activeClassName="active"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Pill
        borderRadius={20}
        colors={colors}
        fontSize={fontSize.body * 0.66}
      >
        {text}
      </Pill>
    </StyledLink>
  );
};

LinkPill.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const AnchorPill = ({
  href,
  defaultColors,
  hoverColors,
  children,
}) => {
  // TODO I do this hover management in many components. refactor?
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Anchor
        href={href}
        alt="imagemaker source url"
        textColor={colors.color}
      >
        <Pill
          borderRadius={20}
          colors={colors}
          fontSize={fontSize.body * 0.66}
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
  children: PropTypes.element.isRequired,
};

const StyledFooter = styled.div`
  display: flex;
  padding: 0.25em 1em;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${themeColors.white};
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Copyright = styled.span`
  padding: 1em;
`;

export default () => (
  <StyledFooter>
    <Pills>
      <FooterPill>
        <LinkPill
          to="/contact/"
          text="CONTACT"
        />
      </FooterPill>

      <FooterPill>
        <LinkPill
          to="/terms/"
          text="PRIVACY & TERMS"
        />
      </FooterPill>

      <FooterPill>
        <AnchorPill
          href="https://www.instagram.com/publicservice.xyz/"
          defaultColors={{
            color: themeColors.black,
            borderColor: themeColors.gray,
            bgColor: themeColors.white,
          }}
          hoverColors={{
            color: themeColors.white,
            borderColor: themeColors.black,
            bgColor: themeColors.black,
          }}
        >
          INSTAGRAM
        </AnchorPill>
      </FooterPill>
    </Pills>
    <Copyright>
      © 2019 Public Service
    </Copyright>
  </StyledFooter>
);
