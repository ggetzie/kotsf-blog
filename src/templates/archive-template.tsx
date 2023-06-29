import React from "react"
import { Link, graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { PostList, Post } from "../components/postlist"
import Pagination from "../components/pagination"
import { Helmet } from "react-helmet"
import { PageContext } from "../types"

export type ArchiveData = {
  allMarkdownRemark: {
    edges: {
      node: Post
    }[]
  }

  site: {
    siteMetadata: {
      title: string
    }
  }
}

export default function Archive({
  data,
  pageContext,
}: {
  data: ArchiveData
  pageContext: PageContext
}) {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout is_index={false}>
      <Helmet title={"Archive - " + data.site.siteMetadata.title} />
      <h2>Archive</h2>
      <PostList posts={posts} />
      <Pagination pageContext={pageContext} />
      <p>
        See older posts from{" "}
        <Link to="/gdarchive">
          <em>That's Debatable</em>
        </Link>
      </p>
    </Layout>
  )
}

export const ArchiveQuery = graphql`
  query ArchiveTemplate($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { section: { eq: "publish" } } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
          }
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
