export class Game {
  knightPosition = [1, 7]
  observers = []
  observe(o) {
    this.observers.push(o)
    this.emitChange()
    return () => {
      this.observers = this.observers.filter((t) => t !== o)
    }
  }
  moveKnight(toX, toY) {
    this.knightPosition = [toX, toY]
    this.emitChange()
  }
  canMoveKnight(toX, toY) {
    const [x, y] = this.knightPosition
    const dx = toX - x
    const dy = toY - y
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
  }
  emitChange() {
    const pos = this.knightPosition
    this.observers.forEach((o) => o && o(pos))
  }
}
