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
