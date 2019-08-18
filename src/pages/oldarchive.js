import React from "react"
import Layout from "../components/layout"
import PostList from "../components/postlist"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

export default function Archive({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <Helmet title={"Archive - " + data.site.siteMetadata.title} />
            <h2>Archive</h2>
            <PostList posts={posts} />
            <div>
                <Link to="/gdarchive/">Older posts from <i>That's Debatable</i></Link>
            </div>
        </Layout>
    )
    
}



export const pageQuery = graphql`
    query ArchiveQuery {
        allMarkdownRemark(
            filter: {fileAbsolutePath: {glob: "/usr/local/src/kotsf-blog/posts/publish/*"}},
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
