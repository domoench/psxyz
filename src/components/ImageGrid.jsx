import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import styled from 'styled-components';
import { breakpoints, colors } from '../theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media(max-width: ${breakpoints.sm}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageGrid = ({ creators }) => {
  const duplicated = [...creators, ...creators, ...creators, ...creators, ...creators]; // TODO
  return (
    <Grid>
      {
        duplicated.map(({ node }) => {
          const creator = node;
          return (
            <Img fluid={creator.mainImage.fluid} />
          );
        })
      }
    </Grid>
  );
};

ImageGrid.propTypes = {
  creators: PropTypes.array.isRequired,
};

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
    {
      categories.map(ctg => (
        <li key={ctg.id}>
          <Link to={`/?cat=${ctg.slug}`}>{ctg.name}</Link>
        </li>
      ))
    }
  </StyledCategoryList>
);

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default ImageGrid;
