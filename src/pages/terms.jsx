import React from 'react';

import Layout from '../components/Layout';
import { Wrapper, Column } from '../components/newspaper';
import { colors } from '../theme';

const Terms = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout toggleFiltersDrawer={() => {}} showFilters={false}>
    <Wrapper color={colors.blue}>
      <Column>
        <h1>Public Service values privacy. TODO</h1>
        <p>
          TODO blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah blah blah
        </p>
      </Column>
      <Column />
    </Wrapper>
  </Layout>
);

export default Terms;
