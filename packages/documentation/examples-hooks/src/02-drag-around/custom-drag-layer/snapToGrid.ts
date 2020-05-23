export function snapToGrid(x: number, y: number): [number, number] {
	const snappedX = Math.round(x / 32) * 32
	const snappedY = Math.round(y / 32) * 32
	return [snappedX, snappedY]
}
