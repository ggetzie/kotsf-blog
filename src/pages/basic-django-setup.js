import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"

export default function BasicDjangoSetup ({ data }) {
    const {markdownRemark: post} = data
    return (
        <Layout>
            <Helmet title={post.frontmatter.title + " - " + data.site.siteMetadata.title} />
           <h2>{post.frontmatter.title}</h2>
           <div className="blogpost"
                dangerouslySetInnerHTML={{ __html: post.html}} />
        </Layout>
        )
}

export const query = graphql`
    query {
        markdownRemark(frontmatter: {path: {eq: "/howto/basic-django-setup"}}) {
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
