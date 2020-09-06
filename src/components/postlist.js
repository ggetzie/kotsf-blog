import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

/* const PostItem = styled.p`
 *     margin-bottom: 2rem;
 * ` */

const PostTitle = styled.h3`
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
`
const Dateline = styled.p`
    font-size: smaller;
    font-weight: light;
    margin-bottom: 0.2rem;
`
const PostExcerpt = styled.p`
    margin-bottom = 0.7rem;
`
const PostItem = ({ post }) => {
    return (
	<div key={post.id}>
	    <PostTitle>
		<Link to={post.frontmatter.path}>
		    {post.frontmatter.title}
		</Link>
	    </PostTitle>
	    <Dateline>
		{post.frontmatter.date}
	    </Dateline>
	    <PostExcerpt>
		{post.excerpt}
	    </PostExcerpt>

	</div>
    )
}

const PostList = ({ posts }) => {
    return (
        <div className="post-list">
            {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (
			<PostItem post={post} />
                    )
                }
                )
            }
        </div>
    )
}

export default PostList;
