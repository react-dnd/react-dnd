import type { FC } from 'react'
import { useDrag } from "react-dnd"
import pieces from "../assets/pieces.svg"

export enum PieceType {
  KNIGHT = "knight",
  BISHOP = "bishop",
  ROOK = "rook",
  QUEEN = "queen",
  KING = "king",
  WHITEPAWN = "whitepawn",
  BLACKPAWN = "blackpawn",
  EMPTY = "",
}

export interface PieceProps {
	type: PieceType, 
  x: number, 
  y: number
}

export const Piece: FC<PieceProps> = ({ type, x, y }) =>  {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag}>
      <svg
        viewBox="0 0 45 45"
        style={{
          zIndex: 5,
          position: "relative",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <use href={`${pieces}#piece-white-${type}`} />
      </svg>
    </div>
  )
}
