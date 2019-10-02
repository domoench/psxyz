import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';

const Container = styled.div`
  max-width: 970px;
  margin: 0 auto;
`;

const Layout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
