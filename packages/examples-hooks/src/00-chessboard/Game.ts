export type Position = [number, number]
export type PositionObserver = ((position: Position) => void) | null

export class Game {
	public knightPosition: Position = [1, 7]
	private observers: PositionObserver[] = []

	public observe(o: PositionObserver): () => void {
		this.observers.push(o)
		this.emitChange()

		return (): void => {
			this.observers = this.observers.filter((t) => t !== o)
		}
	}

	public moveKnight(toX: number, toY: number): void {
		this.knightPosition = [toX, toY]
		this.emitChange()
	}

	public canMoveKnight(toX: number, toY: number): boolean {
		const [x, y] = this.knightPosition
		const dx = toX - x
		const dy = toY - y

		return (
			(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
			(Math.abs(dx) === 1 && Math.abs(dy) === 2)
		)
	}

	private emitChange() {
		const pos = this.knightPosition
		this.observers.forEach((o) => o && o(pos))
	}
}
