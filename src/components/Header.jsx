import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors, fonts } from '../theme';
import logo from '../assets/logo.svg';
import { GlobalStateContext } from '../context/GlobalContextProvider';
import SavedSVGIcon from './svg/saved';
import FiltersSVGIcon from './svg/filters';

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
    & svg path {
      fill: ${colors.white};
    }
  }
`;

const DirtyIndicator = ({
  color,
  radius, // In pixels
  className,
}) => {
  const borderWidth = 2;
  return (
    <svg
      height={Math.floor(2 * (radius + borderWidth))}
      width={Math.floor(2 * (radius + borderWidth))}
      className={className}
    >
      <circle
        cx={Math.floor(radius + borderWidth)}
        cy={Math.floor(radius + borderWidth)}
        r={radius}
        fill={color}
        stroke={colors.white}
        strokeWidth={borderWidth}
      />
    </svg>
  );
};

DirtyIndicator.propTypes = {
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const StyledDirtyIndicator = styled(DirtyIndicator)`
  position: absolute;
  top: ${props => `${props.top}px`};
  right: ${props => `${props.right}px`};
`;

const NavPill = ({
  to,
  color,
  dirtyIndicatorColor,
  children,
  className,
  dirty,
}) => (
  <div className={className}>
    {dirty && (
      <StyledDirtyIndicator
        color={dirtyIndicatorColor}
        radius={5}
        top={-12}
        right={-2}
      />
    )}
    <StyledLink
      color={color}
      to={to}
      activeClassName="active"
    >
      {children}
    </StyledLink>
  </div>
);

NavPill.propTypes = {
  to: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.element,
  className: PropTypes.string,
  dirty: PropTypes.bool,
  dirtyIndicatorColor: PropTypes.string,
};

const StyledNavPill = styled(NavPill)`
  position: relative;
`;

const FuncPill = ({
  clickHandler,
  children,
  className,
  dirty,
  dirtyIndicatorColor,
}) => (
  <span
    className={className}
    onClick={clickHandler}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
  >
    {dirty && (
      <StyledDirtyIndicator
        color={dirtyIndicatorColor}
        radius={5}
        top={-4}
        right={-4}
      />
    )}
    {children}
  </span>
);

FuncPill.propTypes = {
  clickHandler: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string,
  dirty: PropTypes.bool,
  dirtyIndicatorColor: PropTypes.string,
};

// TODO: Lots of duplication from StyledNavPill. How to coallesce?
const StyledFuncPill = styled(FuncPill)`
  font-family: ${fonts.sansSerif};
  border: ${props => `1px solid ${props.color}`};
  border-radius: 30px/30px;
  color: ${colors.black};
  background: ${colors.white};
  padding: 0.5em 1em;
  position: relative;
  &:focus {
    outline: none;
  }
`;

// TODO update styled component usage to this pattern wherever possible
// https://www.styled-components.com/docs/basics#how-do-styled-components-work-within-a-component
const Header = ({ setShowFilters, showFilters }) => {
  const { savedImageMakerIds, categoryFilterSlugs } = useContext(GlobalStateContext);
  const savedDirty = savedImageMakerIds.length > 0;
  const filtersDirty = categoryFilterSlugs.length > 0;

  return (
    <StyledHeader>
      <LogoImg src={logo} alt="Logo" />
      <nav>
        <NavPillList>
          <li>
            <StyledNavPill color={colors.red} to="/">
              <span>INDEX</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill color={colors.green} to="/about/">
              <span>ABOUT</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill color={colors.blue} to="/support/">
              <span>SUPPORT</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill
              to="/saved/"
              color={colors.black}
              dirty={savedDirty}
              dirtyIndicatorColor={colors.red}
            >
              <span>
                <SavedSVGIcon color={colors.black} />
                {' SAVED'}
              </span>
            </StyledNavPill>
          </li>
          <li>
            <StyledFuncPill
              clickHandler={() => setShowFilters(!showFilters)}
              color={colors.black}
              dirty={filtersDirty}
              dirtyIndicatorColor={colors.green}
            >
              <FiltersSVGIcon
                color={showFilters ? colors.red : colors.black}
              />
            </StyledFuncPill>
          </li>
        </NavPillList>
      </nav>
    </StyledHeader>
  );
};

Header.propTypes = {
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
};

export default Header;
