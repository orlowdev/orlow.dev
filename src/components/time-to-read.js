import styled from '@emotion/styled'
import React from 'react'

const Wrapper = styled.span`
	color: #777;
`

export const TimeToRead = ({ timeToRead }) => (
	<Wrapper>
		Time to Read: {timeToRead} min {'⏱ '.repeat(Math.ceil(timeToRead / 8))}
	</Wrapper>
)
