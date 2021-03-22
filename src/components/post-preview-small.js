import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { Labels } from './labels'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const PostImage = styled(GatsbyImage)`
	border: 0;
	border-radius: 0.25rem;
	margin-right: 1rem;
	height: 100px;
	width: 100px;

	@media screen and (max-width: 662px) {
		margin-right: 0;
	}
`

const PostLink = styled(Link)`
	text-decoration: none;
	color: #333;
`

const PostDate = styled.span`
	color: #666;
`

const PostPreviewSection = styled.section`
	display: flex;
	align-items: center;
	flex-direction: row;

	@media screen and (max-width: 662px) {
		flex-direction: column;
	}
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	max-width: calc(1000px - 5rem - 100px);
`

export const PostPreviewSmall = ({ post }) => {
	const { siteUrl } = useSiteMetadata()
	const pageUrl = `${siteUrl}${post.fields.slug}`
	const imageUrl = `${siteUrl}${post.frontmatter.image.sharp.fixed.src}`

	return (
		<PostPreviewSection itemProp='item' itemScope itemType='https://schema.org/Article'>
			<Link to={post.fields.slug}>
				<PostImage
					title={post.frontmatter.title}
					fixed={post.frontmatter.image.sharp.fixed}
					alt={post.frontmatter.imageAlt}
					fadeIn
				/>
			</Link>
			<Column>
				<h4>
					<PostLink itemProp='url' to={post.fields.slug}>
						<span itemProp='name headline'>{post.frontmatter.title}</span>
						<PostDate>
							{' '}
							- <span itemProp='datePublished'>{post.frontmatter.date}</span>
						</PostDate>
					</PostLink>
				</h4>

				<meta itemProp='headline' content={post.frontmatter.title} />
				<meta itemProp='url' content={pageUrl} />
				<meta itemProp='description' content={post.frontmatter.description} />
				<meta itemProp='image' content={imageUrl} />

				<Labels from={post.frontmatter.tags} />
			</Column>
		</PostPreviewSection>
	)
}

PostPreviewSmall.propTypes = {
	post: PropTypes.object,
}
