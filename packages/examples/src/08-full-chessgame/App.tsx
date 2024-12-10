import type { FC } from 'react'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Board } from "./components/Board"
import { PieceType } from './elements/Piece'
import type { GameState } from './game'

export const _generateBoard = ({ width, height }: { width: number; height: number }): GameState => {
  let board = {};
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      board = { ...board, [`${x},${y}`]: { type: PieceType.EMPTY } };
    }
  }
  return board;
};


const _fillBoard = (board: GameState, gameState: { x: number, y: number, type: PieceType }[]) => {
  gameState.forEach(({ x, y, type }: { x: number, y: number, type: PieceType }) => board[`${x},${y}`] = { type })
  return board
}

const _gameSetup = [
  { x: 1, y: 1, type: PieceType.KNIGHT },
  { x: 0, y: 0, type: PieceType.BISHOP },
  { x: 2, y: 2, type: PieceType.QUEEN },
  { x: 3, y: 3, type: PieceType.KING },
  { x: 4, y: 4, type: PieceType.WHITEPAWN },
]

export const App: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board initialGameState={_fillBoard(_generateBoard({ width: 8, height: 8 }), _gameSetup)} />
    </DndProvider>
  )
}
