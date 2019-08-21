import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"

const PostList = ({ posts }) => {
    return (
        <div className="post-list">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <div className="post-preview" key={post.id}>
                                <h3 style={{
                                    marginBottom: rhythm(1/3),
                                }}>
                                    <Link to={post.frontmatter.path}>
                                        {post.frontmatter.title}
                                    </Link>
                                </h3>
                                <p className="dateline" style={{
                                    marginBottom: rhythm(1/3),
                                }}>
                                    {post.frontmatter.date}
                                </p>
                                <p style={{
                                    marginBottom: rhythm(2/3)
                                }}>
                                    {post.excerpt}
                                </p>
                            </div>
                        )
                    }
                    )
                }
        </div>
    )
}

export default PostList;