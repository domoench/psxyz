import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import {
  GlobalStateContext,
} from '../context/GlobalContextProvider';

const Saved = ({ data }) => {
  const state = useContext(GlobalStateContext);
  const savedImageMakerIdSet = new Set(state.savedImageMakerIds);
  const imageMakers = data.allContentfulCreator.edges;
  const imageMakersToDisplay = imageMakers.filter(e => savedImageMakerIdSet.has(e.node.id));

  return (
    <Layout
      setShowFilters={() => {}}
      showFilters={false}
    >
      <span>{`Saved Creators: ${imageMakersToDisplay.map(e => e.node.name).join(', ')}`}</span>
    </Layout>
  );
};

Saved.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Saved;

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
        }
      }
    }
  }
`;
