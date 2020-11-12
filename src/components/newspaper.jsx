import styled from 'styled-components';

import { colors, fontStyles, maxWidthMediaQuery } from '../theme';

export const Wrapper = styled.div`
  display: grid;
  min-height: 100%;
  background: ${props => props.color};
  padding: 25px 30px;

  grid-template-columns: repeat(3, 1fr);
  ${maxWidthMediaQuery('md')} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${maxWidthMediaQuery('sm')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Column = styled.div`
  color: ${colors.white};
  padding: 25px 30px;

  & p {
    font-family: ${fontStyles.body1.family};
    font-size: ${fontStyles.body1.size}px;
    line-height: 127%;
    margin-bottom: 20px;
  }
`;

export const Section = styled.div`
  padding-bottom: 20px;
`;

export const Title1 = styled.h1`
  margin-bottom: 12px;
  font-family: ${fontStyles.title1.family};
  font-size: ${fontStyles.title1.size}px;
`;
