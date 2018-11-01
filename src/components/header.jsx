import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Navbar } from 'react-bootstrap';

// Using the bootstrap Nav and NavItem components doesn't allow me to use Gatsby's
// Link components inside them, so here we hardcode the bootstrap HTML for those
// components
export default () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          [PSxyz]
        </Link>
      </Navbar.Brand>
    </Navbar.Header>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about/">About</Link>
        </li>
      </ul>
    </div>
  </Navbar>
);
