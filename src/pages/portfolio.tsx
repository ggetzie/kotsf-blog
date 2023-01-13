import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

export default function Portfolio({ data }: PageProps<Queries.PortfolioQuery>) {
  const { markdownRemark: post } = data
  return (
    <Layout is_index={false}>
      <Helmet title={"Portfolio - " + data?.site?.siteMetadata?.title} />
      <h1>{post?.frontmatter?.title}</h1>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: post!.html! }}
      />
    </Layout>
  )
}

export const query = graphql`
  query Portfolio {
    markdownRemark(frontmatter: { path: { eq: "/portfolio/" } }) {
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
