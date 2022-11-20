import React from "react"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { ArchiveData } from "../templates/archive-template"

export default function Archive({ data }: { data: ArchiveData }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout is_index={false}>
      <Helmet title={"Drafts - " + data.site.siteMetadata.title} />
      <h2>Drafts</h2>
      <PostList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query Drafts {
    allMarkdownRemark(
      filter: { frontmatter: { section: { eq: "draft" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
          }
          excerpt(pruneLength: 250)
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`