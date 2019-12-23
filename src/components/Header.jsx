import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors as themeColors, fonts } from '../theme';
import logo from '../assets/logo.svg';
import { GlobalStateContext } from '../context/GlobalContextProvider';
import { Pill, colorsType } from './Pill';
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
  ${props => `color: ${props.color};`}
  & svg {
    padding-right: 0.4em;
  }
  & svg path {
    ${props => `fill: ${props.color};`}
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
        stroke={themeColors.white}
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
}) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const colors = hover ? {
    color: themeColors.white,
    borderColor: color,
    bgColor: color,
  } : {
    color: active ? themeColors.white : themeColors.black,
    borderColor: color,
    bgColor: active ? color : themeColors.white,
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {dirty && (
        <StyledDirtyIndicator
          color={dirtyIndicatorColor}
          radius={5}
          top={-4}
          right={-1}
        />
      )}
      <StyledLink
        color={colors.color}
        to={to}
        getProps={({ isCurrent }) => {
          setActive(isCurrent);
        }}
        activeClassName="active"
      >
        <Pill
          borderRadius={20}
          colors={colors}
        >
          {children}
        </Pill>
      </StyledLink>
    </div>
  );
};

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

const FilterTogglePill = ({
  clickHandler,
  dirty,
  dirtyIndicatorColor,
  className,
  defaultColors,
  hoverColors,
}) => {
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <Pill
      borderRadius={20}
      colors={colors}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickHandler}
      className={className}
    >
      {dirty && (
        <StyledDirtyIndicator
          color={dirtyIndicatorColor}
          radius={5}
          top={-4}
          right={-4}
        />
      )}
      <FiltersSVGIcon color={colors.color} />
      FILTER
    </Pill>
  );
};

FilterTogglePill.propTypes = {
  clickHandler: PropTypes.func,
  dirty: PropTypes.bool,
  dirtyIndicatorColor: PropTypes.string,
  defaultColors: colorsType.isRequired,
  hoverColors: colorsType.isRequired,
  className: PropTypes.string,
};

// TODO: Lots of duplication from StyledNavPill. How to coallesce?
const StyledFilterTogglePill = styled(FilterTogglePill)`
  font-family: ${fonts.sansSerif};
  position: relative;

  & svg {
    padding-right: 0.5em;
  }
`;

// TODO update styled component usage to this pattern wherever possible
// https://www.styled-components.com/docs/basics#how-do-styled-components-work-within-a-component
const Header = ({ toggleFiltersDrawer }) => {
  const { savedImageMakerIds, categoryFilterSlugs } = useContext(GlobalStateContext);
  const savedDirty = savedImageMakerIds.length > 0;
  const filtersDirty = categoryFilterSlugs.length > 0;

  return (
    <StyledHeader>
      <LogoImg src={logo} alt="Logo" />
      <nav>
        <NavPillList>
          <li>
            <StyledNavPill color={themeColors.red} to="/">
              <span>INDEX</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill color={themeColors.green} to="/about/">
              <span>ABOUT</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill color={themeColors.blue} to="/support/">
              <span>SUPPORT</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill
              to="/saved/"
              color={themeColors.black}
              dirty={savedDirty}
              dirtyIndicatorColor={themeColors.red}
            >
              <SavedSVGIcon color={themeColors.black} />
              SAVED
            </StyledNavPill>
          </li>
          <li>
            <StyledFilterTogglePill
              clickHandler={toggleFiltersDrawer}
              dirty={filtersDirty}
              dirtyIndicatorColor={themeColors.green}
              defaultColors={{
                color: themeColors.black,
                borderColor: themeColors.black,
                bgColor: themeColors.white,
              }}
              hoverColors={{
                color: themeColors.white,
                borderColor: themeColors.green,
                bgColor: themeColors.green,
              }}
            />
          </li>
        </NavPillList>
      </nav>
    </StyledHeader>
  );
};

Header.propTypes = {
  toggleFiltersDrawer: PropTypes.func,
};

export default Header;
