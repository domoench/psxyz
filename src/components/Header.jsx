import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import {
  colors as themeColors,
  deviceSizeForWidth,
  minWidthMediaQuery,
  fontStyles,
} from '../theme';
import logo from '../assets/logo.svg';
import { GlobalStateContext } from '../context/GlobalContextProvider';
import Pill from './reusable/Pill';
import { colorsType } from './reusable/types';
import SavedSVGIcon from './svg/saved';
import FiltersSVGIcon from './svg/filters';

const DIRTY_INDICATOR_RADIUS = 7;
const NAV_PILL_PY = 4;
const NAV_PILL_PX = 15;

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  background: ${themeColors.grayTint};
`;

const LogoImg = styled.img`
  height: 60px;
  padding: 0.5em;
`;

const NavPillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0.25em;
  & li {
    margin: 0 0.35em;
    padding-bottom: 0.4em;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${fontStyles.title2.family};
  ${props => `color: ${props.color};`}
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
  fontSize,
  color,
  dirtyIndicatorColor,
  children,
  className,
  dirty,
  location,
}) => {
  const [hover, setHover] = useState(false);
  const active = location.pathname === to;
  const colors = hover
    ? {
        color: themeColors.white,
        borderColor: color,
        bgColor: color,
      }
    : {
        color: active ? themeColors.white : themeColors.black,
        borderColor: color,
        bgColor: active ? color : themeColors.transparent,
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
          radius={DIRTY_INDICATOR_RADIUS}
          top={-3}
          right={-2}
        />
      )}
      <StyledLink color={colors.color} to={to} activeClassName="active">
        <Pill
          borderRadius={26}
          colors={colors}
          py={NAV_PILL_PY}
          px={NAV_PILL_PX}
          fontSize={fontSize}
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
  fontSize: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
};

const StyledNavPill = styled(NavPill)`
  line-height: 1;
  position: relative;
`;

// Text that disappears on small screens
const BigScreenText = styled.span`
  padding-left: 0.4em;
  line-height: 1;
  display: none;
  ${minWidthMediaQuery('sm')} {
    display: initial;
  }
`;

const FilterTogglePill = ({
  clickHandler,
  dirty,
  dirtyIndicatorColor,
  className,
  defaultColors,
  hoverColors,
  active,
  fontSize,
}) => {
  const [hover, setHover] = useState(false);

  let colors;
  if (!active) {
    colors = {
      color: themeColors.gray,
      borderColor: themeColors.gray,
      bgColor: themeColors.transparent,
    };
  } else if (hover) {
    colors = hoverColors;
  } else {
    colors = defaultColors;
  }

  return (
    <Pill
      borderRadius={26}
      py={NAV_PILL_PY}
      px={NAV_PILL_PX}
      colors={colors}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={active ? clickHandler : () => {}}
      className={className}
      fontSize={fontSize}
      cursor={active ? 'pointer' : 'not-allowed'}
    >
      {dirty && (
        <StyledDirtyIndicator
          color={active ? dirtyIndicatorColor : themeColors.gray}
          radius={DIRTY_INDICATOR_RADIUS}
          top={-5}
          right={-4}
        />
      )}
      <FiltersSVGIcon color={colors.color} width={fontSize} />
      <BigScreenText>FILTER</BigScreenText>
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
  active: PropTypes.bool,
  fontSize: PropTypes.number.isRequired,
};

const StyledFilterTogglePill = styled(FilterTogglePill)`
  position: relative;
`;

// TODO update styled component usage to this pattern wherever possible
// https://www.styled-components.com/docs/basics#how-do-styled-components-work-within-a-component
const Header = ({ toggleFiltersDrawer, width, activeNavFilter, location }) => {
  const { savedImageMakerIds, categoryFilterSlugs } = useContext(
    GlobalStateContext
  );
  const savedDirty = savedImageMakerIds.length > 0;
  const filtersDirty = categoryFilterSlugs.length > 0;
  const deviceSize = deviceSizeForWidth(width);
  const fontSize =
    deviceSize === 'xs' ? fontStyles.title3.size : fontStyles.title2.size;

  return (
    <StyledHeader>
      <Link to="/">
        <LogoImg src={logo} alt="Logo" />
      </Link>
      <nav>
        <NavPillList>
          <li>
            <StyledNavPill
              color={themeColors.red}
              to="/"
              fontSize={fontSize}
              location={location}
            >
              <span>INDEX</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill
              color={themeColors.blue}
              to="/about/"
              fontSize={fontSize}
              location={location}
            >
              <span>ABOUT</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill
              to="/saved/"
              color={themeColors.black}
              dirty={savedDirty}
              dirtyIndicatorColor={themeColors.red}
              fontSize={fontSize}
              location={location}
            >
              <>
                <SavedSVGIcon color={themeColors.black} width={fontSize} />
                <BigScreenText>SAVED</BigScreenText>
              </>
            </StyledNavPill>
          </li>
          <li>
            <StyledFilterTogglePill
              clickHandler={toggleFiltersDrawer}
              dirty={filtersDirty}
              dirtyIndicatorColor={themeColors.red}
              defaultColors={{
                color: themeColors.black,
                borderColor: themeColors.gray,
                bgColor: themeColors.transparent,
              }}
              hoverColors={{
                color: themeColors.white,
                borderColor: themeColors.green,
                bgColor: themeColors.green,
              }}
              active={activeNavFilter}
              fontSize={fontSize}
            />
          </li>
        </NavPillList>
      </nav>
    </StyledHeader>
  );
};

Header.propTypes = {
  toggleFiltersDrawer: PropTypes.func,
  width: PropTypes.number.isRequired,
  activeNavFilter: PropTypes.bool,
};

export default Header;
