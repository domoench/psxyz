import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Splash from './Splash';
import styles from './Layout.module.less';

const Layout = ({ children }) => {
  if (process.env.GATSBY_IN_DEV === 'true') {
    return <Splash />;
  }
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
