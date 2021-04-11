import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export const Labels = ({ from, limit = 0 }) => {
	const tags = limit ? from.slice(0, limit) : from

	return (
		<div className='mb-2 flex flex-wrap w-full'>
			{tags.map((tag, i) => (
				<span
					className='bg-gray-200  whitespace-nowrap lowercase text-sm shadow-sm ml-1 mt-1 rounded-xl transition hover:bg-gray-300 focus:ring'
					key={tag || i}
				>
					<Link
						className='inline-block px-4 py-1 text-gray-800 transition font-bold'
						to={`/tags/${tag}/`}
					>
						#{tag}
					</Link>
				</span>
			))}
		</div>
	)
}

Labels.propTypes = {
	from: PropTypes.array,
	limit: PropTypes.number,
}
