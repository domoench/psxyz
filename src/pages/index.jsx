import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import URLSearchParams from '@ungap/url-search-params';
// import { createBrowserHistory } from 'history';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import ImageGridAnimated from '../components/ImageGridAnimated';
import CategoryFiltersDrawer from '../components/CategoryFiltersDrawer';
import AboutBlurb from '../components/AboutBlurb';
import { filterByCategory } from '../utils';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';

const Index = ({ data, location }) => {
  const imageMakers = data.allContentfulCreator.edges;
  const categories = data.allContentfulCategory.edges;
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useContext(GlobalDispatchContext);
  const { categoryFilterSlugs } = useContext(GlobalStateContext);

  const updateSelected = categorySlug => () => {
    dispatch({
      type: 'ADD_OR_DELETE_CATEGORY_FILTER',
      value: categorySlug,
    });
  };

  const toggleFiltersDrawer = event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setShowFilters(!showFilters);
  };

  const imageMakersToDisplay = filterByCategory(
    categoryFilterSlugs,
    imageMakers
  );
  return (
    <Layout
      toggleFiltersDrawer={toggleFiltersDrawer}
      location={location}
      activeNavFilter
    >
      {width => (
        <>
          <CategoryFiltersDrawer
            categories={categories}
            categoryFilterSlugs={categoryFilterSlugs}
            updateSelected={updateSelected}
            showFilters={showFilters}
            toggleFiltersDrawer={toggleFiltersDrawer}
          />
          <AboutBlurb width={width} />
          <ImageGridAnimated imageMakers={imageMakersToDisplay} width={width} />
        </>
      )}
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  {
    allContentfulCreator(sort: { fields: fields___sortId }) {
      edges {
        node {
          id
          slug
          name
          source
          images {
            id
          }
          bio {
            id
            bio
          }
          mainImage {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          categories {
            id
            practitionerName
            slug
          }
        }
      }
    }
    allContentfulCategory(sort: { fields: name }) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;
