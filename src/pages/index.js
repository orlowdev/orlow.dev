import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import React from 'react'
import { Centralise } from '../components/centralise'
import { Layout } from '../layout'
import { PostPreview } from '../components/post-preview'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'
import { Labels } from '../components/labels'
import { PostPreviewSmall } from '../components/post-preview-small'

const List = styled.ul`
	list-style: none;
	margin: 0;
`

const Index = ({ data }) => (
	<Layout>
		<Seo />
		<Centralise>
			<div>
				<h2>Top Tags</h2>
				<Labels
					from={data.tagsGroup.group
						.sort((a, b) => b.totalCount - a.totalCount)
						.slice(0, 5)
						.map((tag) => tag.fieldValue)}
				/>
			</div>
			<h2 itemProp='name headline'>Recent Posts</h2>
			<List itemScope itemType='https://schema.org/ItemList'>
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
			</List>

			<h2>More Posts</h2>

			<List itemScope itemType='https://schema.org/ItemList'>
				{data.smallPreview.edges.slice(3).map(({ node }, i) => (
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
		smallPreview: allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
			sort: { order: DESC, fields: frontmatter___date }
		) {
			edges {
				node {
					...PostPreviewSmall
				}
			}
		}
		tagsGroup: allMarkdownRemark {
			group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`
