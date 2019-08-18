import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

export default function Archive({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <Helmet title={"Drafts - " + data.site.siteMetadata.title} />
            <h2>Drafts</h2>
            <div className="post-list">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <div className="post-preview" key={post.id}>
                                <h3>
                                    <Link to={post.frontmatter.path}>
                                        {post.frontmatter.title}
                                    </Link>
                                </h3>
                                <p className="dateline">{post.frontmatter.date}</p>
                                <p>{post.excerpt}</p>
                            </div>
                        )
                    }
                    )
                }
            </div>
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
