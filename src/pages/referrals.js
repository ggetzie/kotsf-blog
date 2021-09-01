import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default function Referrals ({ data }) {
    const {markdownRemark: post} = data
    return ( 
        <Layout>
            <Helmet title={data.site.siteMetadata.title} />
            <h2>{post.frontmatter.title}</h2>
            <div className="blogpost referrals"
                 dangerouslySetInnerHTML={{ __html: post.html }}/>
        </Layout>
    )
}

export const query = graphql`
    query {
        markdownRemark(frontmatter: {path: {eq: "/referrals/"}}) {
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
