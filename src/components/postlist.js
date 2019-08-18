import React from "react"
import { Link } from "gatsby"

const PostList = ({ posts }) => {
    return (
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
    )
}

export default PostList;