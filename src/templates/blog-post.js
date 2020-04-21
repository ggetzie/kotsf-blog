import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function Template({ data}) {
    const { markdownRemark: post } = data

    return (
        <Layout>
            <div className="post-container">
                <Helmet title={post.frontmatter.title + " - " + data.site.siteMetadata.title} />
                <h2>{post.frontmatter.title}</h2>
                <p className="dateline">{post.frontmatter.date}</p>
                <div className="blogpost"
                     dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>

        </Layout>
        
    )
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path }}) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                path
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