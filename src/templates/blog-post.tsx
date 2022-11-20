import React from "react"
import { Helmet } from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Dateline } from "../components/postlist"

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
        <h2>{post?.frontmatter?.title}</h2>
        {post?.frontmatter?.subtitle && (
          <p className="subtitle">{post.frontmatter.subtitle}</p>
        )}
        <Dateline>{post?.frontmatter?.date}</Dateline>

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
