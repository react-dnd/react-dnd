import type { FC } from 'react'
import { BoardSquare } from "./BoardSquare";
import { Piece } from "../elements/Piece";
import {useGameState, GameState} from "../game.js";


export interface BoardProps {
	initialGameState: GameState
}

export const Board:FC<BoardProps> = ({
  initialGameState=[[]]
}) => {
  const {game, move, canMove} = useGameState(initialGameState);
  return (
    <main
      style={{
        width: "500px",
        height: "500px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {game.map((row, x: number) =>
        row.map(({ type }, y: number) => (
          <div key={`${x};${y}`} style={{ width: "12.5%", height: "12.5%" }}>
            <BoardSquare x={x} y={y} move={move} canMove={canMove}>
              {type && <Piece x={x} y={y} type={type} />}
            </BoardSquare>
          </div>
        ))
      )}
    </main>
  );
}
