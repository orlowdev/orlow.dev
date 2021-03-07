import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import { Layout } from '../layout'
import { PostPreview } from '../components/post-preview'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'

const List = styled.ul`
	list-style: none;
	margin: 0;
`

const Index = ({ data }) => (
	<Layout>
		<Seo />
		<Centralise>
			<h1 itemProp='name headline'>Recent Posts</h1>
			<List itemScope itemType='https://schema.org/ItemList'>
				{data.allMarkdownRemark.edges.map(({ node }, i) => (
					<li
						key={node.fields.slug}
						itemProp='itemListElement'
						itemScope
						itemType='https://schema.org/ListItem'
					>
						<meta css={{ display: 'none' }} itemProp='position' content={i + 1} />
						<meta itemProp='name headline' content={node.frontmatter.title} />
						<PostPreview post={node} />
					</li>
				))}
			</List>

			<SubscriptionForm />
		</Centralise>
	</Layout>
)

Index.propTypes = {
	data: PropTypes.object,
}

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
