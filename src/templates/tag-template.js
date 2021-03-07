import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import { Centralise } from '../components/centralise'
import styled from '@emotion/styled'
import { PostPreview } from '../components/post-preview'
import { SmallText } from '../components/small-text'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'

const List = styled.ul`
	list-style: none;
	margin: 0 0 2rem 0;
`

const TagTemplate = ({ pageContext, data }) => {
	return (
		<Layout>
			<Seo
				title={`Articles about #${pageContext.tag}`}
				description={`This page contains all articles tagged with ${pageContext.tag}. Currently there are ${data.allMarkdownRemark.edges.length}.`}
			/>
			<Centralise>
				<h1 itemProp='name headline'>#{pageContext.tag}</h1>

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

				<SmallText>
					This page contains all articles tagged with #{pageContext.tag}. Currently there are
					<strong> {data.allMarkdownRemark.edges.length}</strong>.
				</SmallText>

				<SubscriptionForm />
			</Centralise>
		</Layout>
	)
}

TagTemplate.propTypes = {
	pageContext: PropTypes.object,
	data: PropTypes.object,
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
