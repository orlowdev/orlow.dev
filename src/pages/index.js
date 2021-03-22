import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import { Layout } from '../layout'
import { PostPreview } from '../components/post-preview'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'
import { PostPreviewSmall } from '../components/post-preview-small'
import { TopTags } from '../components/top-tags'
import { RecentPosts } from '../components/recent-posts'

const List = styled.ul`
	list-style: none;
	margin: 0;
`

const Index = ({ data }) => (
	<Layout>
		<Seo />
		<RecentPosts itemScope itemType='https://schema.org/ItemList'>
			{data.allMarkdownRemark.edges.slice(0, 3).map(({ node }, i) => (
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
		</RecentPosts>

		<Centralise>
			<List itemScope itemType='https://schema.org/ItemList'>
				{data.allMarkdownRemark.edges.slice(3).map(({ node }, i) => (
					<li
						key={node.fields.slug}
						itemProp='itemListElement'
						itemScope
						itemType='https://schema.org/ListItem'
					>
						<meta css={{ display: 'none' }} itemProp='position' content={i + 1} />
						<meta itemProp='name headline' content={node.frontmatter.title} />
						<PostPreviewSmall post={node} />
					</li>
				))}
			</List>

			<SubscriptionForm />
		</Centralise>
		<TopTags />
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
