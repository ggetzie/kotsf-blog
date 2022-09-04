const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { section: { ne: "standalone" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        group(field: frontmatter___section) {
          fieldValue
          totalCount
        }
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {},
      })
    })

    function publishCount(groups) {
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].fieldValue === "publish") {
          return groups[i].totalCount
        }
      }
    }
    postsLength = publishCount(result.data.allMarkdownRemark.group)
    const postsPerPage = 10
    const numPages = Math.ceil(postsLength / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/archive/` : `/archive/${i + 1}`,
        component: path.resolve("./src/templates/archive-template.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })
}
