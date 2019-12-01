import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import URLSearchParams from '@ungap/url-search-params';
import { createBrowserHistory } from 'history';

import Layout from '../components/Layout';
import ImageGridAnimated from '../components/ImageGridAnimated';
import CategoryFilters from '../components/CategoryFilters';
import AboutBlurb from '../components/AboutBlurb';
import { filterByCategory } from '../utils';

const Index = ({ data, location }) => {
  const imageMakers = data.allContentfulCreator.edges;
  const categories = data.allContentfulCategory.edges;

  // Read URL for query params specifying category
  const queryParamCatSlugs = new URLSearchParams(location.search).getAll('cat');

  const [selected, setSelected] = useState(queryParamCatSlugs);
  const [showFilters, setShowFilters] = useState(false);

  const updateSelected = categorySlug => (
    () => {
      const selectedSet = new Set(selected);
      if (selectedSet.has(categorySlug)) {
        selectedSet.delete(categorySlug);
      } else {
        selectedSet.add(categorySlug);
      }
      setSelected(Array.from(selectedSet));

      // Update URL params to reflect filters
      const params = new URLSearchParams();
      selectedSet.forEach(cat => params.append('cat', cat));
      const history = createBrowserHistory();
      history.push({
        pathname: '',
        search: params.toString(),
        state: {},
      });
    }
  );

  const imageMakersToDisplay = filterByCategory(selected, imageMakers);
  return (
    <Layout setShowFilters={setShowFilters} showFilters={showFilters}>
      <CategoryFilters
        categories={categories}
        selectedCats={selected}
        updateSelected={updateSelected}
        showFilters={showFilters}
      />
      <AboutBlurb />
      <ImageGridAnimated imageMakers={imageMakersToDisplay} />
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
    allContentfulCreator (sort: {fields: fields___sortId}) {
      edges {
        node {
          id
          slug
          name
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
            practitionerName
          }
          location
        }
      }
    }
    allContentfulCategory(sort: {fields: name}) {
      edges {
        node {
          id
          name
          slug
          practitionerName
        }
      }
    }
  }
`;
