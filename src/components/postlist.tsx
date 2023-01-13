import React from "react"
import { Link } from "gatsby"

export type Post = {
  frontmatter: { path: string; title: string; date: string }
  excerpt: string
  id: string
}
const PostItem = ({ post }: { post: Post }) => {
  return (
    <div key={post.id}>
      <h3 className="postlist-title">
        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </h3>
      <p className="dateline">{post.frontmatter.date}</p>
      <p className="excerpt">{post.excerpt}</p>
    </div>
  )
}

const PostList = ({ posts }: { posts: { node: Post }[] }) => {
  return (
    <div className="post-list">
      {posts
        .filter((post) => post.node.frontmatter.title.length > 0)
        .map(({ node: post }, index) => {
          return <PostItem key={index} post={post} />
        })}
    </div>
  )
}

export { PostList }
