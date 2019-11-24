import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors, fonts } from '../theme';
import logo from '../logo.svg';

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
`;

const LogoImg = styled.img`
  height: 60px;
`;

const NavPillList = styled.ul`
  display: flex;
  list-style: none;
  padding: 1em;
  & li {
    margin: 0 0.25em;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${fonts.sansSerif};
  border: ${props => `1px solid ${props.color}`};
  border-radius: 20%/50%;
  color: ${colors.black};
  background: ${colors.white};
  padding: 0.5em 1em;
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

const FuncPill = ({ clickHandler, label }) => (
  <span
    onClick={clickHandler}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
  >
    {label}
  </span>
);

FuncPill.propTypes = {
  clickHandler: PropTypes.func,
  label: PropTypes.string.isRequired,
};

const Header = ({ setShowFilters, showFilters }) => (
  <StyledHeader>
    <LogoImg src={logo} alt="Logo" />
    <nav>
      <NavPillList>
        <li>
          <NavPill color={colors.red} to="/">INDEX</NavPill>
        </li>
        <li>
          <NavPill color={colors.green} to="/about/">ABOUT</NavPill>
        </li>
        <li>
          <NavPill color={colors.blue} to="/support/">SUPPORT</NavPill>
        </li>
        <li>
          <FuncPill clickHandler={() => { console.log('TODO'); }} label="Saved" />
        </li>
        <li>
          <FuncPill
            clickHandler={() => setShowFilters(!showFilters)}
            label="Filters"
          />
        </li>
      </NavPillList>
    </nav>
  </StyledHeader>
);

Header.propTypes = {
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
};

export default Header;
