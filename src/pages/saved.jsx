import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

import { colors as themeColors, fontStyles } from '../theme';
import ImageGridAnimated from '../components/ImageGridAnimated';
import Layout from '../components/Layout';
import { GlobalStateContext } from '../context/GlobalContextProvider';

const NoSavedImageMakers = styled.div`
  padding: 2em;
  font-family: ${fontStyles.title1.family};
  font-size: ${fontStyles.title1.size}px;
  line-height: ${fontStyles.title1.lineHeight};
  & p {
    padding-bottom: 0.25em;
    text-transform: uppercase;
  }
  & a {
    color: ${themeColors.black};
    &:hover {
      color: ${themeColors.red};
    }
  }
`;

const Saved = ({ data, location }) => {
  const state = useContext(GlobalStateContext);
  const savedImageMakerIdSet = new Set(state.savedImageMakerIds);
  const imageMakers = data.allContentfulCreator.edges;
  const imageMakersToDisplay = imageMakers.filter(e =>
    savedImageMakerIdSet.has(e.node.id)
  );

  return (
    <Layout location={location} setShowFilters={() => {}} showFilters={false}>
      {width => (
        <>
          {imageMakersToDisplay.length === 0 && (
            <NoSavedImageMakers>
              <p>You haven&apos;t saved any profiles yet.</p>
              <p>
                <Link to="/">Browse the Index →</Link>
              </p>
            </NoSavedImageMakers>
          )}
          <ImageGridAnimated imageMakers={imageMakersToDisplay} width={width} />
        </>
      )}
    </Layout>
  );
};

Saved.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Saved;

export const query = graphql`
  {
    allContentfulCreator(sort: { fields: fields___sortId }) {
      edges {
        node {
          id
          slug
          name
          images {
            id
          }
          mainImage {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyContentfulFluid
            }
          }
          categories {
            id
            practitionerName
            slug
          }
        }
      }
    }
  }
`;
