import React from 'react'
import { graphql } from 'gatsby'

const PageTemplate = ({ data }) => {
	const post = data.markdownRemark

	return (
		<article>
			<h1>{post.frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</article>
	)
}

export default PageTemplate

export const query = graphql`
	query PageContents($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			...PostPage
		}
	}
`
