const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions

	if (node.internal.type == 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode, basePath: 'pages' })

		createNodeField({
			node,
			name: 'slug',
			value: slug,
		})
	}
}

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions

	const blogPostTemplate = path.resolve('src/templates/blog-post-template.js')
	const tagTemplate = path.resolve('src/templates/tag-template.js')

	const result = await graphql(`
		{
			postsRemark: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							tags
						}
					}
				}
			}
			tagsGroup: allMarkdownRemark {
				group(field: frontmatter___tags) {
					fieldValue
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.')
		return
	}

	const posts = result.data.postsRemark.edges

	posts.forEach(({ node }) =>
		createPage({
			path: node.fields.slug,
			component: blogPostTemplate,
			context: {
				slug: node.fields.slug,
			},
		}),
	)

	const tags = result.data.tagsGroup.group

	tags.forEach((tag) =>
		createPage({
			path: `/tags/${tag.fieldValue}/`,
			component: tagTemplate,
			context: {
				tag: tag.fieldValue,
			},
		}),
	)
}
