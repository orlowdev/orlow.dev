---
title: 'Factory Arrow Functions in TypeScript'
date: '2020-09-19'
tags:
  - javascript
  - typescript
  - development
  - patterns
song: https://music.apple.com/ru/album/%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%BD%D0%B0%D0%BC%D0%B8-%D0%BB%D1%8E%D0%B1%D0%BE%D0%B2%D1%8C/1235041084?i=1235041086&l=en
image: ./hero.png
imageAlt: Made by me with Procreate
description: Use arrow functions for constructing objects in TypeScript. Part II.
published: true
---

This article continues [the discussion of using factory arrow functions](/blog/factory-arrow-functions-in-js/) and covers providing TypeScript type definitions for them. I highly recommend reading part I.

> **DISCLAIMER**
> The term `factory arrow function` is made up as I couldn't succeed in googling for a proper name for that. I avoid calling it `factory function` because it is an existing term that means a different thing. If you know the correct name for the concept covered in this article, please, share it in a comment - I'd be glad to find out.

## It's a Series

- [Factory Arrow Functions in JavaScript (part I)](/blog/factory-arrow-functions-in-js)
- [Factory Arrow Functions in TypeScript (part II)](/blog/factory-arrow-functions-in-ts)

## Type Inference

What we get for free with classes in TypeScript is that objects instantiated from those classes have type definitions out of the box. We can refer to the class itself as a type.

```typescript
class Rectangle {
	public constructor(public length: number, public width: number) {}

	public getArea(): number {
		return this.length * this.width
	}
}

const r: Rectangle = new Rectangle(10, 20)
```

On the other hand, if we use a factory arrow function, the type of the returning object is going to be sligthly more verbose.

```typescript
const rectangle = (length: number, width: number) => ({
	length,
	width,
	getArea: () => length * width,
})

const r: { length: number; width: number; getArea: () => number } = rectangle(10, 20)
```

The first thing we can do is declare an interface for our `rectangle` return type:

```typescript
interface IRectangle {
	length: number
	width: number
	getArea: () => number
}

const rectangle = (length: number, width: number) => ({
	length,
	width,
	getArea: () => length * width,
})

const r: IRectangle = rectangle(10, 20)
```

We can also set `IRectangle` as a return type of our `rectangle` factory arrow function, but it will not be easy to identify it in the code. I prefer to put it right after declaring the variable for our factory arrow function so that it is visible at a glance.

```typescript
interface IRectangle {
	length: number
	width: number
	getArea: () => number
}

const rectangle: (length: number, width: number) => IRectangle = (
	length: number,
	width: number,
) => ({
	length,
	width,
	getArea: () => length * width,
})

const r = rectangle(10, 20)
```

## Generic Factory Arrow Function Type

Now the type of our `r` is known and we don't need to specify it explicitly. But the type signature of our `rectangle` is very messy. Moreover, we'll have to use similar type for all our factory arrow functions, so we should probably simplify it. We can create a generic type that will include both the arguments of the factory arrow function, and the return type. Let's call it `FAF` for brevity.

```typescript
type FAF<TArgs extends any[], TReturn> = (...args: TArgs) => TReturn
```

`FAF` accepts two types:

- `TArgs` that will represent arguments of our function. It must be an array or a tuple. We'll make a small change to this type a bit later.
- `TReturn` that will represent the return value of our `FAF`.

A great benefit of using this type is that we can remove the types for the arguments safely as we define them in the generic `FAF` type. To me, the more types are inferred, the better for the developer. In this case, the whole function has no types defined except for the `FAF` itself.

```typescript
type FAF<TArgs extends any[], TReturn> = (...args: TArgs) => TReturn

interface IRectangle {
	length: number
	width: number
	getArea: () => number
}

const rectangle: FAF<[number, number], IRectangle> = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
})

const r = rectangle(10, 20)
```

If we accidentally make a mistake and start accepting more arguments than what the type defines, we'll immediately see it. It doesn't save us from **less** arguments than we define in the tuple, but it's not much of an issue - if you don't need an argument, you can safely skip it. Another problem is that the `FAF` type is incovenient if we use it for zero or one arguments. We can fix it as follows:

```typescript
type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn
```

Instead of requiring an array or a tuple as our first type, we take the responsibility to check the provided type ourselves. If it is a tuple or an array, then we spread the type as a set of arguments. Otherwise, we refer to it as our function argument as is.

Now we don't have to care about adding the square brackets when we don't need them. If we create a `FAF` with no arguments at all, we can use the `void` keyword. In the following code snippet, `rectangle` has two arguments, `square` has one argument, and `dot` has no arguments, and in all cases we don't have to care about specifying argument types anywhere but the `FAF` type.

```typescript
type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn

interface IRectangle {
	length: number
	width: number
	getArea: () => number
}

interface ISquare {
	length: number
	getArea: () => number
}

interface IPoint {
	getArea: () => number
}

const rectangle: FAF<[number, number], IRectangle> = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
})

const square: FAF<number, ISquare> = (length) => ({
	length,
	getArea: () => length ** 2,
})

const point: FAF<void, IPoint> = () => ({
	getArea: () => 1,
})

const r = rectangle(10, 20)
const s = square(10)
const p = point()
```

Keep in mind that we use tuples and arrays as our first type interchangeably, which means that we will have issues if we want to pass an array as our first argument, but avoid spreading. To do so, we can simply wrap it into square brackets:

```typescript
type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn

const str: FAF<[string[]], string> = (strs: string[]) => ''
```

## The I of SOLID

