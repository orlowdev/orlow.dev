import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { bgColors } from '../colors'

export const Labels = ({ from, limit = 0 }) => {
	const tags = limit ? from.slice(0, limit) : from

	return (
		<div className='mb-2 flex flex-wrap w-full'>
			{tags.map((tag, i) => (
				<span
					className={`${
						bgColors[tag.color]
					}  whitespace-nowrap lowercase text-sm shadow-sm ml-1 mt-1 rounded-xl transition hover:bg-pink-300 focus:ring`}
					key={tag.name || i}
				>
					<Link
						className='inline-block px-4 py-1 text-gray-800 transition font-bold'
						to={`/tags/${tag.name}/`}
					>
						#{tag.name}
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
