import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  Grid, Image,
} from 'react-bootstrap';
import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Creator = ({ data }) => {
  const creator = data.contentfulCreator;
  return (
    <Layout>
      <Grid>
        <h1>{creator.name}</h1>
        <p>{data.contentfulCreator.childContentfulCreatorBioTextNode.bio}</p>
        <ul>
          {creator.images.map(image => (
            <li key={image.id}>
              <Image src={image.file.url} responsive />
            </li>
          ))}
        </ul>
      </Grid>
    </Layout>
  );
};

Creator.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Creator;

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
