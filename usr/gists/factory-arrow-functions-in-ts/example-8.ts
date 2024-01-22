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

const square: FAF<number, ISquare> = length => ({
	length,
	getArea: () => length ** 2,
})

const point: FAF<void, IPoint> = () => ({
	getArea: () => 1,
})

const r = rectangle(10, 20)
const s = square(10)
const p = point()
