import styled from 'styled-components';

import { colors, fontStyles } from '../theme';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  min-height: 100%;
  background: ${props => props.color};
  padding: 25px 30px;
`;

export const Column = styled.div`
  color: ${colors.white};
  padding: 25px 30px;

  & p {
    padding-bottom: 18px;
    font-family: ${fontStyles.body1.family};
    font-size: ${fontStyles.body1.size}px;
    line-height: 127%;
  }
`;

export const Title1 = styled.h1`
  padding-bottom: 18px;
  font-family: ${fontStyles.title1.family};
  font-size: ${fontStyles.title1.size}px;
`;
