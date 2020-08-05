import React from 'react';
import PropTypes from 'prop-types';

const PrivacyTemplate = ({ pageContext }) => {
  const { frontmatter, html } = pageContext;
  return (
    <div className="privacy-container">
      <h1>{frontmatter.title}</h1>
      <div
        className="privacy-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

PrivacyTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default PrivacyTemplate;
