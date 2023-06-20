import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/layout"

export default function Timezone({ data }: PageProps<Queries.TimezoneQuery>) {
  return (
    <Layout is_index={false}>
      <Helmet
        title={"Timezone Converter - " + data?.site?.siteMetadata?.title}
      />
      <h1>Timezone Converter</h1>
    </Layout>
  )
}

export const query = graphql`
  query Timezone {
    site {
      siteMetadata {
        title
      }
    }
  }
`
