import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"

const Container = styled.div`
    margin: 0 auto;
    max-width: 50rem;
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

const NavBar = styled.nav`
    height: 50px;
    width: 100%;
    position: sticky;
    top: 0;
    background-color: #f1ebaf;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color: black;
`

const NavLink = styled(Link)`
font-size: 0.8rem;
letter-spacing: 0.05rem;
font-weight: 600;
padding-left: 15px;
color: black;
`;

export default ({ is_index, children }) => {
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
            <NavBar>
                <div style={{paddingLeft: "10%", paddingRight: "10%", display: "inline-block"}}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about/">About</NavLink>
                    <NavLink to="/archive/">Archive</NavLink>
                    <NavLink to="/portfolio/">Portfolio</NavLink>
                    <NavLink to="/referrals/">Referrals</NavLink>
                </div>
            </NavBar>
            <Container>
                <Entry>
                    {children}
                </Entry>
            </Container>
	    </React.Fragment>
    )
}
