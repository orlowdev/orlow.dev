import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Labels } from './labels'
import { useSiteMetadata } from '../hooks/use-site-metadata'

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
		h3 {
			font-size: 1.2rem;
		}
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
	const imageUrl = `${siteUrl}${post.frontmatter.image.sharp.fluid.src}`

	return (
		<PostPreviewSection itemProp='item' itemScope itemType='https://schema.org/Article'>
			<Column>
				<h3>
					<PostLink itemProp='url' to={post.fields.slug}>
						<span itemProp='name headline'>{post.frontmatter.title}</span>
						<PostDate>
							{' '}
							- <span itemProp='datePublished'>{post.frontmatter.date}</span>
						</PostDate>
					</PostLink>
				</h3>

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
