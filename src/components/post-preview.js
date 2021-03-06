import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Colours } from '../colours'
import GatsbyImage from 'gatsby-image'
import { TimeToRead } from './time-to-read'
import { Labels } from './labels'

const PostImage = styled(GatsbyImage)`
	border: 0;
	border-radius: 0.25rem;
	margin-right: 1rem;
	height: 300px;
	width: 300px;

	@media screen and (max-width: 662px) {
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
	color: #aaa;
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
	max-width: calc(1000px - 5rem - 300px);
`

export const PostPreview = ({ post }) => (
	<PostPreviewSection>
		<Link to={post.fields.slug}>
			<PostImage
				title={post.frontmatter.title}
				fixed={post.frontmatter.image.sharp.fixed}
				alt={post.frontmatter.imageAlt}
				fadeIn
			/>
		</Link>
		<Column>
			<h1>
				<PostLink to={post.fields.slug}>
					{post.frontmatter.title}
					<PostDate> - {post.frontmatter.date}</PostDate>
				</PostLink>
			</h1>
			<p>
				<TimeToRead timeToRead={post.timeToRead} />
			</p>
			<p>
				{post.excerpt} <ReadLink to={post.fields.slug}>Read post →</ReadLink>
			</p>
			<Labels from={post.frontmatter.tags} />
		</Column>
	</PostPreviewSection>
)

PostPreview.propTypes = {
	post: PropTypes.object,
}
