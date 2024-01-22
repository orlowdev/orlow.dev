import { CodeBlockFromGist } from "~/code-block"
import { Heading } from "~/common/heading"
import { BlogPostLayout } from "~/layouts/blog-post"

export const meta: PostMeta = {
	title: "An 85 Lines of Code Static Site Generator with Bun and JSX",
	date: new Date("2024-01-18"),
	slug: "an-85-loc-ssg-with-bun",
	description:
		"In this short guide we'll go through the step-by-step process of creating an SSG from scratch using Bun and JSX.",
	labels: ["from-scratch", "guide", "javascript", "typescript", "bun", "jsx", "ssg"],
	sound: "https://music.apple.com/us/album/i-dont-need-you/1647241269?i=1647241683",
	hero: "/dima-solomin-8gXzLPWPu7E-unsplash.jpg",
}

const GISTS = "/an-85-loc-ssg-with-bun/"

export default () => (
	<BlogPostLayout post={meta}>
		<p>
			In this post we'll take a brief look on how to create an SSG (static site generator) with Bun.
			It will take your components written in JSX and turn them into HTML pages.
		</p>

		<p>This will be a three-step process.</p>

		<ol class="list-decimal list-inside ml-4">
			<li>
				collect all the pages that we conventionally put in a single directory. Nesting directories
				will be preserved as well,
			</li>
			<li>transpile JSX inside the pages into JS files with functions that produce HTML,</li>
			<li>
				loop over JS files, running them and saving HTML into <code>.html</code> files
			</li>
		</ol>

		<p>Let's get to it.</p>

		<Heading level={2}>TS config</Heading>

		<p>
			First off, we need to drop the X in JSX. To do so, we instruct Bun to use our custom function
			for transpiling JSX. We'll go with a <code>react-jsx</code> preset. We'll also define a{" "}
			<strong>gutsby</strong> path, which is going to be our JSX handler. With this path in place,
			we set <strong>gutsby</strong> as our <code>jsxImportSource</code>.
		</p>

		<CodeBlockFromGist
			language="json"
			path="./tsconfig.json"
			file={GISTS.concat("tsconfig.json")}
		/>

		<p>
			Next we need to <code>bun init</code> in the root directory since TSConfig will blame us for{" "}
			<strong>bun-types</strong>. You need{" "}
			<a href="https://bun.sh" rel="noreferrer noopener" target="_blank">
				Bun
			</a>{" "}
			installed on your machine, of course.
		</p>

		<p>
			It also makes sense to define a few types for our convenience. I'll go global but you can
			export them if you like.
		</p>

		<CodeBlockFromGist
			language="typescript"
			path="./src/types.d.ts"
			file={GISTS.concat("src/types.d.ts")}
		/>

		<p>
			Now we're ready to make our dirty little <strong>gutsby</strong>.
		</p>

		<Heading level={2}>Dealing with JSX in Bun</Heading>

		<p>
			With a JSX preset we've picked in our <strong>tsconfig</strong> (<code>react-jsx</code>), Bun
			will wrap every JSX element into a<code>jsxDEV</code> function call. Since we've also
			instructed it that the import source is the <code>gutsby</code> directory, let's create our
			JSX handler there. To avoid errors, we need two files: <strong>jsx-runtime.ts</strong> and{" "}
			<strong>jsx-dev-runtime.ts</strong> but the content may be completely the same since Bun will
			refer to the <strong>dev</strong> in our scenario.
		</p>

		<CodeBlockFromGist
			language="typescript"
			path="./gutsby/jsx-runtime.ts"
			file={GISTS.concat("gutsby/jsx-runtime.ts")}
		/>

		<CodeBlockFromGist
			language="typescript"
			path="./gutsby/jsx-dev-runtime.ts"
			file={GISTS.concat("gutsby/jsx-dev-runtime.ts")}
		/>

		<p>
			That is it, actually. Now all your elements will become strings of HTML. Our next step is to
			create a script that will run turn our top-level components into elements and save them as
			HTML. We're basically making a <code>ReactDOM.render</code> here, but it renders to HTML files
			directly.
		</p>

		<Heading level={2}>Building pages</Heading>

		<p>
			We need two things: a build script, and a page we'll render as a proof of concept. Let's start
			with the page first. I put mine in a <code>src/pages</code> directory to keep it separate from
			the build script and other stuff. A bit of Nextiness.
		</p>

		<CodeBlockFromGist
			language="typescript"
			path="./src/pages/index.tsx"
			file={GISTS.concat("src/pages/index.tsx")}
		/>

		<p>
			Now the last part of our tour is to get HTML. We only cover build process here but you can add
			all sorts of things here, including CSS processing, copying assets, minifying images, and
			what. The script will run <code>bun build</code> on the files inside the pages directory and
			then grab the compiled files and execute them, saving to <code>./dist/*.html</code>.
		</p>

		<CodeBlockFromGist language="typescript" path="./build.ts" file={GISTS.concat("build.ts")} />

		<p>
			And that's it! If you now run <code>bun run build.ts</code> it should create you a{" "}
			<strong>dist/www/index.html</strong> that will look something like this:
		</p>

		<img src="/bun-jsx.png" alt="A page built with Bun+JSX" class="rounded-md" />

		<p>And this wraps up our short lesson. Your optional home assignment is to add:</p>

		<ul class="list-inside list-disc">
			<li>serving HTML files (check out Bun.serve)</li>
			<li>watching for changes and rerunning compilation (fs.watch)</li>
			<li>postprocessing for CSS (TailwindCSS, for example)</li>
			<li>copying static assets for your pages</li>
			<li>optimizing images - this is a harder one</li>
		</ul>

		<p>
			If you have any questions, you can reach me out on{" "}
			<a href="https://x.com/orlowdev" rel="noreferrer noopener">
				X
			</a>
			.
		</p>

		<p>
			A fun fact: the website you're reading this article at (orlow.dev) is built with this Bun+JSX
			thing. So, if you need ideas or inspiration, check my{" "}
			<a href="htts://github.com/orlowdev/orlow.dev">GitHub for this website</a>. See you soon!
		</p>
	</BlogPostLayout>
)
