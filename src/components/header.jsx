import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './header.module.less';

export default () => (
  <header className={styles.header}>
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">[PSxyz]</Link>
          </li>
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
