import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontStyles, deviceSizeForWidth } from '../theme';

const Blurb = styled.div`
  font-family: ${fontStyles.body1.family};
  ${props => `padding: ${props.padding}px;`}
  ${props => `font-size: ${props.fontSize}px;`}
`;

const xlPadding = 50;
const blurbFontScale = {
  xs: 0.36,
  sm: 0.52,
  md: 0.68,
  lg: 0.84,
  xl: 1.0,
};

const AboutBlurb = ({ width }) => {
  const deviceSize = deviceSizeForWidth(width);
  const padding = Math.floor(xlPadding * blurbFontScale[deviceSize]);
  const fontSize = Math.floor(
    fontStyles.display1.size * blurbFontScale[deviceSize]
  );
  return (
    <Blurb fontSize={fontSize} padding={padding}>
      <p>
        Public Service is a platform and creative studio dedicated to achieving
        equity in imagemaking. We honor people of color as creators of culture,
        not just consumers. We believe we must diversify the creative talent
        working behind the scenes of every production to reimagine the gaze,
        reframe the narrative, and recreate the codes of visual culture.
      </p>
      <br />

      <p>
        Our directory contains people whose work we find interesting, who help
        us see in new ways, who excite us, who have limitless potential. Use it
        as a resource to find talent for your next project. Bookmark it. Share
        it. Spread the word.
      </p>
    </Blurb>
  );
};

AboutBlurb.propTypes = {
  width: PropTypes.number.isRequired,
};

export default AboutBlurb;
