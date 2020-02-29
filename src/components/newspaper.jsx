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

  & h2 {
    padding-top: 1em;
    padding-bottom: 1.2em;
    text-transform: uppercase;
    font-size: ${fontSize.body * 1.2}px;
    font-family: ${fonts.sansSerif};
  }

  & p {
    padding-bottom: 1em;
    font-family: ${fonts.serif};
    font-size: ${fontSize.body}px;
    line-height: 1.5;
  }
`;

export const Title1 = styled.h1`
  padding-bottom: 1.2em;
  font-size: ${fontSize.title1}px;
  font-family: ${fonts.druk};
`;
