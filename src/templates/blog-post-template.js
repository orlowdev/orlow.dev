import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styled from '@emotion/styled'
import { Layout } from '../layout'
import { Centralise } from '../components/centralise'
import { ExternalRoutes } from '../routes'
import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader'
import { Labels } from '../components/labels'
import { SmallText } from '../components/small-text'
import { Colours } from '../colours'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'

const Hero = styled(BackgroundImage)`
	width: 100%;
	padding: 15rem 1.5rem 0;
	background-position: center;
	overflow-x: hidden;
`

const Article = styled.article`
	display: flex;
	flex-direction: column;
`

const Time = styled.time`
	color: ${Colours.PRIMARY};
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
	const { siteUrl } = useSiteMetadata()
	const pageUrl = `${siteUrl}${post.fields.slug}`
	const imageUrl = `${siteUrl}${post.frontmatter.image.sharp.fluid.src}`

	useEffect(() => {
		defineCustomElements()
	}, [])

	return (
		<Layout>
			<Seo
				title={post.frontmatter.title}
				description={post.frontmatter.description}
				url={post.fields.slug}
				image={post.frontmatter.imageShare.publicURL}
			/>
			<Article itemScope itemType='http://schema.org/Article'>
				<Hero Tag='section' fluid={post.frontmatter.image.sharp.fluid} fadeIn='soft'>
					<Jukebox
						allow='autoplay *; encrypted-media *;'
						frameborder='0'
						height='150'
						sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation'
						src={post.frontmatter.song.replace('/music.', '/embed.music.')}
					/>
				</Hero>
				<Centralise>
					<Caption>Credit goes to: {post.frontmatter.imageAlt}</Caption>

					<h1 itemProp='name'>{post.frontmatter.title} </h1>
					<p>
						<Time dateTime={post.frontmatter.date} itemProp='datePublished'>
							{post.frontmatter.date}
						</Time>{' '}
						by{' '}
						<span itemProp='author' itemScope itemType='http://schema.org/Person'>
							{' '}
							<span itemProp='name'>
								<a rel='nofollow' href={siteUrl} itemProp='url'>
									Sergei Orlow
								</a>
							</span>
						</span>
					</p>

					<meta itemProp='headline' content={post.frontmatter.title} />
					<meta itemProp='url' content={pageUrl} />
					<meta itemProp='description' content={post.frontmatter.description} />
					<meta itemProp='image' content={imageUrl} />

					<Labels from={post.frontmatter.tags} />
					<div itemProp='articleBody' dangerouslySetInnerHTML={{ __html: post.html }} />
					<SmallText>
						I don&apos;t have comments set up on my blog. But I&apos;d be glad to hear your thoughts
						on what you&apos;ve just read. If you would like to discuss something, we can have a
						chat on{' '}
						<a rel='nofollow' href={ExternalRoutes.TWITTER}>
							Twitter
						</a>{' '}
						or{' '}
						<a rel='nofollow' href={ExternalRoutes.INSTAGRAM}>
							Instagram
						</a>
						.
					</SmallText>

					<SubscriptionForm />
				</Centralise>
			</Article>
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
