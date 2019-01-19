import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import styles from './Layout.module.less';

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
