import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";

const _generateBoard = ({ width, height }) =>
  Array(width)
    .fill()
    .map(() => Array(height).fill().map(() => ({type: null})));

const _fillBoard = (board, gameState) => {
  gameState.forEach(({ x, y, type }) => board[x][y].type = type);
  return board;
};

const _gameSetup = [
  { x: 1, y: 1, type: "knight" },
  { x: 0, y: 0, type: "bishop" },
  { x: 2, y: 2, type: "queen" },
  { x: 3, y: 3, type: "king" },
  { x: 4, y: 4, type: "pawn" },
];

const _board = _generateBoard({width: 8, height:8});

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board initialGameState={_fillBoard(_board, _gameSetup)} />
    </DndProvider>
  )
}
