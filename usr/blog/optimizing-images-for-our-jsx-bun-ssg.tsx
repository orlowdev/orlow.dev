import { CodeBlock, CodeBlockFromGist } from "~/code-block"
import { Blockquote } from "~/common/blockquote"
import { BlogPostLayout } from "~/layouts/blog-post"

export const meta: PostMeta = {
	title: "Optimizing Images for our JSX+Bun SSG",
	date: new Date("2024-01-22"),
	slug: "optimizing-images-for-our-jsx-bun-ssg",
	description:
		"In this article we make our Bun+JSX SSG more web vital by optimising images to have the right size and be served in .webp.",
	labels: ["javascript", "typescript", "bun", "jsx", "ssg", "performance"],
	sound:
		"https://music.apple.com/us/album/you-know-what-they-do-to-guys-like-us-in-prison/1156311431?i=1156311436&l=en",
	hero: "/anne-nygard-yqNtaSnxcSU-unsplash.jpg",
}

export default () => (
	<BlogPostLayout post={meta}>
		<Blockquote>
			<strong>NOTE:</strong> This will NOT work with React!
		</Blockquote>

		<p>
			In our <a href="/blog/an-85-loc-ssg-with-bun.html">previous lesson</a> we created a static
			site generator with Bun and JSX. Please make sure that you go through that lesson before
			continuing here. With it's superpower of supporting async code and the fact that it works on
			the server side allow us to do things ordinary React devs could only dream of. On the other
			hand, we can't do any of the client side stuff they do on a day to day basis. But that'd be a
			topic of another article. Now, let's take a look at our code, shall we?
		</p>

		<p>
			Before we move on, we need to install something called <code>sharp</code>. It's a Node-API
			module that is used to convert large images in common formats to smaller, web-friendly JPEG,
			PNG, WebP, GIF and AVIF images of varying dimensions.
		</p>

		<CodeBlock language="shell" path="Terminal">
			$ bun i sharp
		</CodeBlock>

		<p>
			Now, here is the whole component. The steps are described in comments, but overall what it
			does is
		</p>

		<ul class="list-inside list-decimal">
			<li>
				Turn the image to <code>webp</code> format with sligtly decreased quality,
			</li>
			<li>Resize it to the width provided via a prop,</li>
			<li>
				Save the generated image to our <code>dist</code> directory,
			</li>
			<li>
				Return an <code>img</code> tag that uses the new image as a source.
			</li>
		</ul>

		<CodeBlockFromGist
			language="typescript"
			path="./src/components/image.tsx"
			file={`${meta.slug}/image.tsx`}
		/>

		<p>
			Now we can use this image component on our pages. Grap yourself an image, put it somewhere and
			provide its path with the <code>src</code> prop. Don't forget to specify the width so that the
			image is resized correctly.
		</p>

		<CodeBlockFromGist
			language="typescript"
			path="./src/pages/index.tsx"
			file={`${meta.slug}/index.tsx`}
		/>
	</BlogPostLayout>
)
