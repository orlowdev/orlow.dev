const rectangle = (length, width) => ({
	length,
	getArea: () => length * width,
})

const r = rectangle(10, 20)
r.length // 10
r.width // undefined
r.getArea() // 200