![A joke about Solid Snake's eye goes here](./solid-snake.jpg)

> Image taken from [https://www.polygon.com](https://www.polygon.com/2014/3/6/5477080/why-is-metal-gears-solid-snake-called-solid-snake)

**[Interface Segregation Principle (ISP)](https://en.wikipedia.org/wiki/Interface_segregation_principle)** suggests that we should prefer small interfaces to big interfaces. Apart from improved convenience of development, ISP allows us to follow the **Law of Demeter (LoD)**, also known as **principle of least knowledge**. LoD suggests that pieces of our code should have only limited knowledge about things they work with.

One of the ways to follow ISP is by separating our types and building interface hierarchies. Following the _knowledge_ term from the LoD, I prefer to name my interfaces as _IKnows**X**_. For quite some time I also used the _I**X**Aware_.

We can extract the `getArea` and `length` methods into separate interfaces. For now, we'll rely on the ability of TypeScript interfaces to extend from multiple other interfaces, and define the same types we had before as follows:

```typescript
type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn

interface IKnowsGetArea {
	getArea: () => number
}

interface IKnowsLength {
	length: number
}

interface IRectangle extends IKnowsGetArea, IKnowsLength {
	width: number
}

interface ISquare extends IKnowsGetArea, IKnowsLength {}

interface IPoint extends IKnowsGetArea {}

const rectangle: FAF<[number, number], IRectangle> = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
})

const square: FAF<number, ISquare> = (length) => ({
	length,
	getArea: () => length ** 2,
})

const point: FAF<void, IPoint> = () => ({
	getArea: () => 1,
})
```

Nothing really changed, but we reduced a bit of repetition.

## Least Knowledge and Interface Composition

Back to [LoD](https://en.wikipedia.org/wiki/Law_of_Demeter). Although extending interfaces may be useful in some cases, we can make our types as clever as we really need.

Let's split everything to the smallest pieces. First, we introduce separate interfaces for all the properties and methods. Of course, it's not mandatory to **always** split to one-field objects. Then, we amend our shape types. We'll make them barebone - by default they will only require a minimal set of dimensions to be usable. But we will also make them generic so that we can define more features if we need them. Our `Rectangle` will be armed with `getArea` and `getPerimeter` whereas the `square` will remain barebone. Apart from providing us flexibility of defining objects, this approach also makes destructuring easier. `Pick<Axe>` no longer required!

```typescript
type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn

interface IKnowsGetArea {
	getArea: () => number
}

interface IKnowsGetPerimeter {
	getPerimeter: () => number
}

interface IKnowsLength {
	length: number
}

interface IKnowsWidth {
	width: number
}

type IRectangle<TFeatures extends Record<string, any> = {}> = IKnowsLength & IKnowsWidth & TFeatures

type ISquare<TFeatures extends Record<string, any> = {}> = IKnowsLength & TFeatures

const rectangle: FAF<[number, number], IRectangle<IKnowsGetArea & IKnowsGetPerimeter>> = (
	length,
	width,
) => ({
	length,
	width,
	getArea: () => length * width,
	getPerimeter: () => 2 * (length + width),
})

const square: FAF<number, ISquare> = (length) => ({
	length,
})

const r = rectangle(10, 20)
const s = square(10)

const getLengthOf = (x: IKnowsLength) => x.length

getLengthOf(r) // OK
getLengthOf(s) // OK

const getWidthOf = (x: IKnowsWidth) => x.width

getWidthOf(r) // OK
getWidthOf(s) // Argument of type 'ISquare<IKnowsGetArea>' is not assignable to parameter of type 'IKnowsWidth'.
// Property 'width' is missing in type 'ISquare<IKnowsGetArea>' but required in type 'IKnowsWidth'.

const getAreaOf = (x: IKnowsGetArea) => x.getArea()

getAreaOf(r) // OK
getAreaOf(s) // Argument of type 'IKnowsLength' is not assignable to parameter of type 'IKnowsGetArea'.
// Property 'getArea' is missing in type 'IKnowsLength' but required in type 'IKnowsGetArea'.

const getPerimeterOf = (x: IKnowsGetPerimeter) => x.getPerimeter()

getPerimeterOf(r) // OK
getPerimeterOf(s) // Argument of type 'IKnowsLength' is not assignable to parameter of type 'IKnowsGetPerimeter'.
// Property 'getPerimeter' is missing in type 'IKnowsLength' but required in type 'IKnowsGetPerimeter'.
```

It is not mandatory to make the _shapes_ generic. We could have made the features generic instead, so that we can provide specific shapes that need those features. It is up to you to decide which approach to choose. If there are two shapes and twenty methods, it makes sense to make shapes generic. If it is vice versa... Well, you get the point. My rule of the thumb is: don't waste time on typing redundant letters. The total quantity of letters you can type throughout your life is not infinite. Here we have two shapes and four features so generalizing shapes sounds like two times less effort.

## Static Methods

In TypeScript, we can define properties on a function because function is an object. Thus, we can define an interface for a function and imitate static properties and methods on our types. Even more - we can just extend the interface from our `FAF` type!

```typescript
type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn

interface IKnowsGetArea {
	getArea: () => number
}

interface IKnowsGetPerimeter {
	getPerimeter: () => number
}

interface ILengthAware {
	length: number
}

type ISquare<TFeatures extends Record<string, any> = {}> = ILengthAware & TFeatures

interface ISquareFAF extends FAF<number, ISquare<IKnowsGetArea & IKnowsGetPerimeter>> {
	new: ISquareFAF
}

const Square: ISquareFAF = (length) => ({
	length,
	getArea: () => length ** 2,
	getPerimeter: () => 4 * length,
})

Square.new = Square

const s = Square.new(10) // <- Looks like Rust!
Square.new.new.new.new.new.new(10) // <- Looks like Insanity!
```

## Conclusion

In this article we covered using factory arrow functions in TypeScript. I hope you enjoyed reading it!
