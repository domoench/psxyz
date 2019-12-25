import React from 'react';

import Layout from '../components/Layout';
import { Wrapper, Column } from '../components/newspaper';
import { colors } from '../theme';

const Contact = () => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    <Wrapper color={colors.blue}>
      <Column>
        <h1>Please Contact Us. TODO</h1>
        <p>
          Send us an email or something. TODO
        </p>
      </Column>
      <Column />
    </Wrapper>
  </Layout>
);

export default Contact;
