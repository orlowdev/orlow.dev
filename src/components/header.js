import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import TwitterIcon from 'simple-icons/icons/twitter'
import InstagramIcon from 'simple-icons/icons/instagram'
import YouTubeIcon from 'simple-icons/icons/youtube'
import GitHubIcon from 'simple-icons/icons/github'
import { ExternalRoutes } from '../routes'
import { Link } from 'gatsby'

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: #fff;
	z-index: 2000;
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
	font-weight: 900;
	font-size: 1rem;
	vertical-align: center;
	text-decoration: none;
	color: #444;
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
					<a rel='nofollow' href={ExternalRoutes.INSTAGRAM} itemProp='url'>
						<Icon svg={InstagramIcon.svg} />
					</a>
				</Item>
				<Item itemProp='name'>
					<a rel='nofollow' href={ExternalRoutes.TWITTER} itemProp='url'>
						<Icon svg={TwitterIcon.svg} />
					</a>
				</Item>
				<Item itemProp='name'>
					<a rel='nofollow' href={ExternalRoutes.YOUTUBE} itemProp='url'>
						<Icon svg={YouTubeIcon.svg} />
					</a>
				</Item>
				<Item itemProp='name'>
					<a rel='nofollow' href={ExternalRoutes.GITHUB} itemProp='url'>
						<Icon svg={GitHubIcon.svg} />
					</a>
				</Item>
			</List>
		</nav>
	</StyledHeader>
)

Icon.propTypes = {
	svg: PropTypes.string,
}
