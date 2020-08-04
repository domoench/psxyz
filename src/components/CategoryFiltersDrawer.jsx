import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

import {
  fontStyles,
  colors as themeColors,
  colorForIdx,
  overlayColors,
} from '../theme';
import Pill from './reusable/Pill';
import { colorsType } from './reusable/types';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

/* TODO:
 * - Squishing header and about section
 *   - This library does exactly what we need: https://github.com/madou/react-sticky-header/blob/master/src/ReactStickyHeader.js
 *     Use it, or re-implement yourself
 */

const CategoryFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  & h2 {
    font-family: ${fontStyles.title2.family};
    font-size: ${fontStyles.title2.size}px;
    color: ${themeColors.darkGray};
    padding-bottom: 1em;
  }
`;

const CatFilterLabel = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const StyledCatFilter = styled.div`
  display: flex;
  padding: 0.25em 0em;
  &:focus {
    outline: none;
  }
`;

const CatFilter = ({ name, isSelected, clickHandler, color }) => {
  const [hover, setHover] = useState(false);
  const colors = hover
    ? {
        color: themeColors.white,
        borderColor: color,
        bgColor: color,
      }
    : {
        color: isSelected ? themeColors.white : themeColors.black,
        borderColor: themeColors.black,
        bgColor: isSelected ? themeColors.black : themeColors.white,
      };

  return (
    <StyledCatFilter>
      <Pill
        borderRadius={22}
        py={5}
        px={11}
        colors={colors}
        fontSize={fontStyles.title2.size}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickHandler}
      >
        <CatFilterLabel
          className={`${isSelected ? 'selected' : ''}`}
          color={color}
        >
          {name}
        </CatFilterLabel>
      </Pill>
    </StyledCatFilter>
  );
};

CatFilter.propTypes = {
  name: PropTypes.string,
  isSelected: PropTypes.bool,
  clickHandler: PropTypes.func,
  color: PropTypes.string,
};

const StyledControlPill = styled.div`
  padding: 1em;
`;

const ControlPill = ({
  defaultColors,
  hoverColors,
  clickHandler,
  children,
}) => {
  // TODO: This hover state pattern is really everywhere. refactor.
  // Maybe a withHover state 'decorator'?
  const [hover, setHover] = useState(false);
  const colors = hover ? hoverColors : defaultColors;

  return (
    <StyledControlPill>
      <Pill
        borderRadius={16}
        py={4}
        px={11}
        colors={colors}
        fontSize={fontStyles.title3.size}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickHandler}
      >
        <span>{children}</span>
      </Pill>
    </StyledControlPill>
  );
};

ControlPill.propTypes = {
  defaultColors: colorsType,
  hoverColors: colorsType,
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const StyledDrawer = styled(Drawer)`
  & .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const ControlPills = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryFiltersDrawer = ({
  categories,
  categoryFilterSlugs,
  updateSelected,
  showFilters,
  toggleFiltersDrawer,
}) => {
  const dispatch = useContext(GlobalDispatchContext);

  return (
    <StyledDrawer
      open={showFilters}
      anchor="right"
      onClose={toggleFiltersDrawer}
    >
      <ControlPills>
        <ControlPill
          clickHandler={toggleFiltersDrawer}
          defaultColors={{
            color: themeColors.black,
            borderColor: themeColors.black,
            bgColor: themeColors.white,
          }}
          hoverColors={{
            color: themeColors.white,
            borderColor: themeColors.black,
            bgColor: themeColors.black,
          }}
        >
          <span>X CLOSE</span>
        </ControlPill>
        <ControlPill
          clickHandler={() => dispatch({ type: 'CLEAR_CATEGORY_FILTERS' })}
          defaultColors={{
            color: themeColors.red,
            borderColor: themeColors.red,
            bgColor: themeColors.white,
          }}
          hoverColors={{
            color: themeColors.white,
            borderColor: themeColors.red,
            bgColor: themeColors.red,
          }}
        >
          <span>CLEAR ALL</span>
        </ControlPill>
      </ControlPills>
      <CategoryFilterWrapper>
        <h2>CATEGORY</h2>
        {categories.map((cat, idx) => {
          const isSelected = new Set(categoryFilterSlugs).has(cat.node.slug);
          return (
            <div key={cat.node.id}>
              <CatFilter
                name={cat.node.name}
                isSelected={isSelected}
                clickHandler={updateSelected(cat.node.slug)}
                color={colorForIdx(idx, overlayColors)}
              />
            </div>
          );
        })}
      </CategoryFilterWrapper>
    </StyledDrawer>
  );
};

CategoryFiltersDrawer.propTypes = {
  categories: PropTypes.array,
  categoryFilterSlugs: PropTypes.array,
  updateSelected: PropTypes.func,
  showFilters: PropTypes.bool,
  toggleFiltersDrawer: PropTypes.func,
};

export default CategoryFiltersDrawer;
