import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import HamNav from "./HamNav"

// max-width: 50rem;
const Container = styled.div`
  margin: 0 auto;
  padding: 2em 2em 4em 2em;
`
const SiteHeader = styled.div`
  width: 100%;
  text-align: center;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("/img/header_image.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 2;
`

export default function Layout({
  is_index,
  children,
  fullWidth = false,
}: {
  is_index: boolean
  children: React.ReactNode
  fullWidth?: boolean
}) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            tagline
          }
        }
      }
    `
  )
  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ lang: "en" }} />
      {is_index && (
        <SiteHeader>
          <Link to="/">
            <h1 className="brand">{data.site.siteMetadata.title}</h1>
          </Link>
          <p className="tagline">{data.site.siteMetadata.tagline}</p>
        </SiteHeader>
      )}
      <div className="header">
        <HamNav>
          <Link to="/">Home</Link>
          <Link to="/about/">About</Link>
          <Link to="/archive/">Archive</Link>
          <Link to="/notes/">Notes</Link>
          <Link to="/referrals/">Referrals</Link>
          <Link to="/miscellany/">Miscellany</Link>
        </HamNav>
      </div>
      <Container style={{ maxWidth: fullWidth ? "100%" : "50rem" }}>
        <Entry>{children}</Entry>
      </Container>
    </React.Fragment>
  )
}
