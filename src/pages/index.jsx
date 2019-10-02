import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import URLSearchParams from '@ungap/url-search-params';

import Layout from '../components/Layout';
import ImageGrid from '../components/ImageGrid';
import { filterByCategory } from '../utils';

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
        <ImageGrid creators={creatorsToDisplay} />
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
            fluid(maxWidth: 700, maxHeight: 700) {
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
