import { graphql } from 'gatsby'

export const openGraphImageFragment = graphql`
	fragment OpenGraphImage on ImageSharp {
		fixed(width: 1200, height: 630) {
			...GatsbyImageSharpFixed_withWebp
		}
	}
`

export const postPageFragment = graphql`
	fragment PostPage on MarkdownRemark {
		html
		frontmatter {
			title
			Song
			Slug
			Tags {
				name
				color
			}
			Type {
				name
				color
			}
			Language {
				name
				color
			}
			Category {
				name
				color
			}
			Publish_Date {
				start(formatString: "DD MMMM, YYYY")
			}
			Published
			Meta_Description
			Hero_Alt
			Hero_Image {
				remoteImage {
					sharp: childImageSharp {
						fluid(quality: 100) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
			Devto_URL
		}
	}
`

export const postPreviewFragment = graphql`
	fragment PostPreview on MarkdownRemark {
		frontmatter {
			title
			Song
			Slug
			Tags {
				name
				color
			}
			Type {
				name
				color
			}
			Language {
				name
			}
			Category {
				name
				color
			}
			Featured
			Publish_Date {
				start(formatString: "DD MMMM, YYYY")
			}
			Published
			Meta_Description
			Hero_Alt
			Hero_Image {
				remoteImage {
					sharp: childImageSharp {
						fluid(quality: 100) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
			Devto_URL
		}
		excerpt(pruneLength: 150)
		timeToRead
	}
`
