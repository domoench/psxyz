import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontStyles, deviceSizeForWidth, fontScaleForDevice } from '../theme';

const Blurb = styled.p`
  font-family: ${fontStyles.body1.family};
  padding: 1em;
  ${props => `font-size: ${props.fontSize}px;`}
`;

const AboutBlurb = ({ width }) => {
  const deviceSize = deviceSizeForWidth(width);
  const fontSize = fontStyles.body1.size * fontScaleForDevice[deviceSize];
  return (
    <Blurb fontSize={fontSize}>
      Public Service is a platform dedicated to achieving equity in imagemaking.
      We honor people of color as creators of culture, not just consumers. We
      believe we must diversify the creative talent working behind the scenes of
      every production to reimagine the gaze, reframe the narrative, and
      recreate the codes of visual culture.
    </Blurb>
  );
};

AboutBlurb.propTypes = {
  width: PropTypes.number.isRequired,
};

export default AboutBlurb;
