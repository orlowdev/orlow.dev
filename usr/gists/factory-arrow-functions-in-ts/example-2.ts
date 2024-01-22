const rectangle = (length: number, width: number) => ({
	length,
	width,
	getArea: () => length * width,
})

const r: { length: number; width: number; getArea: () => number } = rectangle(10, 20)
