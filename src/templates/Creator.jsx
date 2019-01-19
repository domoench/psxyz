import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import styles from '../components/Creator.module.less';

const Creator = ({ data }) => {
  const creator = data.contentfulCreator;
  return (
    <Layout>
      <div className={styles.creator}>
        <h1>{creator.name}</h1>
        <p>{data.contentfulCreator.childContentfulCreatorBioTextNode.bio}</p>
        <ul>
          {creator.images.map(image => (
            <li key={image.id}>
              <Img fluid={image.fluid} />
            </li>
          ))}
        </ul>
      </div>
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
        fluid(maxWidth: 1200) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
