import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors } from '../theme';

const StyledCategoryList = styled.ul`
  list-style: none;
  text-align: center;
  font-size: 18px;
  margin: 0;
  & a {
    color: ${colors.blue};
  }
`;

const CategoryList = ({ categories }) => (
  <StyledCategoryList>
    {categories.map(ctg => (
      <li key={ctg.id}>
        <Link to={`/?cat=${ctg.slug}`}>{ctg.name}</Link>
      </li>
    ))}
  </StyledCategoryList>
);

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};
