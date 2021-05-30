import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { TimeToRead } from './time-to-read'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { Labels } from '../components/labels'
import Image from 'gatsby-image'
import { borderColors } from '../colors'

export const PostPreview = ({ post }) => {
	const { siteUrl } = useSiteMetadata()
	const pageUrl = `${siteUrl}${post.frontmatter.Slug}`
	const imageUrl = `${siteUrl}${post.frontmatter.Hero_Image[0]?.remoteImage.sharp.fluid}`
	const isLarge = post.frontmatter.Featured

	return (
		<div
			className={`bg-white rounded-2xl shadow-xl h-full flex flex-col border-b-2 ${
				borderColors[post.frontmatter.Category.color]
			}`}
		>
			{isLarge && (
				<div className='relative'>
					<Link to={post.frontmatter.Slug}>
						<Image
							Tag='section'
							itemProp='item'
							itemScope
							itemType='https://schema.org/Article'
							className='rounded-t-2xl h-64'
							fluid={post.frontmatter.Hero_Image[0].remoteImage.sharp.fluid}
						></Image>
					</Link>
				</div>
			)}

			<div className='flex-grow p-5'>
				<h2 className='text-xl font-black font-sans'>
					<Link itemProp='url' to={post.frontmatter.Slug}>
						<span className='text-gray-800 hover:text-pink-600 transition' itemProp='name headline'>
							{post.frontmatter.title}
						</span>
					</Link>
				</h2>

				<meta itemProp='headline' content={post.frontmatter.title} />
				<meta itemProp='url' content={pageUrl} />
				<meta itemProp='description' content={post.frontmatter.Meta_Description} />
				<meta itemProp='image' content={imageUrl} />

				<div className='py-3'>
					<TimeToRead timeToRead={post.timeToRead} />
				</div>

				<p className='mb-2 text-sm  md:text-base lg:text-lg text-gray-700'>
					{post.frontmatter.Meta_Description}
				</p>

				<Labels from={post.frontmatter.Tags.slice(0, 3)} />
			</div>

			<Link
				className='w-full text-center py-3 uppercase text-gray-700 font-bold transition hover:text-pink-600'
				to={post.frontmatter.Slug}
			>
				{post.frontmatter.Type.name} Read →
			</Link>
		</div>
	)
}

PostPreview.propTypes = {
	post: PropTypes.object,
}
