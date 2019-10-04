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
  color: ${props => (props.isActive ? colors.white : colors.black)};
  background: ${props => (props.isActive ? props.color : colors.white)};
`;

const NavPill = ({ to, color, children }) => (
  <StyledLink
    color={color}
    to={to}
    isActive={typeof window !== 'undefined' ? window.location.pathname === to : false}
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
          <NavPill color={colors.blue} to="/">INDEX</NavPill>
          <NavPill color={colors.red} to="/about">ABOUT</NavPill>
          <NavPill color={colors.green} to="/support">SUPPORT</NavPill>
        </li>
      </NavPillList>
    </nav>
  </Header>
);
