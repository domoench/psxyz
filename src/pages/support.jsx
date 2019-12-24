import React from 'react';

import Layout from '../components/Layout';
import { Wrapper, Column } from '../components/newspaper';
import { colors } from '../theme';

const Support = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    <Wrapper color={colors.blue}>
      <Column>
        <h1>Supporting Public Service is an investment in diversifying imagemaking.</h1>
        <p>
          Supporting Public Service is an investment in diversifying imagemaking. Donate to us via Venmo to help support costs of hosting and maintenence for this resource.
        </p>
      </Column>
      <Column />
    </Wrapper>
  </Layout>
);

export default Support;
