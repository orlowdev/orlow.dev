interface IRectangle {
	length: number
	width: number
	getArea: () => number
}

const rectangle = (length: number, width: number) => ({
	length,
	width,
	getArea: () => length * width,
})

const r: IRectangle = rectangle(10, 20)
