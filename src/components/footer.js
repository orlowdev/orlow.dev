import styled from '@emotion/styled'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import React from 'react'

const StyledFooter = styled.footer`
	text-align: center;
	padding: 2rem;
	font-size: 0.6rem;
	color: #ccc;
`

const Link = styled(OutboundLink)`
	color: #ccc;
`

export const Footer = () => (
	<StyledFooter role='contentinfo' itemScope itemType='http://schema.org/WPFooter'>
		<Link rel='nofollow' href='https://github.com/orlowdev/orlow.dev'>
			Source Code
		</Link>
		<p>
			&copy;&nbsp;<span itemProp='copyrightYear'>2015</span>&nbsp;
			<span itemProp='copyrightHolder' itemScope itemType='http://schema.org/Person'>
				<span itemProp='name'>Sergei Orlow</span>
			</span>
		</p>
	</StyledFooter>
)
