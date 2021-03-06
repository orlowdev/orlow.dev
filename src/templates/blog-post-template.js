import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from '@emotion/styled'
import { Layout } from '../layout'
import { Centralise } from '../components/centralise'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { ExternalRoutes } from '../routes'
import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader'
import { Labels } from '../components/labels'
import { SmallText } from '../components/small-text'

defineCustomElements()

const Hero = styled(BackgroundImage)`
	width: 100%;
	padding: 15rem 1.5rem 0;
	background-position: center;
	overflow-x: hidden;
`

const Jukebox = styled.iframe`
	width: 100%;
	max-width: 660px;
	overflow: hidden;
	box-shadow: 0 0 15px #0000000f;
	border: 0;
	border-radius: 4px;
	background: transparent;
`

const Caption = styled.p`
	font-size: 0.7rem;
	color: #ccc;
	text-transform: uppercase;
	margin-top: -2.5rem;
	text-align: right;
`

const PageTemplate = ({ data }) => {
	const post = data.markdownRemark

	return (
		<Layout>
			<Hero Tag='section' fluid={post.frontmatter.image.sharp.fluid} fadeIn='soft'>
				<Jukebox
					allow='autoplay *; encrypted-media *;'
					frameborder='0'
					height='150'
					sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation'
					src={post.frontmatter.song.replace('/music.', '/embed.music.')}
				/>
			</Hero>
			<Centralise>
				<Caption>Credit goes to: {post.frontmatter.imageAlt}</Caption>
				<h1>{post.frontmatter.title}</h1>
				<Labels from={post.frontmatter.tags} />
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
				<SmallText>
					I don&apos;t have comments set up on my blog. But I&apos;d be glad to hear your thoughts
					on what you&apos;ve just read. If you would like to discuss something, we can have a chat
					on <OutboundLink href={ExternalRoutes.TWITTER}>Twitter</OutboundLink> or{' '}
					<OutboundLink href={ExternalRoutes.INSTAGRAM}>Instagram</OutboundLink>.
				</SmallText>
			</Centralise>
		</Layout>
	)
}

PageTemplate.propTypes = {
	data: PropTypes.object,
}

export default PageTemplate

export const query = graphql`
	query PageContents($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			...PostPage
		}
	}
`
