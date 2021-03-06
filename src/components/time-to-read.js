import styled from '@emotion/styled'
import React from 'react'
import PropTypes from 'prop-types'

const Wrapper = styled.span`
	color: #777;
`

export const TimeToRead = ({ timeToRead }) => (
	<Wrapper>
		Time to Read: {timeToRead} min {'⏱ '.repeat(Math.ceil(timeToRead / 8))}
	</Wrapper>
)

TimeToRead.propTypes = {
	timeToRead: PropTypes.number,
}
