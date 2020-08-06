import React from 'react';
import PropTypes from 'prop-types';

import { StyledAnchor } from './styled';

// TODO I think you don't need this wrapper. Just use STyledAnchor as Anchor
const Anchor = ({ href, children, altText, color, hoverColor, underline }) => (
  <StyledAnchor
    href={href}
    alt={altText}
    target="_blank"
    rel="noopener noreferrer"
    color={color}
    hoverColor={hoverColor}
    underline={underline}
  >
    {children}
  </StyledAnchor>
);

Anchor.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  underline: PropTypes.bool,
};

export default Anchor;
