import BlogPostLayout from "~/layouts/blog-post"

export const meta: PostMeta = {
	name: "Oath By Example: 5 Ways You Can Benefit from Using `oathify`",
	date: new Date("2024-01-19"),
	slug: "oath-by-example",
	description:
		"In this article we take a look at a few examples of how you can leverage from oathifying promises for laziness, improved comfort and predictability in your asynchronous code.",
	labels: ["oath", "javascript", "typescript", "async"],
	sound:
		"https://music.apple.com/us/album/a-boy-brushed-red-living-in-black-and-white/724489148?i=724489836",
	hero: "/fabian-gieske-zWlMTSA3uvk-unsplash.jpg",
}

export default function OathByExample() {
	return (
		<BlogPostLayout post={meta}>
			<h1 class="text-2xl font-black uppercase">{meta.name}</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta magni itaque sunt explicabo!
				Culpa itaque animi vel voluptates maiores minima corrupti, hic expedita nemo dolores,
				voluptas nulla eaque fugiat. Quia nesciunt aliquid temporibus numquam ea hic nobis voluptate
				provident fuga quis. Eveniet architecto sunt, facere inventore asperiores at! Modi
				cupiditate cumque esse maiores autem, perferendis eveniet quos, tenetur, eius quasi
				voluptatem similique mollitia inventore. Maiores excepturi, vero, voluptate natus commodi,
				cum impedit amet aspernatur adipisci optio incidunt perspiciatis sunt. Sunt ducimus ut
				explicabo voluptas facere dolore maiores, deserunt odit quaerat et corporis quisquam
				sapiente repudiandae quas mollitia, iure illo in?
			</p>
		</BlogPostLayout>
	)
}
