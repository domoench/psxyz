import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
`;

const Layout = ({ children, setShowFilters, showFilters }) => (
  <Container>
    <Header setShowFilters={setShowFilters} showFilters={showFilters} />
    {children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.element,
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
};

export default Layout;
