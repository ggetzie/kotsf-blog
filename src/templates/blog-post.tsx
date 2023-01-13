import React from "react"
import { Helmet } from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"

export default function Template({
  data,
}: PageProps<Queries.BlogPostByPathQuery>) {
  const { markdownRemark: post } = data

  return (
    <Layout is_index={false}>
      <div className="post-container">
        <Helmet
          title={
            post?.frontmatter?.title + " - " + data?.site?.siteMetadata?.title
          }
        />
        <h1>{post?.frontmatter?.title}</h1>
        {post?.frontmatter?.subtitle && (
          <p className="subtitle">{post.frontmatter.subtitle}</p>
        )}
        <p className="dateline">{post?.frontmatter?.date}</p>

        <div
          className="blogpost"
          dangerouslySetInnerHTML={{ __html: post!.html! }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
        subtitle
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
