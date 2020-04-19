import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styled from "styled-components"
import { rhythm } from "../utils/typography"

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 0 ${rhythm(1)};
    margin: 40px auto;
    width: 100%;
`

const sideNav = styled.section`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 100%;
`

const Entry = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 2;
    min-width: 300px;
    margin: ${rhythm(2)} ${rhythm(1)} ${rhythm(1)} ${rhythm(1)};
`

const tagLine = styled.p`
    padding: 0; 
    color: #003366; 
    letter-spacing: 0.7px; 
    margin-top: ${rhythm(0.1)}; 
    margin-bottom: ${rhythm(1)};
    font-size: ${rhythm(0.9)};
`

const Brand = styled.h1`
    padding: 0; 
    color: #003366; 
    letter-spacing: 0.7px; 
    margin-top: ${rhythm(0.1)};
    margin-bottom: ${rhythm(0.2)};
    font-size: ${rhythm(2.5)};
`

export default ({ children }) => {
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
        <Container>
            <Entry className="entry">
                {children}
            </Entry>
            <sideNav className="side-nav">
                <Brand><Link className="brand" to="/">{data.site.siteMetadata.title}</Link></Brand>
                <tagLine>{data.site.siteMetadata.tagline}</tagLine>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/about/">About</Link>
                        </li>
                        <li>
                            <a href={"/archive"}>Archive</a>
                        </li>
                    </ul>
                </nav>
            </sideNav>
        </Container>        
    )
}