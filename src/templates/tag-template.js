import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import { SmallText } from '../components/small-text'
import Seo from '../components/seo'
import { PostList } from '../components/post-list'

const TagTemplate = ({ pageContext, data }) => {
	return (
		<Layout className='p-5'>
			<Seo
				title={`Articles about #${pageContext.tag}`}
				description={`This page contains all articles tagged with ${pageContext.tag}. Currently there are ${data.allMarkdownRemark.edges.length}.`}
			/>
			<div className='p-5'>
				<h1 className='font-black text-gray-800 text-3xl mb-5' itemProp='name headline'>
					#{pageContext.tag} articles
				</h1>

				<PostList posts={data.allMarkdownRemark.edges} />
			</div>

			<div className='mx-5 py-10 flex justify-center'>
				<SmallText>
					This page contains links to all articles tagged with <strong>#{pageContext.tag}</strong>.
					Currently there are
					<strong> {data.allMarkdownRemark.edges.length}</strong>.
				</SmallText>
			</div>
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
			filter: { frontmatter: { tags: { in: [$tag] }, published: { eq: true } } }
		) {
			edges {
				node {
					...PostPreview
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
