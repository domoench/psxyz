import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { Wrapper, Column, Title1 } from '../components/newspaper';
import { colors, fontStyles } from '../theme';

// Put all styling in a giant glob, because I don't have access to the internals
// of the component here (it comes from markdown).
const Privacy = styled.div`
  padding: 25px 30px;
  color: ${colors.white};
  font-family: ${fontStyles.body1.family};
  font-size: ${fontStyles.body1.size}px;

  h2 {
    padding-bottom: 12px;
    font-size: ${fontStyles.title2.size}px;
    font-family: ${fontStyles.title2.family};
  }

  p {
    padding-bottom: 18px;
    padding-left: 18px;

    em {
      font-style: italic;
    }
  }

  ol,
  ul {
    padding-bottom: 22px;
    padding-left: 38px;
    li {
      padding-bottom: 12px;
    }
  }

  a {
    text-decoration: underline;
    color: ${colors.white};
    &:hover {
      color: ${colors.red};
    }
  }
`;

const PrivacyTemplate = ({ pageContext }) => {
  const { frontmatter, html } = pageContext;
  return (
    <Layout toggleFiltersDrawer={() => {}} showFilters={false}>
      <Wrapper color={colors.blue}>
        <Column>
          <Title1>{frontmatter.title.toUpperCase()}</Title1>
          <Privacy
            className="privacy-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Column>
      </Wrapper>
    </Layout>
  );
};

PrivacyTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default PrivacyTemplate;
