import { promises } from "fs"
import { Html } from "~/common/html"
import { Head } from "~/common/head"
import { Body } from "~/common/body"
import { Main } from "~/common/main"
import { Footer } from "~/common/footer"
import { Card } from "~/card"
import { Oath } from "oathify"
import { Null } from "~/common/null"

export const meta: PageMeta = {
	title: "||↓ DEV",
	hero: "/index.jpg",
	labels: [],
}

/**
 * @todo Attach client script
 * @todo Add opengraph and twitter card
 * @see https://blog.logrocket.com/create-open-graph-image-generator-node-js/
 *
 */
export default () =>
	Oath.from(() => promises.readdir("./usr/blog"))
		.map(dropFileExtensions)
		.chain(importPostsMeta)
		.map(sortPostsByDate)
		.fork(Null, posts => (
			<Html>
				<Head>
					<title>{title}</title>
					<meta name="description" content={description} />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:url" content="https://orlow.dev" />
					<meta property="og:image" content="https://orlow.dev/index.og.png" />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta name="twitter:title" content={title} />
					<meta name="twitter:description" content={description} />
					<meta name="twitter:image" content="https://orlow.dev/index.og.png" />
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

// --- Internal ---

const title = "Very much Orlowdev website – ||↓ DEV"
const description =
	"Orlowdev's blog contains various notes on writing code. Especially in JavaScript and TypeScript."

const sortPostsByDate = (posts: PostMeta[]) => posts.sort((a, b) => (a.date > b.date ? -1 : 1))
const dropFileExtension = (post: string) => post.substring(0, post.lastIndexOf("."))
const dropFileExtensions = (posts: string[]) => posts.map(dropFileExtension)
const importBlogPostMeta = (post: string) => import(`./blog/${post}`).then(post => post.meta)
const importPostsMeta = (posts: string[]): Oath<PostMeta[]> =>
	Oath.all(posts.map(importBlogPostMeta))
