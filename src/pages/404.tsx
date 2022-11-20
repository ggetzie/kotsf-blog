import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import type { PageProps } from "gatsby"

export default function P404({ data }: PageProps<Queries.P404Query>) {
  return (
    <Layout is_index={false}>
      <Helmet title={"Page Not Found - " + data.site?.siteMetadata?.title} />
      <h2>Page Not Found</h2>
      <p>
        Whoops! We couldn't find the page you're looking for. Sorry about that.
      </p>
    </Layout>
  )
}

export const pageQuery = graphql`
  query P404 {
    site {
      siteMetadata {
        title
      }
    }
  }
`
