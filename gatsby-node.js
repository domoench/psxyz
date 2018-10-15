const path = require(`path`)

// Create a page for every Creator stored in Contentful
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
	return new Promise((resolve, reject) => {
    // Get all creators and generate a Creator page for each
    graphql(`
			{
				allContentfulCreator {
					edges {
						node {
							id
							slug
						}
					}
				}
			}
    `).then(result => {
			result.data.allContentfulCreator.edges.forEach(({node}) => {
				createPage({
					path: node.slug,
					component: path.resolve(`./src/templates/creator.js`),
					context: {
						// Data passed to context is available in page queries as GraphQL variables.
						creatorID: node.id,
					},
				})
			})
		resolve()
  })
})
}
