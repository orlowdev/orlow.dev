const rectangle = (length, width) => ({
	length,
	width,
	getTotalAreaWith: ({ length: oLength, width: oWidth }) => length * width + oLength * oWidth, // <- This is the cause
})

const r1 = rectangle(2, 5)
const r2 = rectangle(3, 6)

r1.getTotalAreaWith(r2) // 28

r1.width = 1000
r1.getTotalAreaWith(r2) // 28

r2.width = 1000
r1.getTotalAreaWith(r2) // 3010 <- This is the problem
