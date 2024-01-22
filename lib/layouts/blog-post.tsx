import { Html } from "~/common/html"
import { Head } from "~/common/head"
import { Body } from "~/common/body"
import { Main } from "~/common/main"
import { Footer } from "~/common/footer"
import { Label } from "~/label"
import { Jukebox } from "~/jukebox"
import { Heading } from "~/common/heading"
import { Image } from "~/image"

type P = PropsWithChildren<{ post: PostMeta }>
export const BlogPostLayout = ({ children, post }: P) => {
	const credits = post.hero.substring(1, post.hero.lastIndexOf("."))
	const Labels = () => post.labels.map(label => <Label label={label} />)

	return (
		<Html>
			<Head>
				<title>{post.title} – ||↓ DEV</title>
				<meta name="description" content={post.description} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={post.title} />
				<meta property="og:description" content={post.description} />
				<meta property="og:url" content={`https://orlow.dev/blog/${post.slug}.html`} />
				<meta property="og:image" content={`https://orlow.dev/blog/${post.slug}.og.png`} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta name="twitter:title" content={post.title} />
				<meta name="twitter:description" content={post.description} />
				<meta name="twitter:image" content={`https://orlow.dev/blog/${post.slug}.og.png`} />
			</Head>
			<Body>
				<Main>
					<article class="h-full overflow-x-hidden">
						<div class="relative h-96">
							<Image
								width={1920}
								src={post.hero}
								alt={credits}
								title={credits}
								class="w-full h-96 object-none object-center-top"
							/>

							<div class="absolute top-3 left-3 right-3 flex justify-between items-center">
								<div class="flex flex-wrap gap-2">
									<Labels />
								</div>

								<div>
									<a href="/">
										<svg
											viewBox="0 0 24 24"
											class="h-8 w-8 invert mix-blend-difference"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
											/>
										</svg>
									</a>
								</div>
							</div>

							<div class="absolute bottom-1 left-1 right-1 w-full p-2 max-w-[480px]">
								<Jukebox track={post.sound} />
							</div>
						</div>
						<div class="flex justify-center px-4 py-8">
							<div class="flex flex-col space-y-4 w-full max-w-3xl">
								<Heading level={1}>
									<span class="block w-full text-center my-4">
										<span>{post.title}</span>
										<span class="text-neutral-500 text-base align-super">
											{" "}
											{post.date.toISOString().split("T")[0]}
										</span>
									</span>
								</Heading>
								{children}
							</div>
						</div>
					</article>
				</Main>
				<Footer />
			</Body>
		</Html>
	)
}
