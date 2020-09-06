import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
    margin: 0 auto;
    max-width: 50rem;
    padding: 4em, 1em;
`
const SiteHeader = styled.div`
    width: 100%;
    text-align: center;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url("/img/header_photo.jpg");
    background-repeat: no-repeat;
    background-position: center;
`

const Entry = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 2;    
`

const TagLine = styled.p`
    padding: 0; 
    color: #003366; 
    letter-spacing: 0.7px; 
`

const Brand = styled.h1`
    padding: 0; 
    color: #003366; 
    letter-spacing: 0.7px; 
    font-size: 3rem;
`

const NavBar = styled.nav`
    height: 50px;
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    position: sticky;
    top: 0;
    background-color: #EEE;
    margin-bottom: 20px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
`

const NavLink = styled(Link)`
padding-left: 20px;
font-size: 0.9rem
`;

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
        <React.Fragment>
	    <SiteHeader>
		<Link to="/"><Brand>{data.site.siteMetadata.title}</Brand></Link>
		<TagLine>{data.site.siteMetadata.tagline}</TagLine>
	    </SiteHeader>
	    <NavBar>
		<NavLink to="/about/">About</NavLink>
		<NavLink to="/archive/">Archive</NavLink>
		<NavLink to="/portfolio/">Portfolio</NavLink>
		<NavLink to="/referrals/">Referrals</NavLink>
	    </NavBar>
	    <Container>
		<Entry>
                    {children}
		</Entry>
            </Container>
	</React.Fragment>
    )
}
