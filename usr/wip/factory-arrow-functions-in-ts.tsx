import BlogPostLayout from "~/layouts/blog-post"

export const meta: PostMeta = {
	name: "Factory Arrow Functions in TypeScript",
	date: new Date("2020-09-18"),
	slug: "factory-arrow-functions-in-ts",
	description: "",
	labels: ["typescript"],
	sound:
		"https://music.apple.com/ru/album/strawberry-avalanche-album-version-album-version/372624794?i=372624816&l=en",
	hero: "/arrow-ts.png",
}

export default function Post() {
	return (
		<BlogPostLayout post={meta}>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ab eaque sed cupiditate
				autem, minima laborum iusto a perferendis culpa corrupti nihil repellat blanditiis ipsum,
				repellendus saepe nobis soluta aperiam.
			</p>
		</BlogPostLayout>
	)
}

/**
 * title	date	tags	song	image	imageAlt	description	published	imageShare
Factory Arrow Functions in JavaScript
2020-09-18
javascript
development
patterns
https://music.apple.com/ru/album/strawberry-avalanche-album-version-album-version/372624794?i=372624816&l=en
./hero.png
Me and Procreate
Use arrow functions for constructing objects in JavaScript. Part I.
true
./og-image.png
This article describes an alternative approach to instantiating objects from a template in JavaScript. For better comprehension, it is sometimes compared with commonly used ES6 classes.

DISCLAIMER The term factory arrow function is made up as I couldn't succeed in googling for a proper name for that. I avoid calling it factory function because it is an existing term that means a different thing. If you know the correct name for the concept covered in this article, please, share it in a comment - I'd be glad to find out.

It's a Series
Factory Arrow Functions in JavaScript (part I)
Factory Arrow Functions in TypeScript (part II)
ES6 Class Recap
If you do not know what ES6 classes in JavaScript are, I suggest to read the official MDN article about classes but full understanding and experience with classes is not a required pre-requisite for this article. Here is a short recap:

Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built on prototypes but also have some syntax and semantics that are not shared with ES5 classalike semantics. © MDN MDN

Key features of ES6 classes:

Familiar syntax for developers coming from other programming languages
They don't hoist, no matter if they are used as class expressions or class declarations
In methods declared on a class, this represents the current object instantiated from the class
The body of the class always operates in strict mode
Subclassing is possible using the extends keyword, referencing parent class is possible using the super keyword
Instance can be checked for being an instanceof a constructor (beware, dragons here)
The new keyword is used to instantiate a class
You've most probably seen classes in JavaScript as they have become a common part of our codebases these days. Here is an example of an ES6 class declaration:

class Rectangle {
	constructor(length, width) {
		this.length = length
		this.width = width
	}

	getArea() {
		return this.length * this.width
	}
}

const r = new Rectangle(10, 20)
r.getArea() // 200
Factory arrow function
Although classes have many benefits, I found myself using a different approach that I would like to share here. In JavaScript, we can create a function that accepts arguments and returns an object that has exclusive access to those arguments via closure.

Here is an example:

const rectangle = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
})

const r = rectangle(10, 20)
r.getArea() // 200
This example uses a few shortcuts, so it's ok if it seems unfamiliar. Here is what it would look like if we wrote it in a more traditional way:

const rectangle = (length, width) => {
	return {
		length,
		width,
		getArea: () => length * width,
	}
}
Now I'd like to outline the cool features this approach gives us compared to ES6 class syntax.

no this
As we use arrow functions both for the methods and for object creation, this is undefined. JavaScript this requires a solid understanding of its behaviour and using it can be misleading for many developers. Instead of relying on this, we can benefit from using the closure over the arguments. As the object has access to the arguments, it means that they are available in its methods.

We also enable safe method extraction because of the closure.

const rectangle = (length, width) => ({
	width,
	length,
	getArea: () => length * width,
})

const theRectangle = rectangle(10, 20)

const getTheRectangleArea = theRectangle.getArea
getTheRectangleArea() // 200
NOTE: We can achieve safe method extraction with classes, for example using Function.prototype.bind, but with the factory arrow function, we no longer need to bother about losing the context.

Private properties
It is impossible to directly change the arguments passed to a function from the outside. They cannot be accessed, and they cannot be changed. You can explicitly allow access by binding the arguments to object properties. In the example below, length is available on the object externally, but width only exists inside and there is no way to access it from outside the object:

const rectangle = (length, width) => ({
	length,
	getArea: () => length * width,
})

const r = rectangle(10, 20)
r.length // 10
r.width // undefined
r.getArea() // 200
Free Bonus: even if you assign different values on the accessible object properties, the object itself will still use the arguments in its methods. Keep in mind that it only works if you don't use the properties of the object from the outside.

const rectangle = (length, width) => ({
	length,
	width,
	getTotalAreaWith: ({ length: oLength, width: oWidth }) => length * width + oLength * oWidth, // <- This is the cause
})

const r1 = rectangle(2, 5)
const r2 = rectangle(3, 6)

r1.getTotalAreaWith(r2) // 28

r1.width = 1000
r1.getTotalAreaWith(r2) // 28

r2.width = 1000
r1.getTotalAreaWith(r2) // 3010 <- This is the problem
You can avoid the issue with accidental overrides of object property values by doing all the calculations internally in the object:

const rectangle = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
	getTotalAreaWith: ({ getArea }) => length * width + getArea(), // <- Now it will work
})

const r1 = rectangle(2, 5)
const r2 = rectangle(3, 6)

r1.getTotalAreaWith(r2) // 28

r1.width = 1000
r1.getTotalAreaWith(r2) // 28

r2.width = 1000
r1.getTotalAreaWith(r2) // 28
No Direct Inheritance And Internal Method Calls
If you looked at the previous example, you probably noticed that length is multiplied by width in two places: in getArea and in getTotalAreaWith. This is because we cannot use this and access getArea from inside getTotalAreaWith, which is a good example that everything has a price.

The factory arrow function also does not allow us to use inheritance which may cause code repetition as well.

But, due to the anonymous nature of our methods, we can write those separately and build up a horizontal extension of our objects and share methods between or even outside the objects.

A simple way to do so is to use partial application.

If you are not familiar with the concept of partial application, I suggest you read Kyle Shevlin's article on the topic.

In the example below, I create a multiplyThunk that is partially applied with two values. I then assign it as a getArea method on multiple different factory arrow function return objects and make it work for multiple shapes with a single function:

const multiplyThunk = (a, b) => () => a * b

const rectangle = (length, width) => ({
	length,
	width,
	getArea: multiplyThunk(length, width),
})

const square = (length) => ({
	length,
	getArea: multiplyThunk(length, length),
})

const circle = (radius) => ({
	radius,
	getArea: multiplyThunk(Math.PI, radius ** 2),
})
NOTE: Using the partial application is possible in ES6 classes, but there is a small chance you would need to do it as you would generally prefer to use this and extends.

Composition over Inheritance
Although inheritance is not available to us with factory arrow functions, we can choose composition over inheritance, which means that we can extend from multiple objects at once. This way, we can create lightweight objects with the methods and properties we really need in a specific situation.

NOTE: This is also possible with ES6 classes. This approach is called Mix-in.

const squarePerimeter = (length) => ({
	getPerimeter: () => 4 * length,
})

const squareArea = (length) => ({
	getArea: () => length ** 2,
})

const LengthyShape = (...features) => (length) => ({
	length,
	...features.reduce(
		(acc, feature) => ({
			...acc,
			...feature(length),
		}),
		{},
	),
})

const squareWithPerimeter = LengthyShape(squarePerimeter)
const square = LengthyShape(squarePerimeter, squareArea)

const sp = squareWithPerimeter(5)
sp.getArea() // Uncaught TypeError: sp.getArea() is not a function
sp.getPerimeter() // 20

const s = square(5)
s.getArea() // 25
s.getPerimeter() // 20
Static Methods
For the sake of convenience, you can imitate static methods. Static methods are methods on a class that can be called without instantiating the class itself. They are also non-callable when the class is instantiated, i.e. you cannot refer to them via this on the instance. Static methods are commonly used for utility functions in our app but they have other areas of application as well.

With factory arrow functions, we can declare properties on the functions themselves to obey both laws of static methods. We can declare static properties the same way.

const Square = (length) => ({
	length,
	getArea: () => length ** 2,
})

Square.new = Square

const s = Square.new(10) // <- Looks like Rust!
s.getArea() // 100
Conclusion
This article covered using factory arrow functions in JavaScript. In the next one, I extend the topic by covering factory arrow function usage with TypeScript.

I hope you enjoyed the read!
 */
