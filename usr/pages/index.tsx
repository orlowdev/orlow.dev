import { promises } from "fs"
import { Html } from "~/common/html"
import { Head } from "~/common/head"
import { Body } from "~/common/body"
import { Main } from "~/common/main"
import { Footer } from "~/common/footer"
import { Card } from "~/card"

const title = "Hello world"

export default function LandingPage() {
	return postsP.then(posts => (
		<Html>
			<Head>
				<title>{title}</title>
			</Head>
			<Body>
				<Main>
					<div class="flex justify-center p-4">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-6xl">
							{posts.map(post => (
								<Card post={post} />
							))}
						</div>
					</div>
				</Main>
				<Footer />
			</Body>
		</Html>
	))
}

// --- Internal ---

const dropFileExtension = (post: string) => post.substring(0, post.lastIndexOf("."))

const dropFileExtensions = (posts: string[]) => Promise.all(posts.map(dropFileExtension))

const importBlogPostMeta = (post: string) => import(`./blog/${post}`).then(post => post.meta)

const importPostsMeta = (posts: string[]): Promise<PostMeta[]> =>
	Promise.all(posts.map(importBlogPostMeta))

const sortPostsByDate = (posts: PostMeta[]) => posts.sort((a, b) => (a.date > b.date ? -1 : 1))

/**
 * @todo Add OG
 * @see https://blog.logrocket.com/create-open-graph-image-generator-node-js/
 *
 * @todo Add meta
 * @todo Bring in Oath
 * @todo Attach client script
 */
const postsP = promises
	.readdir("./usr/blog")
	.then(dropFileExtensions)
	.then(importPostsMeta)
	.then(sortPostsByDate)
