import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from '../css/header.module.less';

// Using the bootstrap Nav and NavItem components doesn't allow me to use Gatsby's
// Link components inside them, so here we hardcode the bootstrap HTML for those
// components
export default () => (
  <header className={styles.header}>
    <div className="container">
      <div className={styles.logo}>
        <Link to="/">
          [PSxyz]
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/submit/">Submit</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
