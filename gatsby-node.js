// const path = require(`path`);

// Create the privacy policy page from markdown
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const privacyTemplate = require.resolve(
    `./src/templates/privacyTemplate.jsx`
  );

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1) {
        edges {
          node {
            frontmatter {
              slug
              date
              title
            }
            html
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running privacy policy GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: privacyTemplate,
      context: {
        frontmatter: node.frontmatter,
        html: node.html,
      },
    });
  });
};

// TODO: Still helpful?
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  // Insert a random number sort ID so we can query our creators in a different
  // random order after each site build
  if (node.internal.type === 'ContentfulCreator') {
    createNodeField({
      node,
      name: 'sortId',
      value: Math.random(),
    });
  }
};
