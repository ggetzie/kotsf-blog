import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default function About({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <Helmet title={"About - " + data.site.siteMetadata.title} />
      <h2>{post.frontmatter.title}</h2>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query aboutQuery {
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
