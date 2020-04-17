import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styled from "styled-components"
import { rhythm } from "../utils/typography"

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    padding: 0 ${rhythm(1)};
    margin: 40px auto;
`

const sideNav = styled.section`
    display: inline-block;
    min-width: 20%;
    max-width: 100%;
    width: calc((480px - 100%) * 480);
`

const Entry = styled.div`
    display: inline-block;
    min-width: 65%;
    max-width: 100%;
    width: calc((480px - 100%) * 480);
    margin: ${rhythm(2)} ${rhythm(1)} ${rhythm(1)} ${rhythm(2)};
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
            <Entry>
                {children}
            </Entry>
            <sideNav>
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