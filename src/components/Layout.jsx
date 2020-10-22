import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _debounce from 'lodash.debounce';

import Header from './Header';
import Footer from './Footer';
import { deviceSizeForWidth, isMobile } from '../theme';

/* TODO
 * Add scaling to about blurb. Options:
 *  1. Switch over to emit a Javascript event from Layout component with
 *     scroll ratio value. Then Logo and AboutBlurb listeners set custom
 *     CSS properties on themselves.
 *     - For about blurb: Try fully capturing scroll, and preventing default, until shrink animation is complete
 */

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
  const containerRef = React.createRef();
  const overflowableRef = React.createRef();

  // Calculated viewport / DOM measurements
  const [width, setWidth] = useState();

  // Measure the browser-rendered dimensions of a DOM element
  const setVizDimensions = () => {
    const vizBoundingRect = containerRef.current.getBoundingClientRect();
    setWidth(vizBoundingRect.width);
  };

  // Chose this Events + custom CSS property approach, rather than setting
  // the scale factor as react state/props, because the latter causes rerender-ing
  // of the header and logo, and performed much choppier than DOM-manipulating
  // custom CSS properties with transitions.
  const dispatchScrollRatioEvent = () => {
    const contentElem = overflowableRef.current;
    if (!contentElem) return;

    const { clientHeight, scrollHeight, scrollTop } = contentElem;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);

    // Dispatch a custom scrollRatio change event
    const scrollRatioEvent = new CustomEvent('scrollRatio', {
      detail: { scrollRatio },
    });
    document.body.dispatchEvent(scrollRatioEvent);
  };

  useLayoutEffect(() => {
    // 1. First load
    setVizDimensions();
    dispatchScrollRatioEvent();

    // 2. Event Listeners
    // Resize events
    const debouncedSetDimensions = _debounce(setVizDimensions, 160);
    window.addEventListener('resize', debouncedSetDimensions);

    // Scroll events
    overflowableRef.current?.addEventListener(
      'scroll',
      dispatchScrollRatioEvent,
      {
        passive: true,
      }
    );

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedSetDimensions);
      overflowableRef.current?.removeEventListener(
        'scroll',
        dispatchScrollRatioEvent
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
