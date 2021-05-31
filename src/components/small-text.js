import React from 'react'
import PropTypes from 'prop-types'

export const SmallText = ({ children }) => (
	<p className='bg-white shadow-xl p-5 text-sm text-gray-700 rounded-2xl max-w-xl  dark:text-warmGray-300 dark:bg-warmGray-600'>
		{children}
	</p>
)

SmallText.propTypes = {
	children: PropTypes.oneOf(PropTypes.object, PropTypes.array),
}
