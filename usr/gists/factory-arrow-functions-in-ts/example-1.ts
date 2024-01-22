export class Rectangle {
	public constructor(public length: number, public width: number) {}

	public getArea(): number {
		return this.length * this.width
	}
}

const r = new Rectangle(10, 20)
