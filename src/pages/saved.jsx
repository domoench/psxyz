import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import { colors as themeColors, fontSize, fonts } from '../theme';
import ImageGridAnimated from '../components/ImageGridAnimated';
import Layout from '../components/Layout';
import {
  GlobalStateContext,
} from '../context/GlobalContextProvider';

const NoSavedImageMakers = styled.div`
  padding: 2em;
  font-family: ${fonts.serif};
  font-size: ${fontSize.body * 1.2}px;
  & p {
    padding-bottom: 0.25em;
  }
  & a {
    color: ${themeColors.black};
    &:hover {
      color: ${themeColors.red};
    }
  }
`;

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
      {imageMakersToDisplay.length === 0 && (
        <NoSavedImageMakers>
          <p>You haven&apos;t saved any profiles yet.</p>
          <p>
            <Link
              to="/"
            >
              Browse the Index →
            </Link>
          </p>
        </NoSavedImageMakers>
      )}
      <ImageGridAnimated imageMakers={imageMakersToDisplay} />
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
