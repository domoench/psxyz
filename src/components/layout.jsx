import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import styles from './layout.module.less';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
