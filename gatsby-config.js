// Initial values
const DEFAULT_URL = 'https://orlow.dev'

// Env variables extraction (Netlify-specific mostly)
const {
	NODE_ENV,
	URL: NETLIFY_SITE_URL = DEFAULT_URL,
	DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
	CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === 'production'

const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL
const title = 'Much Sergei Orlov Website'
const description =
	'Advice on improving developer productivity and continuously growing as a dev.  Tips on how to grow as a software developer, improve productivity, boost management and leadership skills, and jump into tracks beyond software engineering'
const name = 'Sergei Orlov'
const bio =
	'Sergei is a full stack JavaScript developer. He is obsessed with improving developer productivity. He likes TypeScript projects without a single "any", Prettier formatting, Mazda cars, and handwriting. He prefers tabs over spaces and paid time over free time. He spends his free time giving advice to his friends who never asked him to do so.'

module.exports = {
	siteMetadata: {
		siteUrl,
		title,
		description,
		author: {
			name,
			bio,
		},
	},
	plugins: [
		'gatsby-plugin-postcss',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: ['JetBrains Mono'],
				},
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages/`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'content',
				path: `${__dirname}/content/`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: `${__dirname}/assets/`,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-autolink-headers',
					'gatsby-plugin-catch-links',
					'gatsby-remark-embedder',
					{
						resolve: 'gatsby-remark-highlight-code',
						options: {
							terminal: 'carbon',
							theme: 'one-light',
							lineNumbers: false,
						},
					},
					{
						resolve: 'gatsby-remark-external-links',
						options: {
							target: null,
							rel: 'nofollow',
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 2048,
							showCaptions: true,
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `{
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) =>
							allMarkdownRemark.edges.map((edge) => ({
								...edge.node.frontmatter,
								description: edge.node.excerpt,
								date: edge.node.frontmatter.date,
								url: site.siteMetadata.siteUrl + edge.node.fields.slug,
								guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
								custom_elements: [{ 'content:encoded': edge.node.html }],
							})),
						query: `{
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/content/" }, frontmatter: { published: { eq: true } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }`,
						output: '/rss.xml',
						title: '||↓ RSS Feed',
					},
				],
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: '||↓',
				short_name: '||↓',
				start_url: '/',
				background_color: '#fff',
				theme_color: '#94234A',
				icon: 'assets/img/favicon.png',
				display: 'standalone',
				cache_busting_mode: 'none',
				icon_options: {
					purpose: 'maskable',
				},
			},
		},
		{
			resolve: 'gatsby-plugin-offline',
			options: {
				workboxConfig: {
					globPatterns: ['**/*'],
				},
			},
		},
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: '#94234A',
				showSpinner: true,
			},
		},
		'gatsby-plugin-robots-txt',
	],
}
