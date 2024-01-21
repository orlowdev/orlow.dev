const rectangle = (length, width) => ({
	length,
	width,
	getArea: () => length * width,
	getTotalAreaWith: ({ getArea }) => length * width + getArea(), // <- Now it will work
})

const r1 = rectangle(2, 5)
const r2 = rectangle(3, 6)

r1.getTotalAreaWith(r2) // 28

r1.width = 1000
r1.getTotalAreaWith(r2) // 28

r2.width = 1000
r1.getTotalAreaWith(r2) // 28
