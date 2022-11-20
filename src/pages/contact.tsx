import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

export default function Contact({ data }: PageProps<Queries.ContactPageQuery>) {
  const { markdownRemark: post } = data
  return (
    <Layout is_index={false}>
      <Helmet title={"Contact - " + data?.site?.siteMetadata?.title} />
      <h2>{post?.frontmatter?.title}</h2>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: post!.html! }}
      />
    </Layout>
  )
}

export const query = graphql`
  query ContactPage {
    markdownRemark(frontmatter: { path: { eq: "/contact/" } }) {
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
