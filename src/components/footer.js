import { Link } from 'gatsby'
import React from 'react'
import twitter from 'simple-icons/icons/twitter'
import github from 'simple-icons/icons/github'
import youtube from 'simple-icons/icons/youtube'
import instagram from 'simple-icons/icons/instagram'
import { ExternalRoutes } from '../routes'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export const Footer = () => {
	const { siteUrl } = useSiteMetadata()

	return (
		<footer
			className='w-full flex flex-col items-center space-y-6 text-sm bg-gray-300 py-12 text-center'
			role='contentinfo'
			itemScope
			itemType='http://schema.org/WPFooter'
		>
			<nav
				className='flex'
				role='navigation'
				itemScope
				itemType='http://schema.org/SiteNavigationElement'
			>
				<ul className='flex flex-row space-x-4 flex-wrap w-full'>
					{links.map(({ title, icon, href }) => (
						<li key={title}>
							<meta itemProp='name' content={title} />
							<a
								className='flex items-center p-3 bg-pink-600 rounded-full shadow-xl'
								rel='nofollow'
								href={href}
								itemProp='url'
							>
								<svg
									title={title}
									className='inline-block w-8 h-8 fill-current text-gray-200 transform hover:-rotate-6 hover:text-pink-900 transition duration-300'
									dangerouslySetInnerHTML={{ __html: icon.svg }}
								/>
							</a>
						</li>
					))}
				</ul>
			</nav>

			<nav>
				<ul>
					<li>
						<Link className='text-gray-500' rel='nofollow' to='/about'>
							About
						</Link>
					</li>
					<li>
						<a
							className='text-gray-500'
							rel='nofollow'
							href='https://github.com/orlowdev/orlow.dev'
						>
							Source Code
						</a>
					</li>
					<li>
						<Link
							className='text-gray-500'
							to='/rss.xml'
							rel='alternate'
							type='application/rss+xml'
						>
							RSS
						</Link>
					</li>
					<li>
						<Link className='text-gray-500' to='/sitemap.xml'>
							Sitemap
						</Link>
					</li>
				</ul>
			</nav>

			<p className='text-gray-500'>
				&copy;&nbsp;<span itemProp='copyrightYear'>2021</span>&nbsp;
				<span itemProp='copyrightHolder' itemScope itemType='http://schema.org/Person'>
					<span itemProp='name'>
						<a className='text-gray-600' href={siteUrl} itemProp='url'>
							Sergei Orlov
						</a>
					</span>
				</span>
			</p>
		</footer>
	)
}

const links = [
	{
		href: ExternalRoutes.TWITTER,
		title: 'Twitter',
		icon: twitter,
	},
	{
		href: ExternalRoutes.INSTAGRAM,
		title: 'Instagram',
		icon: instagram,
	},
	{
		href: ExternalRoutes.YOUTUBE,
		title: 'YouTube',
		icon: youtube,
	},
	{
		href: ExternalRoutes.GITHUB,
		title: 'GitHub',
		icon: github,
	},
]
