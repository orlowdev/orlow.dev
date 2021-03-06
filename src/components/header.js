import React from 'react'
import styled from '@emotion/styled'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import PropTypes from 'prop-types'
import TwitterIcon from 'simple-icons/icons/twitter'
import InstagramIcon from 'simple-icons/icons/instagram'
import YouTubeIcon from 'simple-icons/icons/youtube'
import GitHubIcon from 'simple-icons/icons/github'
import { ExternalRoutes } from '../routes'
import { Link } from 'gatsby'
import { Colours } from '../colours'

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	box-shadow: 0 0 15px #0000000f;
`

const List = styled.ol`
	list-style: none;
	display: flex;
	margin: 0;
`

const Item = styled.li`
	margin: 0 1rem 0 0;

	> a {
		text-decoration: none;
	}

	:last-of-type {
		margin-right: 0;
	}
`

const LogoLink = styled(Link)`
	text-decoration: none;
`

const Logo = styled.span`
	font-family: Montserrat, system;
	font-size: 1rem;
	vertical-align: center;
	text-decoration: none;
	color: ${Colours.PRIMARY};
`

const IconSpan = styled.span`
	> svg {
		display: block;
		width: 30px;
		height: 30px;
		padding: 5px;
		fill: #444;
	}
`

const Icon = ({ svg }) => <IconSpan dangerouslySetInnerHTML={{ __html: svg }} />

export const Header = () => (
	<StyledHeader itemScope itemType='http://schema.org/WPHeader'>
		<LogoLink to='/'>
			<Logo>||↓</Logo>
		</LogoLink>
		<nav role='navigation' itemScope itemType='http://schema.org/SiteNavigationElement'>
			<List>
				<Item itemProp='name'>
					<OutboundLink rel='nofollow' href={ExternalRoutes.INSTAGRAM} itemProp='url'>
						<Icon svg={InstagramIcon.svg} />
					</OutboundLink>
				</Item>
				<Item itemProp='name'>
					<OutboundLink rel='nofollow' href={ExternalRoutes.TWITTER} itemProp='url'>
						<Icon svg={TwitterIcon.svg} />
					</OutboundLink>
				</Item>
				<Item itemProp='name'>
					<OutboundLink rel='nofollow' href={ExternalRoutes.YOUTUBE} itemProp='url'>
						<Icon svg={YouTubeIcon.svg} />
					</OutboundLink>
				</Item>
				<Item itemProp='name'>
					<OutboundLink rel='nofollow' href={ExternalRoutes.GITHUB} itemProp='url'>
						<Icon svg={GitHubIcon.svg} />
					</OutboundLink>
				</Item>
			</List>
		</nav>
	</StyledHeader>
)

Icon.propTypes = {
	svg: PropTypes.string,
}
