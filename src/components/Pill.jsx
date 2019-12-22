import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  colors as themeColors,
} from '../theme';

// TODO move this to another file
export const colorsType = PropTypes.shape({
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
});

const Pill = styled.span`
  border-radius: ${props => `${props.borderRadius}px/${props.borderRadius}px`};
  border: 1px solid ${themeColors.black}};
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;


  ${props => `background: ${props.colors.bgColor};`}
  ${props => `color: ${props.colors.color};`}
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  ${props => `color: ${props.textColor};`}
`;

// TODO I think you don't need this wrapper. Just use STyledAnchor as Anchor
const Anchor = ({
  href,
  children,
  altText,
}) => (
  <StyledAnchor
    href={href}
    alt={altText}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </StyledAnchor>
);

Anchor.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

// TODO rename to AnchorPill
const LinkPill = ({
  text,
  href,
  altText,
  borderRadius,
  defaultColors,
  hoverColors,
}) => {
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Anchor
        href={href}
        alt={altText}
        textColor={colors.color}
      >
        <Pill
          borderRadius={borderRadius}
          colors={colors}
        >
          <span>{text}</span>
        </Pill>
      </Anchor>
    </div>
  );
};

LinkPill.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  defaultColors: colorsType,
  hoverColors: colorsType,
  borderRadius: PropTypes.number.isRequired,
};

// ToggleButtonPill manages hover state and clicked state of a toggle
// button styled as a pill
/*
const ToggleButtonPill = ({
  isClicked,
  defaultColors,
  hoverColors,
  clickHandler,
  onContent,
  offContent,
}) => {
  const [clicked, setClicked] = useState(isClicked);
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Pill
        borderRadius={borderRadius}
        colors={colors}
      >
        {clicked? onContent : offContent}
      </Pill>
    </div>
  );
};

ToggleButtonPill.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  defaultColors: colorsType.isRequired,
  hoverColors: colorsType.isRequired,
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
*/

export { Pill, LinkPill };
