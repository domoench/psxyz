require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: '[PS]xyz',
  },
  plugins: [
    // Create markdown pages (privacy terms)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },

    // Pulling data from contentful at build time
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_ACCESS_TOKEN,
      },
    },

    // Preload custom fonts to avoid flashing system font for a half second on inital load
    // Requires running `yarn run preload-fonts` to update font-preload-cache.json
    `gatsby-plugin-preload-fonts`,

    // Image manipulation: https://www.gatsbyjs.org/packages/gatsby-image/
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    'gatsby-plugin-styled-components',
  ],
};
