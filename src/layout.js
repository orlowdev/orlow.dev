import React from 'react'
import PropTypes from 'prop-types'
import { Header } from './components/header'
import { Footer } from './components/footer'

export const Layout = ({ children }) => (
	<>
		<Header className='w-full' />
		<main
			className='bg-gray-100 w-full flex flex-col'
			role='main'
			itemScope
			itemProp='mainContentOfPage'
		>
			{children}
		</main>
		<Footer />
	</>
)

Layout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}
