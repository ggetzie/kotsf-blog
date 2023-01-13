import React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet"

export default function License({ data }: PageProps<Queries.LicenseQuery>) {
  const { markdownRemark: post } = data
  return (
    <Layout is_index={false}>
      <Helmet title={"License - " + data?.site?.siteMetadata?.title} />
      <h1>{post?.frontmatter?.title}</h1>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: post!.html! }}
      />
    </Layout>
  )
}

export const query = graphql`
  query License {
    markdownRemark(frontmatter: { path: { eq: "/license/" } }) {
      html
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
