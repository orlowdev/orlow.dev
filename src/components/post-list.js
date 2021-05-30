import React from 'react'
import PropTypes from 'prop-types'
import { PostPreview } from './post-preview'

export const PostList = ({ posts }) => (
	<section
		itemScope
		itemType='https://schema.org/ItemList'
		className='grid gap-5 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min'
	>
		{posts.map(({ node }, i) => (
			<div
				key={node.frontmatter.Slug}
				className={`max-w-sm xl:max-w-none h-full w-full ${
					node.frontmatter.Featured ? 'row-span-2' : 'row-span-1'
				}`}
				itemProp='itemListElement'
				itemScope
				itemType='https://schema.org/ListItem'
			>
				<meta itemProp='position' content={i + 1} />
				<meta itemProp='name headline' content={node.frontmatter.title} />

				<PostPreview post={node} />
			</div>
		))}
	</section>
)

PostList.propTypes = {
	posts: PropTypes.array,
}
