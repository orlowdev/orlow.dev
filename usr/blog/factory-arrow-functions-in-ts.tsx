import { CodeBlockFromGist } from "~/code-block"
import { Image } from "~/image"
import { Blockquote } from "~/common/blockquote"
import { Heading } from "~/common/heading"
import { BlogPostLayout } from "~/layouts/blog-post"

export const meta: PostMeta = {
	title: "Factory Arrow Functions in TypeScript",
	date: new Date("2020-09-18"),
	slug: "factory-arrow-functions-in-ts",
	description:
		"This article describes an alternative to classes for instantiating objects from a template in TypeScript.",
	labels: ["typescript"],
	sound:
		"https://music.apple.com/ru/album/strawberry-avalanche-album-version-album-version/372624794?i=372624816&l=en",
	hero: "/arrow-ts.png",
}

export default function Post() {
	return (
		<BlogPostLayout post={meta}>
			<p>
				This article continues{" "}
				<a href="/blog/factory-arrow-functions-in-js.html">
					the post about using factory arrow functions in JavaScript
				</a>{" "}
				and covers providing TypeScript type definitions for them. I highly recommend reading the
				part I.
			</p>

			<Blockquote>
				<strong>DISCLAIMER</strong> The term `factory arrow function` is made up as I couldn't
				succeed in googling for a proper name for that. I avoid calling it `factory function`
				because it is an existing term that means a different thing. If you know the correct name
				for the concept covered in this article, please, share it in a comment - I'd be glad to find
				out.
			</Blockquote>

			<Heading level={2}>Type Inference</Heading>

			<p>
				What we get for free with classes in TypeScript is that objects instantiated from those
				classes have type definitions out of the box. We can refer to the class itself as a type.
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-1.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				On the other hand, if we use a factory arrow function, the type of the returning object is
				going to be sligthly more verbose.
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-2.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				The first thing we can do is declare an interface for our <code>rectangle</code> return
				type:
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-3.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				We can also set <code>IRectangle</code> as a return type of our <code>rectangle</code>{" "}
				factory arrow function, but it will not be easy to identify it in the code. I prefer to put
				it right after declaring the variable for our factory arrow function so that it is visible
				at a glance.
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-4.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<Heading level={2}>Generic Factory Arrow Function Type</Heading>

			<p>
				Now the type of our <code>r</code> is known and we don't need to specify it explicitly. But
				the type signature of our <code>rectangle</code> is very messy. Moreover, we'll have to use
				similar type for all our factory arrow functions, so we should probably simplify it. We can
				create a generic type that will include both the arguments of the factory arrow function,
				and the return type. Let's call it <code>FAF</code> for brevity.
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-5.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				<code>FAF</code> accepts two types:
			</p>

			<ul class="list-inside list-decimal">
				<li>
					<code>TArgs</code> that will represent arguments of our function. It must be an array or a
					tuple. We'll make a small change to this type a bit later.
				</li>

				<li>
					<code>TReturn</code> that will represent the return value of our <code>FAF</code>.
				</li>
			</ul>

			<p>
				A great benefit of using this type is that we can remove the types for the arguments safely
				as we define them in the generic <code>FAF</code> type. To me, the more types are inferred,
				the better for the developer. In this case, the whole function has no types defined except
				for the <code>FAF</code> itself.
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-6.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				If we accidentally make a mistake and start accepting more arguments than what the type
				defines, we'll immediately see it. It doesn't save us from <strong>less</strong> arguments
				than we define in the tuple, but it's not much of an issue - if you don't need an argument,
				you can safely skip it. Another problem is that the <code>FAF</code> type is incovenient if
				we use it for zero or one arguments. We can fix it as follows:
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-7.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				Instead of requiring an array or a tuple as our first type, we take the responsibility to
				check the provided type ourselves. If it is a tuple or an array, then we spread the type as
				a set of arguments. Otherwise, we refer to it as our function argument as is.
			</p>

			<p>
				Now we don't have to care about adding the square brackets when we don't need them. If we
				create a <code>FAF</code> with no arguments at all, we can use the <code>void</code>{" "}
				keyword. In the following code snippet, <code>rectangle</code> has two arguments,{" "}
				<code>square</code> has one argument, and <code>dot</code> has no arguments, and in all
				cases we don't have to care about specifying argument types anywhere but the{" "}
				<code>FAF</code> type.
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-8.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				Keep in mind that we use tuples and arrays as our first type interchangeably, which means
				that we will have issues if we want to pass an array as our first argument, but avoid
				spreading. To do so, we can simply wrap it into square brackets:
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-9.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<Heading level={2}>The I of SOLID</Heading>

			<Image
				src="/solid-snake.jpg"
				width={768}
				alt="A joke about Solid Snake's eye goes here"
				class="rounded-md"
			/>

			<Blockquote>
				Image taken from{" "}
				<a
					href="https://www.polygon.com/2014/3/6/5477080/why-is-metal-gears-solid-snake-called-solid-snake"
					rel="noreferrer noopener"
					target="_blank"
				>
					https://www.polygon.com
				</a>
			</Blockquote>

			<p>
				<strong>
					<a
						href="https://en.wikipedia.org/wiki/Interface_segregation_principle"
						rel="noreferrer noopener"
						target="_blank"
					>
						Interface Segregation Principle (ISP)
					</a>
				</strong>{" "}
				suggests that we should prefer small interfaces to big interfaces. Apart from improved
				convenience of development, ISP allows us to follow the{" "}
				<strong>Law of Demeter (LoD)</strong>, also known as{" "}
				<strong>principle of least knowledge</strong>. LoD suggests that pieces of our code should
				have only limited knowledge about things they work with.
			</p>

			<p>
				One of the ways to follow ISP is by separating our types and building interface hierarchies.
				Following the <em>knowledge</em> term from the LoD, I prefer to name my interfaces as
				<em>
					IKnows<strong>X</strong>
				</em>
				. For quite some time I also used the{" "}
				<em>
					I<strong>X</strong>Aware
				</em>
			</p>

			<p>
				We can extract the <code>getArea</code> and <code>length</code> methods into separate
				interfaces. For now, we'll rely on the ability of TypeScript interfaces to extend from
				multiple other interfaces, and define the same types we had before as follows:
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-10.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>Nothing really changed, but we reduced a bit of repetition.</p>

			<Heading level={2}>Least Knowledge and Interface Composition</Heading>

			<p>
				Back to{" "}
				<a
					href="https://en.wikipedia.org/wiki/Law_of_Demeter"
					rel="noreferrer noopener"
					target="_blank"
				>
					LoD
				</a>
				. Although extending interfaces may be useful in some cases, we can make our types as clever
				as we really need.
			</p>

			<p>
				Let's split everything to the smallest pieces. First, we introduce separate interfaces for
				all the properties and methods. Of course, it's not mandatory to <strong>always</strong>{" "}
				split to one-field objects. Then, we amend our shape types. We'll make them barebone - by
				default they will only require a minimal set of dimensions to be usable. But we will also
				make them generic so that we can define more features if we need them. Our{" "}
				<code>Rectangle</code> will be armed with <code>getArea</code> and <code>getPerimeter</code>{" "}
				whereas the <code>square</code> will remain barebone. Apart from providing us flexibility of
				defining objects, this approach also makes destructuring easier. <code>{"Pick<Axe>"}</code>{" "}
				no longer required!
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-11.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<p>
				It is not mandatory to make the <em>shapes</em> generic. We could have made the features
				generic instead, so that we can provide specific shapes that need those features. It is up
				to you to decide which approach to choose. If there are two shapes and twenty methods, it
				makes sense to make shapes generic. If it is vice versa... Well, you get the point. My rule
				of the thumb is: don't waste time on typing redundant letters. The total quantity of letters
				you can type throughout your life is not infinite. Here we have two shapes and four features
				so generalizing shapes sounds like two times less effort.
			</p>

			<Heading level={2}>Static Methods</Heading>

			<p>
				In TypeScript, we can define properties on a function because function is an object. Thus,
				we can define an interface for a function and imitate static properties and methods on our
				types. Even more - we can just extend the interface from our <code>FAF</code> type!
			</p>

			<CodeBlockFromGist
				file={meta.slug.concat("/example-12.ts")}
				language="typescript"
				path="shape.ts"
			/>

			<Heading level={2}>Conclusion</Heading>

			<p>
				In this article we covered using factory arrow functions in TypeScript. I hope you enjoyed
				reading it!
			</p>
		</BlogPostLayout>
	)
}
