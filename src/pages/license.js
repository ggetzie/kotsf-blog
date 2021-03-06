import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default ({ data }) => {
    const {markdownRemark: post} = data
    return ( 
        <Layout>
            <Helmet title={"License - " + data.site.siteMetadata.title} />
            <h2>{post.frontmatter.title}</h2>
            <div className="blogpost"
                 dangerouslySetInnerHTML={{ __html: post.html }}/>
        </Layout>
    )
}

export const query = graphql`
    query {
        markdownRemark(frontmatter: {path: {eq: "/license/"}}) {
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
