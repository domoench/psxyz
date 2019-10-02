import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

const HeaderList = styled.ul`
  list-style: none;
`;

const Link = styled(GatsbyLink)`
  text-decoration: none;
`;

export default () => (
  <header>
    <div className="container">
      <nav>
        <HeaderList>
          <li>
            <Link to="/">[PSxyz]</Link>
          </li>
        </HeaderList>
      </nav>
    </div>
  </header>
);
