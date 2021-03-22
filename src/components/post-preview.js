import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Colours } from '../colours'
import { TimeToRead } from './time-to-read'
import { Labels } from './labels'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import BackgroundImage from 'gatsby-background-image'

const PostImage = styled(BackgroundImage)`
	border: 0;
	border-radius: 0.25rem;
	margin-right: 1rem;
	display: flex;
	align-items: center;
	flex-direction: row;
	box-shadow: 0 0 15px #0000000f;

	@media screen and (max-width: 662px) {
		flex-direction: column;
		margin-right: 0;
	}
`

const PostLink = styled(Link)`
	text-decoration: none;
	color: #333;
`

const ReadLink = styled(Link)`
	color: ${Colours.PRIMARY};
	font-weight: 900;
	text-transform: uppercase;
`

const PostDate = styled.span`
	color: #666;
`

const Column = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	background: -webkit-linear-gradient(#fafafabb, #ffffffff);
`

export const PostPreview = ({ post }) => {
	const { siteUrl } = useSiteMetadata()
	const pageUrl = `${siteUrl}${post.fields.slug}`
	const imageUrl = `${siteUrl}${post.frontmatter.image.sharp.fluid.src}`

	return (
		<PostImage
			Tag='section'
			itemProp='item'
			itemScope
			itemType='https://schema.org/Article'
			fluid={post.frontmatter.image.sharp.fluid}
		>
			{/* <Link to={post.fields.slug}>
				<PostImage
					title={post.frontmatter.title}
					fixed={post.frontmatter.image.sharp.fixed}
					alt={post.frontmatter.imageAlt}
					fadeIn
				/>
			</Link> */}
			<Column>
				<h2>
					<PostLink itemProp='url' to={post.fields.slug}>
						<span itemProp='name headline'>{post.frontmatter.title}</span>
						<PostDate>
							{' '}
							- <span itemProp='datePublished'>{post.frontmatter.date}</span>
						</PostDate>
					</PostLink>
				</h2>

				<meta itemProp='headline' content={post.frontmatter.title} />
				<meta itemProp='url' content={pageUrl} />
				<meta itemProp='description' content={post.frontmatter.description} />
				<meta itemProp='image' content={imageUrl} />

				<p>
					<TimeToRead timeToRead={post.timeToRead} />
				</p>
				<p>
					{post.excerpt} <ReadLink to={post.fields.slug}>Read post →</ReadLink>
				</p>
				<Labels from={post.frontmatter.tags} />
			</Column>
		</PostImage>
	)
}

PostPreview.propTypes = {
	post: PropTypes.object,
}
