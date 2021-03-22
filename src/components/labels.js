import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Colours } from '../colours'

export const Label = styled.span`
	padding: 0.25rem 0.5rem;
	background-color: ${Colours.LIGHT};
	border: 0;
	border-radius: 4px;
	box-shadow: 0 0 15px #0000000f;
	font-size: 0.8rem;
	margin-right: 8px;
	margin-bottom: 8px !important;
	text-transform: lowercase;
	white-space: nowrap;

	> a {
		text-decoration: none;
		color: #333;
	}

	:last-of-type {
		margin-right: 0;
	}
`

export const List = styled.div`
	margin-bottom: 2rem;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`

export const Labels = ({ from, limit = 0 }) => {
	const tags = limit ? from.slice(0, limit) : from

	return (
		<List>
			{tags.map((tag, i) => (
				<Label key={tag || i}>
					<Link to={`/tags/${tag}/`}>#{tag}</Link>
				</Label>
			))}
		</List>
	)
}

Labels.propTypes = {
	from: PropTypes.array,
	limit: PropTypes.number,
}
