import React from 'react'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'
import { Header } from './components/header'
import { Colours } from './colours'
import { Footer } from './components/footer'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`

const GlobalStyles = () => (
	<Global
		styles={css`
			:root {
				--deckgo-highlight-code-carbon-box-shadow: 0 0 15px #0000000f;
				--deckgo-highlight-code-carbon-background: #ffffff;
			}

			@font-face {
				font-family: system;
				font-style: normal;
				font-weight: 300;
				src: local('.SFNSText-Light'), local('.HelveticaNeueDeskInterface-Light'),
					local('.LucidaGrandeUI'), local('Ubuntu Light'), local('Segoe UI Light'),
					local('Roboto-Light'), local('DroidSans'), local('Tahoma');
			}

			body {
				font-family: system;
				background-color: #fafafa;
			}

			a {
				color: #333;

				:hover,
				:focus,
				&.active {
					color: ${Colours.PRIMARY};
				}
			}

			code {
				padding: 0.25rem 0.5rem;
				font-weight: 200;
				border: 0;
				border-radius: 4px;
				background-color: ${Colours.LIGHT};
				font-family: 'Fira Code', monospace;
			}

			deckgo-highlight-code {
				margin-bottom: 2rem;
				background: #ffffff;
			}

			#___gatsby {
				> div {
					display: flex;
					flex-direction: column;
					min-height: 100vh;
				}
			}

			.gatsby-resp-image-wrapper {
				z-index: 1 important!;
			}

			figcaption {
				text-align: right;
				color: #ccc;
				font-size: 0.8rem;
				text-transform: uppercase;
			}

			blockquote {
				padding: 1rem;
				border: 0;
				font-size: 0.8rem;
				border-radius: 4px;
				background-color: #fefefe;
				border-left: 3px solid ${Colours.PRIMARY};
			}

			blockquote::before {
				color: ${Colours.PRIMARY};
				content: open-quote;
				font-size: 4rem;
				line-height: 0.1rem;
				margin-right: 0.25rem;
				vertical-align: -0.4rem;
			}

			blockquote p {
				display: online;
			}

			sup {
				top: unset;
				background: ${Colours.LIGHT};
				padding: 3px 8px;
				border-radius: 50%;
				font-family: 'Fira Code', monospace;

				> a,
				a:hover,
				a:visited,
				a:focus {
					text-decoration: none;
					color: #444;
				}
			}
		`}
	/>
)

export const Layout = ({ children }) => (
	<>
		<GlobalStyles />
		<Header />
		<Main>{children}</Main>
		<Footer />
	</>
)
