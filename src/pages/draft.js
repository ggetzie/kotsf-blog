import React from "react"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

export default function Archive({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <Helmet title={"Drafts - " + data.site.siteMetadata.title} />
            <h2>Drafts</h2>
            <PostList posts={posts} />
        </Layout>
    )
    
}

export const pageQuery = graphql`
    query DraftQuery {
        allMarkdownRemark(
            filter: {frontmatter: {section: {eq: "draft"}}},
            sort: {order: DESC, fields: [frontmatter___date]},
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
