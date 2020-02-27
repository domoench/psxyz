import styled from 'styled-components';

import { fonts } from '../../theme';

const Pill = styled.span`
  padding: 0.2em 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-family: ${fonts.druk};
  width: fit-content;

  ${props => `border-radius: ${props.borderRadius}px/${props.borderRadius}px`};
  ${props => `border: 1px solid ${props.colors.borderColor};`}
  ${props => `background: ${props.colors.bgColor};`}
  ${props => `color: ${props.colors.color};`}
  ${props => `font-size: ${props.fontSize}px`};
`;

export default Pill;
