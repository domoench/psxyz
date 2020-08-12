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
  console.log(location);
  const imageMakers = data.allContentfulCreator.edges;
  const categories = data.allContentfulCategory.edges;
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useContext(GlobalDispatchContext);
  const { categoryFilterSlugs } = useContext(GlobalStateContext);

  // Read URL for query params specifying category
  /* TODO How can you merge filter state from URL params and from saved state
  const queryParamCatSlugs = new URLSearchParams(location.search).getAll('cat');
  dispatch({
    type: 'SET_CATEGORY_FILTERS',
    value: queryParamCatSlugs,
  });
  */

  const updateSelected = categorySlug => () => {
    dispatch({
      type: 'ADD_OR_DELETE_CATEGORY_FILTER',
      value: categorySlug,
    });

    // Update URL params to reflect filters
    /* TODO
      const newSelectedCatsSet = new Set(dispReturn.categoryFilterSlugs);
      const params = new URLSearchParams();
      newSelectedCatsSet.forEach(cat => params.append('cat', cat));
      const history = createBrowserHistory();
      history.push({
        pathname: '',
        search: params.toString(),
        state: {},
      });
      */
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
    <Layout toggleFiltersDrawer={toggleFiltersDrawer} activeNavFilter>
      <>
        <CategoryFiltersDrawer
          categories={categories}
          categoryFilterSlugs={categoryFilterSlugs}
          updateSelected={updateSelected}
          showFilters={showFilters}
          toggleFiltersDrawer={toggleFiltersDrawer}
        />
        <AboutBlurb />
        <ImageGridAnimated imageMakers={imageMakersToDisplay} />
      </>
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
              ...GatsbyContentfulFluid
            }
          }
          categories {
            id
            name
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
