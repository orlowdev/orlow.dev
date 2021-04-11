import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { TimeToRead } from './time-to-read'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { Labels } from '../components/labels'
import Image from 'gatsby-image'

export const PostPreview = ({ post }) => {
	const { siteUrl } = useSiteMetadata()
	const pageUrl = `${siteUrl}${post.fields.slug}`
	const imageUrl = `${siteUrl}${post.frontmatter.image.sharp.fluid.src}`
	const isLarge = post.frontmatter.featured

	return (
		<div className='bg-white rounded-2xl shadow-xl h-full flex flex-col '>
			{isLarge && (
				<div className='relative'>
					<Link to={post.fields.slug}>
						<Image
							Tag='section'
							itemProp='item'
							itemScope
							itemType='https://schema.org/Article'
							className='rounded-t-2xl h-64'
							fluid={post.frontmatter.image.sharp.fluid}
						></Image>
					</Link>
				</div>
			)}

			<div className='flex-grow p-5'>
				<h2 className='text-xl font-black font-sans'>
					<Link itemProp='url' to={post.fields.slug}>
						<span className='text-gray-800 hover:text-pink-600 transition' itemProp='name headline'>
							{post.frontmatter.title}
						</span>
					</Link>
				</h2>

				<meta itemProp='headline' content={post.frontmatter.title} />
				<meta itemProp='url' content={pageUrl} />
				<meta itemProp='description' content={post.frontmatter.description} />
				<meta itemProp='image' content={imageUrl} />

				<div className='py-3'>
					<TimeToRead timeToRead={post.timeToRead} />
				</div>

				<p className='mb-2 text-sm  md:text-base lg:text-lg text-gray-700'>
					{post.frontmatter.description}
				</p>

				<Labels from={post.frontmatter.tags.slice(0, 3)} />
			</div>

			<Link
				className='w-full text-center py-3 uppercase text-gray-700 font-bold transition hover:text-pink-600'
				to={post.fields.slug}
			>
				Read post →
			</Link>
		</div>
	)
}

PostPreview.propTypes = {
	post: PropTypes.object,
}
