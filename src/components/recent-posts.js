import styled from '@emotion/styled'

export const RecentPosts = styled.ul`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	list-style: none;
	margin: 0;
	padding: 2rem 1rem 0;
	justify-content: space-between;

	> li {
		flex-grow: 1;
		max-width: 500px;
	}
`
