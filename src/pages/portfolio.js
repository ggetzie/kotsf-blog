import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

export default function Portfolio ({ data }) {
    const {markdownRemark: post} = data
    return (
        <Layout>
            <Helmet title={"Portfolio - " + data.site.siteMetadata.title} />
           <h2>{post.frontmatter.title}</h2>
           <div className="blogpost"
                dangerouslySetInnerHTML={{ __html: post.html}} />
        </Layout>
        )
}

export const query = graphql`
    query {
        markdownRemark(frontmatter: {path: {eq: "/portfolio/"}}) {
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