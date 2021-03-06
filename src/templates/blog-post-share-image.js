import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import BackgroundImage from 'gatsby-background-image'

const Container = styled(BackgroundImage)`
	width: 1200px;
	height: 630px;
	position: relative;
`

const TextWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	top: 220px;
	right: 55px;
	width: 660px;
	text-align: center;
`

const Circle = styled.div`
	height: 3px;
	width: 660px;
	background-color: rgb(215, 154, 146);
	margin: 3rem;
`

const Title = styled.h1`
	font-size: 3rem;
`

const ShareImageTemplate = ({ data }) => {
	const post = data.markdownRemark

	return (
		<Container fixed={data.defaultImage.sharp.fixed}>
			<TextWrapper>
				<Circle />
				<Title>{post.frontmatter.title}</Title>
			</TextWrapper>
		</Container>
	)
}

ShareImageTemplate.propTypes = {
	data: PropTypes.object,
}

export default ShareImageTemplate

export const query = graphql`
	query ShareImageContents($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			...PostPage
		}
		defaultImage: file(relativePath: { eq: "img/og.jpg" }) {
			sharp: childImageSharp {
				fixed(width: 1200, height: 630) {
					...GatsbyImageSharpFixed_withWebp
				}
			}
		}
	}
`
