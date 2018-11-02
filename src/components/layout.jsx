import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
