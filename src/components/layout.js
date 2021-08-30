import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import HamNav from './HamNav';

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

const TagLine = styled.p`
    padding: 0; 
    /* color: #003366;  */
    color: black;
    display: inline-block;
    width: auto;
    letter-spacing: 0.7px;
    position: relative;
    left: 12%;
    margin-top: 0;
`

const Brand = styled.h1`
    padding: 0; 
    color: #003366; 
    letter-spacing: 0.7px; 
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: black;
`

export default ({ is_index, children, fullWidth=false }) => {
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
            <Helmet htmlAttributes={{lang: 'en'}} />
            {is_index &&
            <SiteHeader>
                <Link to="/"><Brand>{data.site.siteMetadata.title}</Brand></Link>
                <TagLine>{data.site.siteMetadata.tagline}</TagLine>
            </SiteHeader>
            }
            <div className="header">
                <HamNav>
                    <Link to="/">Home</Link>
                    <Link to="/about/">About</Link>
                    <Link to="/archive/">Archive</Link>
                    <Link to="/portfolio/">Portfolio</Link>
                    <Link to="/referrals/">Referrals</Link>
                </HamNav>
            </div>
            <Container style={{maxWidth: fullWidth ? "100%" : "50rem"}}>
                <Entry>
                    {children}
                </Entry>
            </Container>
	    </React.Fragment>
    )
}
