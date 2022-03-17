import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { PostList } from "../components/postlist"
import Pagination from "../components/pagination"
import { Helmet } from "react-helmet"

export default function Archive({data, pageContext}) {
    const posts = data.allMarkdownRemark.edges
    return (
            <Layout>
                <Helmet title={"Archive - " + data.site.siteMetadata.title} />
		        <h2>Archive</h2>
                <PostList posts={posts} />
                <Pagination pageContext={pageContext} />
		        <p>See older posts from <Link to="/gdarchive"><em>That's Debatable</em></Link></p>
            </Layout>
        )
}

export const ArchiveQuery = graphql`
    query ArchiveTemplateQuery($skip: Int!, $limit: Int!){
        allMarkdownRemark (
            filter: {frontmatter: {section: {eq: "publish"}}},
            sort: { fields: [frontmatter___date], order: DESC },
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        title
                        date(formatString: "YYYY-MM-DD")
                        path
                    }

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
