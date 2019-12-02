import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors, fonts } from '../theme';
import logo from '../assets/logo.svg';
import saved from '../assets/saved.svg';
import filters from '../assets/filters.svg';

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
  border-radius: 30px/30px;
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

const FuncPill = ({ clickHandler, children, className }) => (
  <span
    className={className}
    onClick={clickHandler}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
  >
    {children}
  </span>
);

FuncPill.propTypes = {
  clickHandler: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string,
};

// TODO: Lots of duplication from StyledNavPill. How to coallesce?
const StyledFuncPill = styled(FuncPill)`
  font-family: ${fonts.sansSerif};
  border: ${props => `1px solid ${props.color}`};
  border-radius: 30px/30px;
  color: ${colors.black};
  background: ${colors.white};
  padding: 0.5em 1em;
  &:focus {
    outline: none;
  }
`;

const Header = ({ setShowFilters, showFilters }) => (
  <StyledHeader>
    <LogoImg src={logo} alt="Logo" />
    <nav>
      <NavPillList>
        <li>
          <NavPill color={colors.red} to="/">
            <span>INDEX</span>
          </NavPill>
        </li>
        <li>
          <NavPill color={colors.green} to="/about/">
            <span>ABOUT</span>
          </NavPill>
        </li>
        <li>
          <NavPill color={colors.blue} to="/support/">
            <span>SUPPORT</span>
          </NavPill>
        </li>
        <li>
          <NavPill color={colors.blue} to="/saved/">
            <img src={saved} alt="saved creators" />
          </NavPill>
        </li>
        <li>
          <StyledFuncPill
            clickHandler={() => setShowFilters(!showFilters)}
            color={colors.red}
          >
            <img src={filters} alt="category filters" />
          </StyledFuncPill>
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
