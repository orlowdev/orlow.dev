import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { Layout } from '../layout'
import { ExternalRoutes } from '../routes'
import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader'
import { Labels } from '../components/labels'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Seo from '../components/seo'
import SubscriptionForm from '../components/subscription-form'
import { SmallText } from '../components/small-text'

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
			<article className='flex flex-col w-full' itemScope itemType='http://schema.org/Article'>
				<BackgroundImage
					className='w-full px-3 pt-40 lg:pt-64 overflow-hidden'
					Tag='section'
					fluid={post.frontmatter.image.sharp.fluid}
					fadeIn='soft'
				>
					<iframe
						className='w-full opacity-80 mb-5 rounded-2xl max-w-xl'
						title='Apple Music Jukebox'
						allow='autoplay *; encrypted-media *;'
						frameBorder='0'
						height='150'
						sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation'
						src={post.frontmatter.song.replace('/music.', '/embed.music.')}
					/>
				</BackgroundImage>

				<div className='p-5 self-center'>
					<p className='uppercase text-gray-400 text-sm text-right'>
						Credit goes to: {post.frontmatter.imageAlt}
					</p>

					<div className='my-5'>
						<Labels from={post.frontmatter.tags} />
					</div>

					<div className='prose prose-rose lg:prose-xl flex flex-col justify-center'>
						<h1 className='text-4xl font-black' itemProp='name'>
							{post.frontmatter.title}
						</h1>

						<p className='hidden'>
							<time dateTime={post.frontmatter.date} itemProp='datePublished'>
								{post.frontmatter.date}
							</time>{' '}
							by{' '}
							<span itemProp='author' itemScope itemType='http://schema.org/Person'>
								{' '}
								<span itemProp='name'>
									<a className='text-gray-400' rel='nofollow' href={siteUrl} itemProp='url'>
										Sergei Orlow
									</a>
								</span>
							</span>
						</p>

						<meta itemProp='headline' content={post.frontmatter.title} />
						<meta itemProp='url' content={pageUrl} />
						<meta itemProp='description' content={post.frontmatter.description} />
						<meta itemProp='image' content={imageUrl} />

						<div itemProp='articleBody' dangerouslySetInnerHTML={{ __html: post.html }} />
					</div>

					<hr />

					<div className='pt-8 w-full items-center flex flex-col space-y-5 justify-center'>
						<SubscriptionForm />

						<SmallText className='self-center'>
							I don&apos;t have comments set up on my blog. But I&apos;d be glad to hear your
							thoughts on what you&apos;ve just read. If you would like to discuss something, we can
							have a chat on{' '}
							<a rel='nofollow' href={ExternalRoutes.TWITTER}>
								Twitter
							</a>
							.
						</SmallText>
					</div>
				</div>
			</article>
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
