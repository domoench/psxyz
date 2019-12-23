import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO move this to another file
export const colorsType = PropTypes.shape({
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
});

const Pill = styled.span`
  padding: 0.2em 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial,sans-serif;
  font-weight: 600;

  ${props => `border-radius: ${props.borderRadius}px/${props.borderRadius}px`};
  ${props => `border: 1px solid ${props.colors.borderColor};`}
  ${props => `background: ${props.colors.bgColor};`}
  ${props => `color: ${props.colors.color};`}
`;

export { Pill };
