// Reusable styled components
// TODO: Still TBD if this is useful. Everything I initially thought would go in here
// turned out to be a bad fit. But I still hold out hope.

import styled from 'styled-components';

import { colors, hoverStyles } from '../../theme';

export const StyledAnchor = styled.a`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  color: ${({ color }) => color || colors.white};
  transition: ${hoverStyles.transition};
  &:hover {
    color: ${({ hoverColor }) => hoverColor || colors.red};
    cursor: ${hoverStyles.cursor};
  }
`;

export const StyledPath = styled.path`
  ${props => `fill: ${props.fill};`}
  transition: ${hoverStyles.transition};
`;
