import React from "react"
import { Link } from "gatsby"
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
    width: 20%;
`

const Entry = styled.div`
    width: 65%;
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

export default ({ children }) => (
    <Container>
        <Entry>
            {children}
        </Entry>
        <sideNav>
            <Brand><Link className="brand" to="/">KotSF</Link></Brand>
            <tagLine>Things n' Stuff</tagLine>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/about/">About</Link>
                    </li>
                    <li>
                        <Link to="/archive/">Archive</Link>
                    </li>
                    <li>
                        <Link to="/portfolio/">Portfolio</Link>
                    </li>
                    <li>
                        <Link to="/contact/">Contact</Link>
                    </li>
                </ul>
            </nav>
        </sideNav>
    </Container>        
)