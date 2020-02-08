import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1 0 auto;
`;

const FooterWrapper = styled.div`
  flex-shrink: 0;
`;

const Layout = ({ children, toggleFiltersDrawer }) => (
  <Container>
    <Header toggleFiltersDrawer={toggleFiltersDrawer} />
    <Content>
      {children}
    </Content>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.element,
  toggleFiltersDrawer: PropTypes.func,
};

export default Layout;
