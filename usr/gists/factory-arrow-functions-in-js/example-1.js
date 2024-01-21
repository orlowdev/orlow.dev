class Rectangle {
	constructor(length, width) {
		this.length = length
		this.width = width
	}

	getArea() {
		return this.length * this.width
	}
}

const r = new Rectangle(10, 20)
r.getArea() // 200
