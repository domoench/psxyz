import React from 'react';
import styled from 'styled-components';

import { fonts, fontSize } from '../theme';

const Blurb = styled.p`
  font-family: ${fonts.serif};
  padding: 1em;
  font-size: ${fontSize.body * 1.2}px;
`;

const AboutBlurb = () => (
  <Blurb>
    Public Service is a platform dedicated to achieving equity in imagemaking.
    We honor people of color as creators of culture, not just consumers.
    We believe we must diversify the creative talent working behind the scenes of every
    production to reimagine the gaze, reframe the narrative, and recreate the codes of visual culture.
  </Blurb>
);

export default AboutBlurb;
