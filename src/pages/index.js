import React from "react"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

export default function Index({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <Helmet title={data.site.siteMetadata.title} />
            <h2>Latest</h2>
            <PostList posts={posts} />
        </Layout>
    )
    
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            filter: {frontmatter: {section: {eq: "publish"}}},
            sort: {order: DESC, fields: [frontmatter___date]},
            limit: 5
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "YYYY-MM-DD")
                        path
                    }
                    excerpt(pruneLength: 250)
                }
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`
