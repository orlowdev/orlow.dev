import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const StyledFooter = styled.footer`
	text-align: center;
	padding: 2rem;
	font-size: 1rem;
	color: #ccc;
`

const ExternalLink = styled.a`
	color: #ccc;
`

const InternalLink = styled(Link)`
	color: #ccc;
`

const FooterLinks = styled.ol`
	list-style: none;
	margin: 0;
`

export const Footer = () => {
	const { siteUrl } = useSiteMetadata()

	return (
		<StyledFooter role='contentinfo' itemScope itemType='http://schema.org/WPFooter'>
			<p>
				&copy;&nbsp;<span itemProp='copyrightYear'>2021</span>&nbsp;
				<span itemProp='copyrightHolder' itemScope itemType='http://schema.org/Person'>
					<span itemProp='name'>
						<InternalLink to={siteUrl} itemProp='url'>
							Sergei Orlow
						</InternalLink>
					</span>
				</span>
			</p>
			<nav>
				<FooterLinks>
					<li>
						<ExternalLink rel='nofollow' href='https://github.com/orlowdev/orlow.dev'>
							Source Code
						</ExternalLink>
					</li>
					<li>
						<InternalLink to='/rss.xml' rel='alternate' type='application/rss+xml'>
							RSS
						</InternalLink>
					</li>
					<li>
						<InternalLink to='/sitemap.xml'>Sitemap</InternalLink>
					</li>
				</FooterLinks>
			</nav>
		</StyledFooter>
	)
}
