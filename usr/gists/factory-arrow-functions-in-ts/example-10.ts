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

const square: FAF<number, ISquare> = length => ({
	length,
	getArea: () => length ** 2,
})

const point: FAF<void, IPoint> = () => ({
	getArea: () => 1,
})
