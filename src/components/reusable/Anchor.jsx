import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

export default Anchor;
