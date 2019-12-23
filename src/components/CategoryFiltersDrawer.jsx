import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

import {
  fonts,
  colorForIdx,
  overlayColors,
} from '../theme';

/* TODO:
 * - Squishing header and about section
 *   - This library does exactly what we need: https://github.com/madou/react-sticky-header/blob/master/src/ReactStickyHeader.js
 *     Use it, or re-implement yourself
 * - The filters don't wrap in mobile view. Is grid (with media queries) the right fit here? Flex?
 */

const CategoryFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

// TODO make use of Pill component
const CatFilterLabel = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 15px;
  margin: 4px;
  font-family: ${fonts.sansSerif};
  font-weight: 600;
  border: 1px solid black;
  border-radius: 30px/30px;
  text-transform: uppercase;
  &:hover {
    ${props => `color: ${props.color};`}
    ${props => `border: 1px solid ${props.color};`}
  }
  &.selected {
    ${props => `background: ${props.color};`}
    ${props => `border: 1px solid ${props.color};`}
    color: white;
  }
`;

const CatFilter = ({
  className,
  name,
  isSelected,
  clickHandler,
  color,
}) => (
  <div
    className={className}
    onClick={clickHandler}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
  >
    <CatFilterLabel
      className={`${isSelected ? 'selected' : ''}`}
      color={color}
    >
      {name}
    </CatFilterLabel>
  </div>
);

CatFilter.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  isSelected: PropTypes.bool,
  clickHandler: PropTypes.func,
  color: PropTypes.string,
};

const StyledCatFilter = styled(CatFilter)`
  display: flex;
  &:focus {
    outline: none;
  }
`;

// TODO add Close and Clear All buttons
const CategoryFiltersDrawer = ({
  categories,
  categoryFilterSlugs,
  updateSelected,
  showFilters,
  toggleFiltersDrawer,
}) => (
  <Drawer
    open={showFilters}
    anchor="right"
    onClose={toggleFiltersDrawer}
  >
    <CategoryFilterWrapper>
      {
        categories.map((cat, idx) => {
          const isSelected = new Set(categoryFilterSlugs).has(cat.node.slug);
          return (
            <div key={cat.node.id}>
              <StyledCatFilter
                name={cat.node.name}
                isSelected={isSelected}
                clickHandler={updateSelected(cat.node.slug)}
                color={colorForIdx(idx, overlayColors)}
              />
            </div>
          );
        })
      }
    </CategoryFilterWrapper>
  </Drawer>
);

CategoryFiltersDrawer.propTypes = {
  categories: PropTypes.array,
  categoryFilterSlugs: PropTypes.array,
  updateSelected: PropTypes.func,
  showFilters: PropTypes.bool,
  toggleFiltersDrawer: PropTypes.bool,
};

export default CategoryFiltersDrawer;
