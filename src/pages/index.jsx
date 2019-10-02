import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import URLSearchParams from '@ungap/url-search-params';
import Layout from '../components/Layout';
import CreatorThumbList from '../components/CreatorThumbList';

// Returns a new creators array, filtered by category slug
const filterByCategory = (catSlug, creators) => {
  const filtered = [];
  for (let i = 0; i < creators.length; i += 1) {
    // If the current creator contains the category, append it to result list
    if (creators[i].node.categories.findIndex(cat => cat.slug === catSlug) >= 0) {
      filtered.push(creators[i]);
    }
  }
  return filtered;
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creators: props.data.allContentfulCreator.edges,
    };
  }

  render() {
    // Check URL for query params specifying category
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    const categorySlug = params.get('cat');

    const { creators } = this.state;
    const creatorsToDisplay = (categorySlug !== null) ? filterByCategory(categorySlug, creators) : creators;
    return (
      <Layout>
        <CreatorThumbList creators={creatorsToDisplay} />
      </Layout>
    );
  }
}

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
            fluid(maxWidth: 700) {
              ...GatsbyContentfulFluid
            }
          }
          categories {
            id
            name
            slug
          }
          location
        }
      }
    }
  }
`;
