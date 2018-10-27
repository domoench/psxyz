import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export const Creator = ({ data }) => {
  const creator = data.contentfulCreator;
  return (
    <Layout>
      <h1>{creator.name}</h1>
      <p>{data.contentfulCreator.childContentfulCreatorBioTextNode.bio}</p>
      <ul>
        {creator.images.map(image => (
          <li key={image.id}>
            <img src={image.file.url} alt={creator.name} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Creator.propTypes = {
  data: PropTypes.object.isRequired,
};

// Fetch the creator data using Contentful GraphQL
// The creatorID template variable value is set in createPages
export const query = graphql`
  query($creatorID: String!) {
    contentfulCreator(id: {eq: $creatorID}) {
      id
      name
      childContentfulCreatorBioTextNode {
        bio
      }
      images {
        id
        file {
          url
        }
      }
    }
  }
`;
