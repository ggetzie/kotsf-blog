import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postlist"
import Pagination from "../components/pagination"
import { Helmet } from "react-helmet"

export default class Archive extends React.Component {
    render () {
        const posts = this.props.data.allMarkdownRemark.edges
        return (
            <Layout>
                <Helmet title={"Archive - " + this.props.data.site.siteMetadata.title} />
                <PostList posts={posts} />
                <Pagination pageContext={this.props.pageContext} />
                <div>See older posts from <Link to="/gdarchive"><em>That's Debatable</em></Link></div>
            </Layout>
        )
    }
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
