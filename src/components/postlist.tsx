import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const PostTitle = styled.h3`
  margin-bottom: 0.2rem;
`
const Dateline = styled.p`
  font-size: smaller;
  font-weight: 200;
  margin: 0;
`
const PostExcerpt = styled.p`
  margin-top: 0.1rem;
  margin-bottom: 0.7rem;
`
export type Post = {
  frontmatter: { path: string; title: string; date: string }
  excerpt: string
  id: string
}
const PostItem = ({ post }: { post: Post }) => {
  return (
    <div key={post.id}>
      <PostTitle>
        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </PostTitle>
      <Dateline>{post.frontmatter.date}</Dateline>
      <PostExcerpt>{post.excerpt}</PostExcerpt>
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

export { PostList, Dateline }