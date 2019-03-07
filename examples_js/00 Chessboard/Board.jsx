import React from 'react'
import { BoardSquare } from './BoardSquare'
import { Knight } from './Knight'
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
const Board = ({ knightPosition: [knightX, knightY] }) => {
  function renderSquare(i) {
    const x = i % 8
    const y = Math.floor(i / 8)
    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y}>
          {renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }
  function renderPiece(x, y) {
    const isKnightHere = x === knightX && y === knightY
    return isKnightHere ? <Knight /> : null
  }
  const squares = []
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i))
  }
  return <div style={boardStyle}>{squares}</div>
}
export default Board
