import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import { Centralise } from '../components/centralise'
import styled from '@emotion/styled'
import { PostPreview } from '../components/post-preview'
import { SmallText } from '../components/small-text'

const List = styled.ul`
	list-style: none;
	margin: 0 0 2rem 0;
`

const TagTemplate = ({ pageContext, data }) => {
	return (
		<Layout>
			<Centralise>
				<h1>#{pageContext.tag}</h1>

				<List>
					{data.allMarkdownRemark.edges.map(({ node }) => (
						<li key={node.fields.slug}>
							<PostPreview post={node} />
						</li>
					))}
				</List>

				<SmallText>This page contains all articles tagged with #{pageContext.tag}.</SmallText>
			</Centralise>
		</Layout>
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
