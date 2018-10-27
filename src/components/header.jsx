import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const ListLink = ({ to, children }) => (
  <li style={{ display: 'inline-block', marginRight: '1rem' }}>
    <Link to={to}>{children}</Link>
  </li>
);

ListLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default () => (
  <header style={{ marginBottom: '1.5rem' }}>
    <Link to="/" style={{ textShadow: 'none', backgroundImage: 'none' }}>
      [PSxyz]
    </Link>
    <ul style={{ listStyle: 'none', float: 'right' }}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
    </ul>
  </header>
);
