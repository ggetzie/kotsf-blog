import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import type { PageProps } from "gatsby"

export default function About({ data }: PageProps<Queries.aboutPageQuery>) {
  const { markdownRemark: post } = data
  return (
    <Layout is_index={false}>
      <Helmet title={"About - " + data.site?.siteMetadata?.title} />
      <h1>{post?.frontmatter?.title}</h1>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: post?.html || "" }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutPage {
    markdownRemark(frontmatter: { path: { eq: "/about/" } }) {
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
