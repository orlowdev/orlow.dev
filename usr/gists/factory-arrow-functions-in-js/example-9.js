const squarePerimeter = length => ({
	getPerimeter: () => 4 * length,
})

const squareArea = length => ({
	getArea: () => length ** 2,
})

const LengthyShape =
	(...features) =>
	length => ({
		length,
		...features.reduce(
			(acc, feature) => ({
				...acc,
				...feature(length),
			}),
			{}
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
