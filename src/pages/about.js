import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"

const InfoList = styled.ul`
    list-style: none;
`

export default ({ data }) => {
    const {markdownRemark: post} = data
    return ( 
        <Layout>
            <Helmet title={"About - " + data.site.siteMetadata.title} />
            <h2>{post.frontmatter.title}</h2>
            <div className="blogpost"
                 dangerouslySetInnerHTML={{ __html: post.html }}/>
            <h2>More Information</h2>
            <InfoList>
                <li>
                    <Link to="/contact/">Contact</Link> - Find my current contact information here.
                </li>
                <li>
                    <Link to="/portfolio/">Portfolio</Link> - A list of projects I've released
                </li>
                <li>
                    <Link to="/referrals/">Referrals</Link> - Products I use and recommend. Referral bonuses for me and you.
                </li>
                <li>
                    <Link to="/license/">License</Link> - I occasionally post snippets of code I'm working on here. All code is released under the MIT license unless noted otherwise.
                </li>
                <li>
                    Resumes - <a href="/GetzieResume_web.pdf">Software Developer</a> and <a href="/GetzieResumeMEP_web.pdf">Electrical Engineer</a>
                </li>
            </InfoList>
        </Layout>
    )
}

export const query = graphql`
    query {
        markdownRemark(frontmatter: {path: {eq: "/about/"}}) {
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
