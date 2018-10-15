require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `[PS]xyz`,
  },
  plugins: [
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CF_SPACE_ID,
      accessToken: process.env.CF_ACCESS_TOKEN,
    },
  }, {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/util/typography.js`,
    },
  },
]
}
