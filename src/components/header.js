import React from 'react'
import styled from '@emotion/styled'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
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
`

const Logo = styled.span`
	font-family: Montserrat, system;
	font-size: 1.5rem;
	vertical-align: center;
	text-decoration: none;
	color: ${Colours.PRIMARY};

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`

const IconSpan = styled.span`
	> svg {
		display: block;
		width: 40px;
		height: 40px;
		fill: ${Colours.PRIMARY};

		@media screen and (max-width: 768px) {
			width: 35px;
			height: 35px;
		}
	}
`

const Icon = ({ svg }) => <IconSpan dangerouslySetInnerHTML={{ __html: svg }} />

export const Header = () => (
	<StyledHeader>
		<div />
		<nav>
			<List>
				<Item>
					<Link to='/'>
						<Logo>||↓</Logo>
					</Link>
				</Item>
				<Item>
					<OutboundLink rel='nofollow' href={ExternalRoutes.INSTAGRAM}>
						<Icon svg={InstagramIcon.svg} />
					</OutboundLink>
				</Item>
				<Item>
					<OutboundLink rel='nofollow' href={ExternalRoutes.TWITTER}>
						<Icon svg={TwitterIcon.svg} />
					</OutboundLink>
				</Item>
				<Item>
					<OutboundLink rel='nofollow' href={ExternalRoutes.YOUTUBE}>
						<Icon svg={YouTubeIcon.svg} />
					</OutboundLink>
				</Item>
				<Item>
					<OutboundLink rel='nofollow' href={ExternalRoutes.GITHUB}>
						<Icon svg={GitHubIcon.svg} />
					</OutboundLink>
				</Item>
			</List>
		</nav>
	</StyledHeader>
)
