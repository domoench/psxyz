import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CreatorThumbList from '../components/creatorThumbList';

const Index = ({ data }) => (
  <Layout>
    <CreatorThumbList data={data} />
  </Layout>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
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
            file {
              url
            }
          }
          bio {
            id
            bio
          }
          mainImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
