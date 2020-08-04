require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: '[PS]xyz',
  },
  plugins: [
    // Pulling data from contentful at build time
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_ACCESS_TOKEN,
      },
    },

    // Image manipulation: https://www.gatsbyjs.org/packages/gatsby-image/
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    'gatsby-plugin-styled-components',
  ],
};
