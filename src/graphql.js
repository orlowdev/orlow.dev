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
			description
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
		}
		fields {
			slug
		}
		excerpt(pruneLength: 150)
		timeToRead
	}
`
