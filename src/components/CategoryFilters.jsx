import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  fonts,
  colorForIdx,
  overlayColors,
} from '../theme';

const CategoryFilterWrapper = styled.div`
  padding: 1em 0.5em;
  display: grid;
  grid-column-gap: 1em;
  width: max-content;
  grid-auto-flow: column;
  grid-template-rows: auto auto auto auto auto;
  grid-template-columns: min-content;
  white-space: nowrap;
`;

const CatFilterLabel = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 15px;
  margin: 4px;
  font-family: ${fonts.sansSerif};
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

const CategoryFilters = ({
  categories,
  selectedCats,
  updateSelected,
  show,
}) => {
  if (!show) { return null; }
  console.log(colorForIdx(3, overlayColors));

  return (
    <CategoryFilterWrapper>
      {
        categories.map((cat, idx) => {
          const isSelected = new Set(selectedCats).has(cat.node.slug);
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
  );
};

CategoryFilters.propTypes = {
  categories: PropTypes.array,
  selectedCats: PropTypes.array,
  updateSelected: PropTypes.func,
  show: PropTypes.bool,
};

export default CategoryFilters;
