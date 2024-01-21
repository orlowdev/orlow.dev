import { CodeBlock } from "~/code-block"
import { Blockquote } from "~/common/blockquote"
import { Heading } from "~/common/heading"
import BlogPostLayout from "~/layouts/blog-post"
import { promises } from "node:fs"

export const meta: PostMeta = {
	name: "Factory Arrow Functions in JavaScript",
	date: new Date("2020-09-18"),
	slug: "factory-arrow-functions-in-js",
	description:
		"This article describes an alternative to classes for instantiating objects from a template in JavaScript.",
	labels: ["javascript"],
	sound:
		"https://music.apple.com/ru/album/strawberry-avalanche-album-version-album-version/372624794?i=372624816&l=en",
	hero: "/arrow-js.png",
}

export default async function Post() {
	const example1 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-1.js",
		"utf8"
	)
	const example2 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-2.js",
		"utf8"
	)
	const example3 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-3.js",
		"utf8"
	)
	const example4 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-4.js",
		"utf8"
	)
	const example5 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-5.js",
		"utf8"
	)
	const example6 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-6.js",
		"utf8"
	)
	const example7 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-7.js",
		"utf8"
	)
	const example8 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-8.js",
		"utf8"
	)
	const example9 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-9.js",
		"utf8"
	)
	const example10 = await promises.readFile(
		"./usr/gists/factory-arrow-functions-in-js/example-10.js",
		"utf8"
	)

	return (
		<BlogPostLayout post={meta}>
			<p>
				This article describes an alternative approach to instantiating objects from a template in
				JavaScript. For better comprehension, it is sometimes compared with commonly used ES6
				classes.
			</p>

			<Blockquote>
				<strong>DISCLAIMER</strong> The term factory arrow function is made up as I couldn't succeed
				in googling for a proper name for that. I avoid calling it factory function because it is an
				existing term that means a different thing. If you know the correct name for the concept
				covered in this article, please, share it in a comment - I'd be glad to find out.
			</Blockquote>

			<Heading level={2}>ES6 Class Recap</Heading>

			<p>
				If you do not know what ES6 classes in JavaScript are, I suggest to read{" "}
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
					rel="noreferrer noopener"
					target="_blank"
				>
					the official MDN article
				</a>{" "}
				about classes but full understanding and experience with classes is not a required
				pre-requisite for this article. Here is a short recap:
			</p>

			<Blockquote>
				Classes are a template for creating objects. They encapsulate data with code to work on that
				data. Classes in JS are built on prototypes but also have some syntax and semantics that are
				not shared with ES5 classalike semantics. ©{" "}
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
					rel="noreferrer noopener"
					target="_blank"
				>
					MDN
				</a>{" "}
			</Blockquote>

			<strong>Key features of ES6 classes:</strong>

			<ol class="list-inside list-decimal">
				<li>Familiar syntax for developers coming from other programming languages</li>
				<li>
					They don't hoist, no matter if they are used as class expressions or class declarations
				</li>
				<li>
					In methods declared on a class, this represents the current object instantiated from the
					class
				</li>
				<li>
					The body of the class always operates in{" "}
					<strong>
						<a
							href="https://developer.mozilla.org/en-US/search?q=strict+mode"
							rel="noreferrer noopener"
						>
							strict mode
						</a>
					</strong>
				</li>
				<li>
					Subclassing is possible using the <code>extends</code> keyword, referencing parent class
					is possible using the <code>super</code> keyword
				</li>
				<li>
					Instance can be checked for being an <code>instanceof</code> a constructor{" "}
					<em>(beware, dragons here)</em>
				</li>
				<li>
					The <code>new</code> keyword is used to instantiate a class
				</li>
			</ol>

			<p>
				You've most probably seen classes in JavaScript as they have become a common part of our
				codebases these days. Here is an example of an ES6 class declaration:
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example1}
			</CodeBlock>

			<Heading level={2}>Factory arrow function</Heading>

			<p>
				Although classes have many benefits, I found myself using a different approach that I would
				like to share here. In JavaScript, we can create a function that accepts arguments and
				returns an object that has exclusive access to those arguments via closure.
			</p>

			<p>Here is an example:</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example2}
			</CodeBlock>

			<p>
				This example uses a few shortcuts, so it's ok if it seems unfamiliar. Here is what it would
				look like if we wrote it in a more traditional way:
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example3}
			</CodeBlock>

			<p>
				Now I'd like to outline the cool features this approach gives us compared to ES6 class
				syntax.
			</p>

			<Heading level={3}>
				No <code>this</code>
			</Heading>

			<p>
				As we use arrow functions both for the methods and for object creation, <code>this</code> is
				<code>undefined</code>. JavaScript <code>this</code> requires a solid understanding of its
				behaviour and using it can be misleading for many developers. Instead of relying on{" "}
				<code>this</code>, we can benefit from using the closure over the arguments. As the object
				has access to the arguments, it means that they are available in its methods.
			</p>

			<p>We also enable safe method extraction because of the closure.</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example4}
			</CodeBlock>

			<p>
				<strong>NOTE</strong>: We can achieve safe method extraction with classes, for example using
				<code>Function.prototype.bind</code>, but with the factory arrow function, we no longer need
				to bother about losing the context.
			</p>

			<Heading level={3}>Private properties</Heading>

			<p>
				It is impossible to directly change the arguments passed to a function from the outside.
				They cannot be accessed, and they cannot be changed. You can explicitly allow access by
				binding the arguments to object properties. In the example below, <code>length</code> is
				available on the object externally, but <code>width</code> only exists inside and there is
				no way to access it from outside the object:
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example5}
			</CodeBlock>

			<p>
				<strong>Free Bonus</strong>: even if you assign different values on the accessible object
				properties, the object itself will still use the arguments in its methods. Keep in mind that
				it only works if you don't use the properties of the object from the outside.
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example6}
			</CodeBlock>

			<p>
				You can avoid the issue with accidental overrides of object property values by doing all the
				calculations internally in the object:
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example7}
			</CodeBlock>

			<Heading level={3}>No Direct Inheritance And Internal Method Calls</Heading>

			<p>
				If you looked at the previous example, you probably noticed that length is multiplied by
				width in two places: in <code>getArea</code> and in <code>getTotalAreaWith</code>. This is
				because we cannot use <code>this</code> and access <code>getArea</code> from inside{" "}
				<code>getTotalAreaWith</code>, which is a good example that everything has a price.
			</p>

			<p>
				The factory arrow function also does not allow us to use inheritance which may cause code
				repetition as well.
			</p>

			<p>
				But, due to the anonymous nature of our methods, we can write those separately and build up
				a horizontal extension of our objects and share methods between or even outside the objects.
			</p>

			<p>A simple way to do so is to use partial application.</p>

			<Blockquote>
				If you are not familiar with the concept of partial application, I suggest you read
				<a
					href="https://kyleshevlin.com/just-enough-fp-partial-application"
					rel="noreferrer noopener"
					target="_blank"
				>
					Kyle Shevlin's article on the topic
				</a>
				.
			</Blockquote>

			<p>
				In the example below, I create a <code>multiplyThunk</code> that is partially applied with
				two values. I then assign it as a <code>getArea</code> method on multiple different factory
				arrow function return objects and make it work for multiple shapes with a single function:
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example8}
			</CodeBlock>

			<p>
				<strong>NOTE</strong>: Using the partial application is possible in ES6 classes, but there
				is a small chance you would need to do it as you would generally prefer to use{" "}
				<code>this</code> and <code>extends</code>.
			</p>

			<Heading level={3}>Composition over Inheritance</Heading>

			<p>
				Although inheritance is not available to us with factory arrow functions, we can choose
				composition over inheritance, which means that we can extend from multiple objects at once.
				This way, we can create lightweight objects with the methods and properties we really need
				in a specific situation.
			</p>

			<p>
				<strong>NOTE</strong>: This is also possible with ES6 classes. This approach is called{" "}
				<strong>
					<a href="https://javascript.info/mixins" rel="noreferrer noopener" target="_blank">
						Mix-in
					</a>
				</strong>
				.
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example9}
			</CodeBlock>

			<Heading level={3}>Static Methods</Heading>

			<p>
				For the sake of convenience, you can imitate static methods. Static methods are methods on a
				class that can be called without instantiating the class itself. They are also non-callable
				when the class is instantiated, i.e. you cannot refer to them via <code>this</code> on the
				instance. Static methods are commonly used for utility functions in our app but they have
				other areas of application as well.
			</p>

			<p>
				With factory arrow functions, we can declare properties on the functions themselves to obey
				both laws of static methods. We can declare static properties the same way.
			</p>

			<CodeBlock language="javascript" path="rectangle.js">
				{example10}
			</CodeBlock>

			<Heading level={2}>Conclusion</Heading>

			<p>
				This article covered using factory arrow functions in JavaScript.{" "}
				<a href="/blog/factory-arrow-functions-in-ts.html">In the next one</a>, I extend the topic
				by covering factory arrow function usage with TypeScript.
			</p>
		</BlogPostLayout>
	)
}

/*
### 



```javascript

```

## 


I hope you enjoyed the read!
*/
