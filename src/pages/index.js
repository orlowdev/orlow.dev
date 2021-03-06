import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import { Layout } from '../layout'
import { PostPreview } from '../components/post-preview'

const List = styled.ul`
	list-style: none;
	margin: 0;
`

const Index = ({ data }) => (
	<Layout>
		<Centralise>
			<h1>Recent Posts</h1>
			<List>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<li key={node.fields.slug}>
						<PostPreview post={node} />
					</li>
				))}
			</List>
		</Centralise>
	</Layout>
)

export default Index

export const query = graphql`
	query IndexPage {
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
			sort: { order: DESC, fields: frontmatter___date }
		) {
			edges {
				node {
					...PostPreview
				}
			}
		}
	}
`
