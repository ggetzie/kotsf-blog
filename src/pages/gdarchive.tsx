import React from "react"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { ArchiveData } from "../templates/archive-template"
export default function GDArchive({ data }: { data: ArchiveData }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout is_index={false}>
      <Helmet
        title={"That's Debatable Archive - " + data.site.siteMetadata.title}
      />
      <h2>That's Debatable Archive</h2>
      <p>
        The posts below were originally published on the blog portion of the
        now-defunct site Greaterdebater.
      </p>
      <PostList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query GDArchive {
    allMarkdownRemark(
      filter: { frontmatter: { section: { eq: "gdarchive" } } }
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
