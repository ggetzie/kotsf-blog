/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "KotSF",
    author: "Gabriel Getzie",
    tagline: "Things n' Stuff",
  },
  plugins:[
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `root`,
        path: `${__dirname}/posts/`
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      },
    }
  ]
}


