import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { fontStyles, deviceSizeForWidth } from '../theme';

const shrinkFont = keyframes`
  from { font-size: 40px; }
  to { font-size: 10px; }
`;

const Blurb = styled.div`
  transition: font 0.35s ease;
  font-family: ${fontStyles.body1.family};
  ${props => `padding: ${props.padding}px;`}
  animation: ${shrinkFont} 1s linear infinite;
  animation-play-state: paused;
  animation-delay: calc(var(--scrollRatio) * -1s);
`;
// ${props => `font-size: ${props.fontSize}px * var(--scale);`}

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
  const aboutBlurbRef = React.createRef();

  useLayoutEffect(() => {
    document.body.addEventListener('scrollRatio', e => {
      const scrollRatio = e.detail.scrollRatio;
      aboutBlurbRef.current?.style.setProperty('--scrollRatio', scrollRatio);
    });
  });

  return (
    <Blurb ref={aboutBlurbRef} fontSize={fontSize} padding={padding}>
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
