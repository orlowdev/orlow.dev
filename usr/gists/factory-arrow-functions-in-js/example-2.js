const rectangle = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
})

const r = rectangle(10, 20)
r.getArea() // 200
