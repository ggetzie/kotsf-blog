import React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet"

export default function Referrals({ data }: PageProps<Queries.ReferralQuery>) {
  const { markdownRemark: post } = data
  return (
    <Layout is_index={false}>
      <Helmet title={data!.site!.siteMetadata!.title!} />
      <h2>{post?.frontmatter?.title}</h2>
      <div
        className="referrals"
        dangerouslySetInnerHTML={{ __html: post!.html! }}
      />
    </Layout>
  )
}

export const query = graphql`
  query Referral {
    markdownRemark(frontmatter: { path: { eq: "/referrals/" } }) {
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
