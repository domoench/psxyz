import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import {
  colors as themeColors,
  minWidthMediaQuery,
  fonts,
  fontSize as fontSizes,
} from '../theme';
import logo from '../assets/logo.svg';
import { GlobalStateContext } from '../context/GlobalContextProvider';
import Pill from './reusable/Pill';
import { colorsType } from './reusable/types';
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
  font-family: ${fonts.sansSerif};
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
          top={-6}
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
          fontSize={fontSizes.body * 0.9}
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

// Text that disappears on small screens
const BigScreenText = styled.span`
  padding-left: 0.4em;
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
}) => {
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;
  const fontSize = fontSizes.body * 0.9;

  return (
    <Pill
      borderRadius={20}
      colors={colors}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickHandler}
      className={className}
      fontSize={fontSize}
    >
      {dirty && (
        <StyledDirtyIndicator
          color={dirtyIndicatorColor}
          radius={5}
          top={-7}
          right={-3}
        />
      )}
      <FiltersSVGIcon color={colors.color} width={fontSize} />
      <BigScreenText>
        FILTER
      </BigScreenText>
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

const StyledFilterTogglePill = styled(FilterTogglePill)`
  position: relative;
`;

// TODO update styled component usage to this pattern wherever possible
// https://www.styled-components.com/docs/basics#how-do-styled-components-work-within-a-component
const Header = ({ toggleFiltersDrawer }) => {
  const { savedImageMakerIds, categoryFilterSlugs } = useContext(GlobalStateContext);
  const savedDirty = savedImageMakerIds.length > 0;
  const filtersDirty = categoryFilterSlugs.length > 0;
  const fontSize = fontSizes.body * 0.9;

  return (
    <StyledHeader>

      <Link to="/">
        <LogoImg src={logo} alt="Logo" />
      </Link>
      <nav>
        <NavPillList>
          <li>
            <StyledNavPill color={themeColors.red} to="/">
              <span>INDEX</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill color={themeColors.blue} to="/about/">
              <span>ABOUT</span>
            </StyledNavPill>
          </li>
          <li>
            <StyledNavPill color={themeColors.green} to="/support/">
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
              <>
                <SavedSVGIcon color={themeColors.black} width={fontSize} />
                <BigScreenText>
                  SAVED
                </BigScreenText>
              </>
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
