import React from 'react'
import styled from '@emotion/styled'
import { Labels } from './labels'
import { graphql, useStaticQuery } from 'gatsby'

const Tags = styled.div`
	align-self: flex-end;
	text-align: center;
	max-width: 500px;
	margin-left: 1rem;
`

export const TopTags = () => {
	const data = useStaticQuery(graphql`
		query TopTagsQuery {
			tagsGroup: allMarkdownRemark {
				group(field: frontmatter___tags) {
					fieldValue
					totalCount
				}
			}
		}
	`)

	return (
		<Tags>
			<h3>
				<span role='img' aria-label='High fives'>
					🙌
				</span>{' '}
				Top Tags
			</h3>
			<Labels
				from={data.tagsGroup.group
					.sort((a, b) => b.totalCount - a.totalCount)
					.slice(0, 5)
					.map((tag) => `${tag.fieldValue} (${tag.totalCount})`)}
			/>
		</Tags>
	)
}
