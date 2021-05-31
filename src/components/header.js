import { Link } from 'gatsby'
import React from 'react'
import { ExternalRoutes } from '../routes'
import twitter from 'simple-icons/icons/twitter'
import github from 'simple-icons/icons/github'
import youtube from 'simple-icons/icons/youtube'
import instagram from 'simple-icons/icons/instagram'

export const Header = () => (
	<div className='bg-gray-100 dark:bg-warmGray-700 p-3 flex justify-between'>
		<Link
			className='inline-block text-gray-700 dark:text-warmGray-300 text-3xl font-black hover:text-pink-700 transition hover:-rotate-6 transform'
			to='/'
		>
			||↓
		</Link>

		<nav
			className='flex'
			role='navigation'
			itemScope
			itemType='http://schema.org/SiteNavigationElement'
		>
			<ul className='flex flex-row space-x-3'>
				{links.map(({ title, icon, href }) => (
					<li key={title}>
						<meta itemProp='name' content={title} />
						<a
							className='flex items-center p-2 bg-pink-600 rounded-full shadow-xl'
							rel='nofollow'
							href={href}
							itemProp='url'
						>
							<svg
								title={title}
								className='inline-block w-6 h-6 fill-current text-gray-200 dark:text-warmGray-700 transform hover:-rotate-6 hover:text-pink-900 transition duration-300'
								dangerouslySetInnerHTML={{ __html: icon.svg }}
							/>
						</a>
					</li>
				))}
			</ul>
		</nav>
	</div>
)

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
