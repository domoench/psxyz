import styled from 'styled-components';

import {
  colors,
  fonts,
  fontSize,
} from '../theme';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  min-height: 100%;
  background: ${props => props.color};
`;

export const Column = styled.div`
  padding: 1.5em;
  color: ${colors.white};

  & p {
    padding-bottom: 18px;
    font-family: ${fonts.serif};
    font-size: ${fontSize.body1}px;
    line-height: 127%;
  }
`;

export const Title1 = styled.h1`
  padding-bottom: 18px;
  font-size: ${fontSize.title1}px;
  font-family: ${fonts.druk};
`;
