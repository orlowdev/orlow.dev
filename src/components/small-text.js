import React from 'react'
import PropTypes from 'prop-types'

export const SmallText = ({ children }) => (
	<p className='bg-white shadow-sm p-5 text-sm border-t-2 border-indigo-600 text-gray-700 rounded-2xl max-w-xl'>
		{children}
	</p>
)

SmallText.propTypes = {
	children: PropTypes.oneOf(PropTypes.object, PropTypes.array),
}
