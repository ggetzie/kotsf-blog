/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Tilting at Windmills",
    author: "Gabriel Getzie",
    tagline: "Veni, Vidi, Bloggi",
    siteUrl: `https://tiltingatwindmills.dev`,
    description: "Personal blog for Gabriel Getzie",
  },
  plugins:[
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-simple-analytics`,
      options: {
        domain: 'sa.tiltingatwindmills.dev'
      }
    },
    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `root`,
        path: `/usr/local/src/kotsf-posts/`
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxwidth: 650,
            },
          },
            {
		resolve: `gatsby-remark-copy-linked-files`,
		options: {
		    ignoreFileExtensions: [`png`, `jpg`, `jpeg`],
		},
            },
            {
		resolve: `gatsby-remark-prismjs`,
		options: {
		    classPrefix: "language-",
		    inlineCodeMarker: "<",
		    aliases: {},
		    showLineNumbers: false,
		    noInlineHighlight: false,
		}
            },
	    'gatsby-remark-numbered-footnotes',
        ]
      },
    },
      
      /* {
       *   resolve: `gatsby-plugin-typography`,
       *   options: {
       *     pathToConfigModule: `src/utils/typography`
       *   },
       * }, */
      {
	  resolve: `gatsby-plugin-feed`,
	  options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map( edge => { 
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {frontmatter: {section: {eq: "publish"}}},
                  sort: {order: DESC, fields: [frontmatter___date] },
                ) {
                    edges {
                      node {
                        excerpt
                        html
                        frontmatter {
                          path
                          title
                          date
                        }
                      }
                    }
                }
              }
            `,
            output: "/feed.xml",
            title: "Tilting at Windmills",
          },
        ],
      },
    },
  ],
}


