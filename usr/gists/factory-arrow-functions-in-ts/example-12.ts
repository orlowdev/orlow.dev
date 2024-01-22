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

const Square: ISquareFAF = length => ({
	length,
	getArea: () => length ** 2,
	getPerimeter: () => 4 * length,
})

Square.new = Square

const s = Square.new(10) // <- Looks like Rust!
Square.new.new.new.new.new.new(10) // <- Looks like Insanity!
