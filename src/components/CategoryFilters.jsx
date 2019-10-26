import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CategoryFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: baseline;
`;

const CatFilterToggle = ({
  className,
  name,
  isSelected,
  clickHandler,
}) => (
  <div
    className={className}
    onClick={clickHandler}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
  >
    <span>{name}</span>
    {isSelected && (
      <span
        role="img"
        aria-label="checkmark"
      >
        {' ✅'}
      </span>
    )}
  </div>
);

CatFilterToggle.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  isSelected: PropTypes.bool,
  clickHandler: PropTypes.func,
};

const StyledCatFilterToggle = styled(CatFilterToggle)`
  padding: 0.2em 1em;
`;

const CategoryFilters = ({
  categories,
  selectedCats,
  updateSelected,
  show,
}) => {
  if (!show) { return null; }

  return (
    <CategoryFilterWrapper>
      {
        categories.map((cat) => {
          const isSelected = new Set(selectedCats).has(cat.node.slug);
          return (
            <StyledCatFilterToggle
              name={cat.node.name}
              isSelected={isSelected}
              clickHandler={updateSelected(cat.node.slug)}
              key={cat.node.id}
            />
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
