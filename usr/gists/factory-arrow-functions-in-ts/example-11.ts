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
	width
) => ({
	length,
	width,
	getArea: () => length * width,
	getPerimeter: () => 2 * (length + width),
})

const square: FAF<number, ISquare> = length => ({
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
