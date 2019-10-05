import styled from 'styled-components';

import { fonts, fontSize } from '../theme';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const Column = styled.div`
  padding: 1.5em;

  & h1 {
    padding-bottom: 1.2em;
    font-family: ${fonts.serif};
    font-size: ${fontSize.body * 2}px;
  }

  & h2 {
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
