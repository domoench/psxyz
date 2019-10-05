import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors, fonts } from '../theme';

const Header = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
`;

const NavPillList = styled.ul`
  display: flex;
  list-style: none;
  padding: 1em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${fonts.sansSerif};
  border: ${props => `1px solid ${props.color}`};
  border-radius: 20%/50%;
  padding: 0.5em 1em;
  margin: 0 0.25em;
  color: ${colors.black};
  background: ${colors.white};
  &.active {
    color: ${colors.white};
    background: ${props => props.color};
  }
`;

const NavPill = ({ to, color, children }) => (
  <StyledLink
    color={color}
    to={to}
    activeClassName="active"
  >
    {children}
  </StyledLink>
);

NavPill.propTypes = {
  to: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.element,
};

const Logo = styled.span`
  font-size: 3em;
  font-family: ${fonts.sansSerif};
`;

export default () => (
  <Header>
    <Logo>PUBLIC SERVICE</Logo>
    <nav>
      <NavPillList>
        <li>
          <NavPill color={colors.red} to="/">INDEX</NavPill>
          <NavPill color={colors.green} to="/about/">ABOUT</NavPill>
          <NavPill color={colors.blue} to="/support/">SUPPORT</NavPill>
        </li>
      </NavPillList>
    </nav>
  </Header>
);
