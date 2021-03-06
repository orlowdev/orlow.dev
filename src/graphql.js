import { graphql } from 'gatsby'

export const postPageFragment = graphql`
	fragment PostPage on MarkdownRemark {
		html
		fields {
			slug
		}
		frontmatter {
			title
			song
			tags
			date(formatString: "DD MMMM, YYYY")
			description
			imageAlt
			image {
				sharp: childImageSharp {
					fluid(quality: 100) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	}
`

export const postPreviewFragment = graphql`
	fragment PostPreview on MarkdownRemark {
		frontmatter {
			title
			date(formatString: "DD MMMM, YYYY")
			description
			tags
			song
			imageAlt
			image {
				sharp: childImageSharp {
					fixed(quality: 90, width: 300, height: 300) {
						...GatsbyImageSharpFixed_withWebp
					}
				}
			}
		}
		fields {
			slug
		}
		excerpt(pruneLength: 150)
		timeToRead
	}
`
