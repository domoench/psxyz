import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CategoryFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: baseline;
`;

const CheckIcon = styled.span`
  width: 30px;
  text-align: center;
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
    <CheckIcon
      role="img"
      aria-label="checkmark"
    >
      {isSelected ? '✅' : ' '}
    </CheckIcon>
    <span>{name}</span>
  </div>
);

CatFilterToggle.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  isSelected: PropTypes.bool,
  clickHandler: PropTypes.func,
};

const StyledCatFilterToggle = styled(CatFilterToggle)`
  display: flex;
  align-items: center;
  height: 30px;
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
