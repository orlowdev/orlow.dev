import { Html } from "~/common/html"
import { Head } from "~/common/head"
import { Body } from "~/common/body"
import { Main } from "~/common/main"
import { Footer } from "~/common/footer"
import { Label } from "~/label"
import { Jukebox } from "~/jukebox"
import { Heading } from "~/common/heading"

type P = PropsWithChildren<{ post: PostMeta }>
export default function BlogPostLayout({ children, post }: P) {
	const credits = post.hero.substring(1, post.hero.lastIndexOf("."))
	const Labels = () => post.labels.map(label => <Label label={label} />)

	return (
		<Html>
			<Head>
				<title>{post.name}</title>
				<meta name="description" content={post.description} />
			</Head>
			<Body>
				<Main>
					<article class="h-full">
						<div class="relative h-96">
							<img
								src={post.hero}
								alt={credits}
								title={credits}
								class="w-full h-96 object-none object-center-top"
							/>

							<div class="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
								<Labels />
							</div>

							<div class="absolute bottom-1 left-1 right-1 w-full p-2 max-w-[480px]">
								<Jukebox track={post.sound} />
							</div>
						</div>
						<div class="flex justify-center px-4 py-8">
							<div class="flex flex-col space-y-4 w-full max-w-3xl">
								<Heading level={1}>
									<span class="block w-full text-center my-4">
										<span>{post.name}</span>
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
