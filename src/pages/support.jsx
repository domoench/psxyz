import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { Wrapper, Column } from '../components/newspaper';
import { colors, fonts, fontSize } from '../theme';

const DonateLink = styled.div`
  font-weight: 600;
  font-family: ${fonts.sansSerif};
  font-size: ${fontSize.body * 2}px;
  padding: 1em 0;
`;

const Support = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    <Wrapper color={colors.green}>
      <Column>
        <h1>Supporting Public Service is an investment in diversifying imagemaking.</h1>
        <p>
          Supporting Public Service is an investment in diversifying imagemaking. Donate to us via Venmo to help support costs of hosting and maintenence for this resource.
        </p>
        <DonateLink>
          [TODO] DONATE HERE →
        </DonateLink>
      </Column>
      <Column />
    </Wrapper>
  </Layout>
);

export default Support;
