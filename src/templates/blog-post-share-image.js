import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

const ShareImageTemplate = ({ data }) => {
	const post = data.markdownRemark

	return (
		<div className='relative' style={{ width: '1200px', height: '630px' }}>
			<Image className='w-full h-full' fluid={data.markdownRemark.frontmatter.image.sharp.fluid} />
			<div className='absolute inset-0 opacity-70 bg-gradient-to-tr from-gray-300 via-gray-700 to-gray-600'></div>
			<div className='absolute inset-0 m-10 p-10 bg-gray-200 bg-opacity-70 text-center text-gray-700 flex flex-col justify-between rounded-2xl shadow-xl'>
				<h1 className='font-serif text-7xl font-black tracking-wide mt-12'>
					{post.frontmatter.title}
				</h1>
				<div className='w-20 self-center border-b-4 border-pink-600 rounded-full' />
				<p className='text-5xl font-black mb-12'>||↓</p>
			</div>
			<time className='font-serif absolute bottom-2 left-3 text-pink-900 font-extrabold'>
				{post.frontmatter.date}
			</time>
			<p className='font-serif absolute bottom-2 right-3 text-gray-100 font-extrabold'>orlow.dev</p>
		</div>
	)
}

ShareImageTemplate.propTypes = {
	data: PropTypes.object,
}

export default ShareImageTemplate

export const query = graphql`
	query ShareImageContents($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			...PostPage
		}
	}
`
