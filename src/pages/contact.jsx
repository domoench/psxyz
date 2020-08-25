import React from 'react';

import Layout from '../components/Layout';
import { Wrapper, Column } from '../components/newspaper';
import { colors } from '../theme';
import Anchor from '../components/reusable/Anchor';

const Contact = ({ location }) => (
  // TODO: What if a user clicks show filters on this page? Should we hide the filters button?
  <Layout
    location={location}
    toggleFiltersDrawer={() => {}}
    showFilters={false}
  >
    {(/* width */) => (
      <Wrapper color={colors.blue}>
        <Column>
          <p>
            To keep in-touch with all things Public Service share your e-mail
            with us (we won’t ever sell your data or do other evil shit).
          </p>
          <p>
            <Anchor
              href="mailto:people@publicservice.com"
              altText="people@publicservice.com"
              underline
            >
              people@publicservice.com
            </Anchor>
          </p>
        </Column>
        <Column />
      </Wrapper>
    )}
  </Layout>
);

export default Contact;
