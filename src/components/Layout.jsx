import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _debounce from 'lodash.debounce';

import Header from './Header';
import Footer from './Footer';

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Overflowable = styled.div`
  overflow: auto;
`;

const Content = styled.div`
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
  const containerRef = React.createRef();
  const overflowableRef = React.createRef();

  // Calculated viewport / DOM measurements
  const [width, setWidth] = useState();
  const [scrollRatio, setScrollRatio] = useState();

  // Measure the browser-rendered dimensions of a DOM element
  const setVizDimensions = () => {
    const vizBoundingRect = containerRef.current.getBoundingClientRect();
    setWidth(vizBoundingRect.width);
  };

  const calculateScrollRatio = () => {
    const contentElem = overflowableRef.current;
    if (!contentElem) return;

    const { clientHeight, scrollHeight, scrollTop } = contentElem;
    setScrollRatio(scrollTop / (scrollHeight - clientHeight));
  };

  useLayoutEffect(() => {
    setVizDimensions();

    // Resizing
    const debouncedSetDimensions = _debounce(() => setVizDimensions(), 160);
    window.addEventListener('resize', debouncedSetDimensions);

    // Scrolling through main content
    const debouncedScrollRatio = _debounce(() => calculateScrollRatio(), 10);
    overflowableRef.current?.addEventListener('scroll', debouncedScrollRatio, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedSetDimensions);
      overflowableRef.current?.removeEventListener('scroll', debouncedScrollRatio);
    };
  });

  // If we haven't calculated width yet (first load) render an empty grid on the
  // first paint.
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
        scrollRatio={scrollRatio}
      />
      <Overflowable ref={overflowableRef}>
        <Content>
          {children && children(width)}
          <Footer width={width} location={location} />
        </Content>
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
