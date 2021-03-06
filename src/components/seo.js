import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'

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

	if (url && !url.startsWith('https')) {
		url = `${defaultUrl}${url}`
	}

	const metaDescription = description || defaultDescription

	const metaTitle = title || defaultTitle
	const metaUrl = url || defaultUrl

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
	]

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
		/>
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
