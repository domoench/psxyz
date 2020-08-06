// Reusable styled components
// TODO: Still TBD if this is useful. Everything I initially thought would go in here
// turned out to be a bad fit. But I still hold out hope.

import styled from 'styled-components';

import { colors } from '../../theme';

export const StyledAnchor = styled.a`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  color: ${({ color }) => color || colors.white};
  &:hover {
    color: ${({ hoverColor }) => hoverColor || colors.red};
  }
`;

// TODO unneeded?
export const Content = styled.div`
  flex: 1 0 auto;
`;
