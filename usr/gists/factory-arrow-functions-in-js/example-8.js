const multiplyThunk = (a, b) => () => a * b

const rectangle = (length, width) => ({
	length,
	width,
	getArea: multiplyThunk(length, width),
})

const square = length => ({
	length,
	getArea: multiplyThunk(length, length),
})

const circle = radius => ({
	radius,
	getArea: multiplyThunk(Math.PI, radius ** 2),
})
