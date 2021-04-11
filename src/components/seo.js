import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { graphql, useStaticQuery } from 'gatsby'

const Seo = ({
	url,
	image,
	title,
	description,
	lang = 'en',
	meta = [],
	scripts = [],
	links = [],
	bodyAttributes = {},
}) => {
	const {
		title: defaultTitle,
		siteUrl: defaultUrl,
		description: defaultDescription,
	} = useSiteMetadata()

	const { defaultImage } = useStaticQuery(graphql`
		query FixedImages {
			defaultImage: file(relativePath: { eq: "img/og.jpg" }) {
				sharp: childImageSharp {
					...OpenGraphImage
				}
			}
		}
	`)

	if (url && !url.startsWith('https')) {
		url = `${defaultUrl}${url}`
	}

	const metaDescription = description || defaultDescription

	const metaTitle = title || defaultTitle
	const metaUrl = url || defaultUrl
	let metaImage = image || defaultImage.sharp.fixed.src

	if (!metaImage.startsWith('https')) {
		metaImage = defaultUrl.concat(metaImage)
	}

	const defaultMeta = [
		{ name: 'description', content: metaDescription },
		{
			property: 'og:title',
			content: metaTitle,
		},
		{
			property: 'og:description',
			content: metaDescription,
		},
		{
			property: 'og:type',
			content: 'website',
		},
		{
			property: 'og:url',
			content: metaUrl,
		},
		{
			name: 'twitter:site',
			content: '@orlovedev',
		},
		{
			name: 'twitter:creator',
			content: '@orlowdev',
		},
		{
			name: 'twitter:title',
			content: metaTitle,
		},
		{
			name: 'twitter:description',
			content: metaDescription,
		},
		{
			name: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			property: 'og:image',
			content: metaImage,
		},
		{
			property: 'og:image:width',
			content: '1200',
		},
		{
			property: 'og:image:height',
			content: '630',
		},
	]

	/*

	*/

	const defaultScripts = []
	const defaultLinks = []
	const defaultBodyAttributes = {
		itemscope: 'itemscope',
		itemtype: 'http://schema.org/WebPage',
	}

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={metaTitle.concat(' ||↓')}
			link={defaultLinks.concat(links)}
			script={defaultScripts.concat(scripts)}
			meta={defaultMeta.concat(meta)}
			bodyAttributes={{
				...defaultBodyAttributes,
				...bodyAttributes,
			}}
		>
			<script async src='https://www.googletagmanager.com/gtag/js?id=G-D8P33SEFSE'></script>
			<script>
				{`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-D8P33SEFSE');
				`}
			</script>
			<link rel='preconnect' href='https://fonts.googleapis.com' />
		</Helmet>
	)
}

Seo.propTypes = {
	url: PropTypes.string,
	image: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.array,
	scripts: PropTypes.array,
	links: PropTypes.array,
	bodyAttributes: PropTypes.object,
}

export default Seo
