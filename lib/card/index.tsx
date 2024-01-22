import { Image } from "~/image"
import { Label } from "~/label"

type P = { post: PostMeta }
export const Card = ({ post }: P) => {
	const href = `/blog/${post.slug}.html`
	const Labels = () => post.labels.map(label => <Label label={label} />)

	return (
		<div class="w-full flex flex-col space-y-4 rounded-md shadow-sm bg-gradient-to-b from-neutral-50 dark:from-stone-900 via-neutral-50 dark:via-stone-900 to-neutral-100 dark:to-neutral-900 hover:ring-1 ring-neutral-300 dark:ring-neutral-900 transition-all duration-300">
			<div class="relative">
				<a href={href}>
					<Image
						class="rounded-t-md h-48 object-cover w-full"
						src={post.hero}
						alt={post.title}
						width={733}
					/>
				</a>

				<div class="absolute top-2 left-2 flex gap-2 flex-wrap">
					<Labels />
				</div>
			</div>

			<div class="grid grid-cols-1 grid-rows-2 space-y-4 p-2 flex-grow">
				<h2 class="text-2xl font-extrabold">
					{post.title}
					<span class="text-neutral-500 text-base align-super break-keep">
						{" "}
						{post.date.toISOString().split("T")[0]}
					</span>
				</h2>

				<p>{post.description}</p>
			</div>

			<div class="flex flex-col space-y-2 p-2">
				<a
					class="no-underline !text-neutral-800 dark:!text-neutral-200 border rounded-md px-4 py-1 border-neutral-800 dark:border-neutral-200 hover:border-orange-500 hover:!text-orange-500 transition-all duration-300"
					href={href}
				>
					Read more →
				</a>
			</div>
		</div>
	)
}
