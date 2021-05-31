import React from 'react'
import PropTypes from 'prop-types'

export const TimeToRead = ({ timeToRead }) => (
	<span className='text-gray-400 dark:text-warmGray-300 text-xs my-2 tracking-tight'>
		Time to Read: {timeToRead} min {'⏱'.repeat(Math.ceil(timeToRead / 10))}
	</span>
)

TimeToRead.propTypes = {
	timeToRead: PropTypes.number,
}
