import React from "react"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { ArchiveData } from "../templates/archive-template"
export default function Notes({ data }: { data: ArchiveData }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout is_index={false}>
      <Helmet title={"Notes - " + data.site.siteMetadata.title} />
      <h2>Notes</h2>
      <p>
        Here is where I keep notes on how to do various things or how I solved
        specific problems in the past. Mostly for my own reference, but I hope
        it will be useful to others as well.
      </p>
      <PostList posts={posts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query Notes {
    allMarkdownRemark(
      filter: { frontmatter: { section: { eq: "notes" } } }
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
