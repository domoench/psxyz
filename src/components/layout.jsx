import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';

const Layout = ({ children }) => (
  <div style={{ margin: '0 auto', maxWidth: 650, padding: '1rem 1rem' }}>
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
