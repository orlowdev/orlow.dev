const path = require('path')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.onCreateNode = async ({ node, actions: { createNode }, createNodeId, getCache }) => {
	if (node.internal.type === 'MarkdownRemark') {
		for (let i = 0; i < node.frontmatter['Hero Image'].length; i++) {
			const name = node.frontmatter['Hero Image'][i].name

			if (!name) {
				continue
			}

			if (name.startsWith('http')) {
				const fileNode = await createRemoteFileNode({
					url: name,
					parentNodeId: node.id,
					createNode,
					createNodeId,
					getCache,
				})

				if (fileNode) {
					node.frontmatter['Hero Image'][i].remoteImage___NODE = fileNode.id
				}
			}
		}
	}
}

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions

	const blogPostTemplate = path.resolve('src/templates/blog-post-template.js')
	const tagTemplate = path.resolve('src/templates/tag-template.js')
	const imageShareTemplate = path.resolve('src/templates/blog-post-share-image.js')

	const result = await graphql(`
		{
			postsRemark: allMarkdownRemark(
				filter: { frontmatter: { Published: { eq: true } } }
				sort: { order: DESC, fields: [frontmatter___Publish_Date___start] }
			) {
				edges {
					node {
						frontmatter {
							Slug
						}
					}
				}
			}
			tagsGroup: allMarkdownRemark(
				filter: { frontmatter: { Published: { eq: true } } }
				sort: { order: DESC, fields: [frontmatter___Publish_Date___start] }
			) {
				group(field: frontmatter___Tags___name) {
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

	posts.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.Slug,
			component: blogPostTemplate,
			context: {
				slug: node.frontmatter.Slug,
			},
		})

		if (process.env.gatsby_executing_command.includes('develop')) {
			createPage({
				path: `${node.frontmatter.Slug}/image_share/`,
				component: imageShareTemplate,
				context: {
					slug: node.frontmatter.Slug,
				},
			})
		}
	})

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
