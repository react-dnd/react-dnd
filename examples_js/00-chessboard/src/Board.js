import { useEffect, useState } from 'react'
import { BoardSquare } from './BoardSquare.js'
import { Piece } from './Piece.js'
/** Styling properties applied to the board element */
const boardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}
/** Styling properties applied to each square element */
const squareStyle = { width: '12.5%', height: '12.5%' }
/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }) => {
  const [[knightX, knightY], setKnightPos] = useState(game.knightPosition)
  useEffect(() => game.observe(setKnightPos))
  function renderSquare(i) {
    const x = i % 8
    const y = Math.floor(i / 8)
    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y} game={game}>
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    )
  }
  const squares = []
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i))
  }
  return <div style={boardStyle}>{squares}</div>
}
