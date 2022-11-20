import React from "react"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import { ArchiveData } from "../templates/archive-template"

export default function Index({ data }: { data: ArchiveData }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout is_index={true}>
      <Helmet title={data.site.siteMetadata.title} />
      <h2>Latest</h2>
      <PostList posts={posts} />
      <p>
        <Link to="/archive/">More…</Link>
      </p>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { section: { eq: "publish" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
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
