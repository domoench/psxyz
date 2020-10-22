import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { fontStyles, deviceSizeForWidth } from '../theme';

const Blurb = styled.div`
  font-family: ${fontStyles.body1.family};
  ${props => `padding: ${props.padding}px;`}
  ${props => `font-size: calc(${props.initFontSize}px * var(--blurbScale));`}
  transition: font-size 0.05s linear;
`;

const xlPadding = 50;
const blurbFontScale = {
  xs: 0.36,
  sm: 0.52,
  md: 0.68,
  lg: 0.84,
  xl: 1.0,
};

const blurbScale = (scrollRatio, deviceSize) => {
  // The scrollRatio point at which point we stop affecting Logo size
  // On mobile: Beyond this point logo disappears
  // On desktop: Beyond this point logo stays at minimum size
  const scrollThreshold = 0.1;

  // Logo will scale down from 1.0 to minLogoScale as the scrollRatio
  // goes from 0 to scrollThreshold.
  const minScale = 0.3;

  let scale;
  if (scrollRatio < scrollThreshold) {
    scale = ((minScale - 1) * scrollRatio) / scrollThreshold + 1;
  } else {
    scale = minScale;
  }
  return scale;
};

const AboutBlurb = ({ width }) => {
  const deviceSize = deviceSizeForWidth(width);
  const padding = Math.floor(xlPadding * blurbFontScale[deviceSize]);
  const initFontSize = Math.floor(
    fontStyles.display1.size * blurbFontScale[deviceSize]
  );
  const aboutBlurbRef = React.createRef();

  useLayoutEffect(() => {
    document.body.addEventListener('scrollRatio', e => {
      const scrollRatio = e.detail.scrollRatio;
      aboutBlurbRef.current?.style.setProperty('--blurbScale', blurbScale(scrollRatio, deviceSize));
    }, { passive: true });
  });

  return (
      <Blurb ref={aboutBlurbRef} initFontSize={initFontSize} padding={padding}>
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
