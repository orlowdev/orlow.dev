import React from 'react'
import { graphql } from 'gatsby'

const TagTemplate = ({ pageContext, data }) => {
	const posts = data.allMarkdownRemark.edges

	return (
		<article>
			<h1>#{pageContext.tag}</h1>
			<ul>
				{posts.map(({ node }) => (
					<li>
						<a href={node.fields.slug}>{node.frontmatter.title}</a>
					</li>
				))}
			</ul>
		</article>
	)
}

export default TagTemplate

export const query = graphql`
	query TagContents($tag: String!) {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			edges {
				node {
					...PostPreview
				}
			}
		}
	}
`
