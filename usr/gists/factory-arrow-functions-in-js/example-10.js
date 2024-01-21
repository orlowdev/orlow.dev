const Square = length => ({
	length,
	getArea: () => length ** 2,
})

Square.new = Square

const s = Square.new(10) // <- Looks like Rust!
s.getArea() // 100
