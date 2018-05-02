let knightPosition: [number, number] = [1, 7]
export type PositionObserver = ((position: [number, number]) => void) | null
let observer: PositionObserver = null

function emitChange() {
	if (observer) {
		observer(knightPosition)
	}
}

export function observe(o: PositionObserver) {
	if (observer) {
		throw new Error('Multiple observers not implemented.')
	}

	observer = o
	emitChange()

	return () => {
		observer = null
	}
}

export function canMoveKnight(toX: number, toY: number) {
	const [x, y] = knightPosition
	const dx = toX - x
	const dy = toY - y

	return (
		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
	)
}

export function moveKnight(toX: number, toY: number) {
	knightPosition = [toX, toY]
	emitChange()
}
