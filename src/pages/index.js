import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import React from 'react'
import { Layout } from '../layout'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'
import { PostList } from '../components/post-list'

const Index = ({ data }) => {
	return (
		<Layout>
			<Seo />
			<div className='p-5'>
				<PostList posts={data.allMarkdownRemark.edges} />
			</div>
			<div className='p-5 flex justify-center w-full'>
				<SubscriptionForm />
			</div>
		</Layout>
	)
}

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
