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
import { proseColors } from '../colors'

const PageTemplate = ({ data }) => {
	const post = data.markdownRemark
	const { siteUrl } = useSiteMetadata()
	const pageUrl = `${siteUrl}${post.frontmatter.Slug}`
	const imageUrl = `${siteUrl}${post.frontmatter.Hero_Image.name}`

	useEffect(() => {
		defineCustomElements()
	}, [])

	return (
		<Layout>
			<Seo
				title={post.frontmatter.title}
				description={post.frontmatter.Meta_Description}
				url={post.frontmatter.Slug}
				// image={post.frontmatter.imageShare.publicURL}
			/>
			<article
				className='flex flex-col w-full overflow-x-hidden'
				itemScope
				itemType='http://schema.org/Article'
			>
				<BackgroundImage
					className='w-full px-3 pt-40 lg:pt-64 overflow-hidden relative'
					Tag='section'
					fluid={post.frontmatter.Hero_Image[0].remoteImage.sharp.fluid}
					fadeIn='soft'
				>
					<div className='bg-warmGray-700 dark:opacity-50 opacity-0 absolute top-0 left-0 right-0 bottom-0'></div>

					<iframe
						className='w-full opacity-80 mb-5 rounded-2xl max-w-xl'
						title='Apple Music Jukebox'
						allow='autoplay *; encrypted-media *;'
						frameBorder='0'
						height='150'
						sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation'
						src={post.frontmatter.Song.replace('/music.', '/embed.music.')}
					/>

					{post.frontmatter.Devto_URL && (
						<a
							href={post.frontmatter.Devto_URL}
							className='absolute right-3 bottom-3 transform hover:-rotate-6 transition duration-300'
							rel='nofollow'
						>
							<img
								src='https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg'
								alt="Sergei Orlov's DEV Community Profile"
								height='30'
								width='30'
							/>
						</a>
					)}
				</BackgroundImage>

				<div className='p-5 self-center max-w-full'>
					<p className='uppercase text-gray-400 text-sm text-right'>
						Credit goes to: {post.frontmatter.Hero_Alt}
					</p>

					<div className='my-5'>
						<Labels from={post.frontmatter.Tags} />
					</div>

					<div
						className={`prose ${
							proseColors[post.frontmatter.Category.color]
						} lg:prose-xl flex flex-col justify-center dark:prose-dark`}
					>
						<h1 className='text-4xl font-black' itemProp='name'>
							{post.frontmatter.title}
						</h1>

						<p className='hidden'>
							<time dateTime={post.frontmatter.Publish_Date.start} itemProp='datePublished'>
								{post.frontmatter.Publish_Date.start}
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
						<meta itemProp='description' content={post.frontmatter.Meta_Description} />
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
		markdownRemark(frontmatter: { Slug: { eq: $slug } }) {
			...PostPage
		}
	}
`
