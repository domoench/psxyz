import React from 'react';
import PropTypes from 'prop-types';
import { Grid as MUIGrid } from '@material-ui/core';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors } from '../theme';

const Name = styled.span`
  text-align: center;
`;

const GridRow = styled(MUIGrid)`
  padding: 1rem;
`;

// A list of creators, with name and picture
// TODO: Does a grid really give you anyhting here? just style rows yourself?
const CreatorThumbList = ({ creators }) => (
  creators.map(({ node }) => {
    const creator = node;
    return (
      <GridRow container spacing={24} key={creator.id}>
        <MUIGrid item xs={12} s={12} md={3}>
          <Img fluid={creator.mainImage.fluid} />
        </MUIGrid>

        <MUIGrid item xs={12} s={6} md={3}>
          <Name>
            <span>{creator.name}</span>
          </Name>
        </MUIGrid>

        <MUIGrid item xs={6} s={3} md={3}>
          <CategoryList categories={creator.categories} className="catList" />
        </MUIGrid>

        <MUIGrid item xs={6} s={3} md={3}>{creator.location}</MUIGrid>
      </GridRow>
    );
  })
);

CreatorThumbList.propTypes = {
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

export default CreatorThumbList;
