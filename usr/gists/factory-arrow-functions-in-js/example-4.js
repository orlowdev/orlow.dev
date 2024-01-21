const rectangle = (length, width) => ({
	width,
	length,
	getArea: () => length * width,
})

const theRectangle = rectangle(10, 20)

const getTheRectangleArea = theRectangle.getArea
getTheRectangleArea() // 200
