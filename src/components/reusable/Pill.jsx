import styled from 'styled-components';

import { fonts } from '../../theme';

const Pill = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-family: ${fonts.druk};
  width: fit-content;
  cursor: pointer;

  ${props => `padding: ${props.py}px ${props.px}px;`}
  ${props => `border-radius: ${props.borderRadius}px/${props.borderRadius}px`};
  ${props => `border: 2px solid ${props.colors.borderColor};`}
  ${props => `background: ${props.colors.bgColor};`}
  ${props => `color: ${props.colors.color};`}
  ${props => `font-size: ${props.fontSize}px`};
`;

Pill.defaultProps = {
  py: 10,
  px: 16,
};

export default Pill;
