import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _debounce from 'lodash.debounce';
import _throttle from 'lodash.throttle';

import Header from './Header';
import Footer from './Footer';
import { deviceSizeForWidth, isMobile } from '../theme';

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
`;

// The main content area, set to overflow: auto to implement the sticky header.
const Overflowable = styled.div`
  overflow: auto;
`;

// Content with a footer that is:
// - Sticky to the bottom if the content isn't the full viewport height
// - Pushed out of sight if the content is larger than the full viewport
const ContentAndFooter = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100%;
`;

// Dynamically scale the logo based on how far down the page the user scrolls
const logoScale = (scrollRatio, deviceSize) => {
  // The scrollRatio point at which point we stop affecting Logo size
  // On mobile: Beyond this point logo disappears
  // On desktop: Beyond this point logo stays at minimum size
  const scrollThreshold = 0.1;

  // Logo will scale down from 1.0 to minLogoScale as the scrollRatio
  // goes from 0 to scrollThreshold.
  const minLogoScale = 0.5;

  let scale;
  if (scrollRatio < scrollThreshold) {
    scale = ((minLogoScale - 1) * scrollRatio) / scrollThreshold + 1;
  } else {
    scale = isMobile(deviceSize) ? 0 : minLogoScale;
  }
  return scale;
};

const Layout = ({
  children,
  toggleFiltersDrawer,
  activeNavFilter,
  location,
}) => {
  // Set up some direct DOM access for imperative animations:
  // viewport-size and scroll calculations, event listeners, and setting custom
  // CSS properties for use with transitions (to produce CSS transitions animations
  // without re-renders).
  const containerRef = useRef(null);
  const overflowableRef = useRef(null);
  const logoRef = useRef(null);

  // Calculated viewport / DOM measurements
  const [width, setWidth] = useState();

  // Measure the browser-rendered dimensions of a DOM element
  const setVizDimensions = () => {
    const vizBoundingRect = containerRef.current.getBoundingClientRect();
    setWidth(vizBoundingRect.width);
  };

  // Calculate the logoScale factor based on scroll and set it as a CSS
  // variable on the logo DOM element. Chose this approach, rather than setting
  // the scale factor as react state/props because this causes rerender-ing of
  // the header and logo, and performed much choppier than doing it all via CSS.
  const setLogoScaleCSSVariable = () => {
    const contentElem = overflowableRef.current;
    if (!contentElem) return;

    const { clientHeight, scrollHeight, scrollTop } = contentElem;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    logoRef.current?.style.setProperty(
      '--logoScale',
      logoScale(scrollRatio, deviceSizeForWidth(width))
    );
  };

  useLayoutEffect(() => {
    // 1. First load
    setVizDimensions();
    setLogoScaleCSSVariable();

    // 2. Event Listeners
    // Resize events
    const debouncedSetDimensions = _debounce(setVizDimensions, 160);
    window.addEventListener('resize', debouncedSetDimensions);

    // Scroll events
    const throttledSetLogoScale = _throttle(setLogoScaleCSSVariable, 10);
    overflowableRef.current?.addEventListener(
      'scroll',
      throttledSetLogoScale,
      {
        passive: true,
      }
    );

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedSetDimensions);
      overflowableRef.current?.removeEventListener(
        'scroll',
        throttledSetLogoScale,
      );
    };
  });

  // If we haven't calculated width yet (first render)
  if (!width) {
    return <Container ref={containerRef} />;
  }

  return (
    <Container ref={containerRef}>
      <Header
        toggleFiltersDrawer={toggleFiltersDrawer}
        width={width}
        activeNavFilter={activeNavFilter}
        location={location}
        logoRef={logoRef}
      />
      <Overflowable ref={overflowableRef}>
        <ContentAndFooter>
          {children && children(width)}
          <Footer width={width} location={location} />
        </ContentAndFooter>
      </Overflowable>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  toggleFiltersDrawer: PropTypes.func,
  activeNavFilter: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

export default Layout;
