import type { FC, ReactNode } from 'react'
import { useDrop } from "react-dnd"
import { Square } from "../elements/Square"
import { Overlay, OverlayType } from "../elements/Overlay"
import { PieceType } from "../elements/Piece"

export interface BoardSquareProps {
	x: number, 
  y: number, 
  children: ReactNode, 
  move: Function, 
  canMove: Function
}

export const BoardSquare:FC<BoardSquareProps> = ({ x, y, children, move, canMove }) => {
  const [{ isOver , canDrop}, drop] = useDrop(
    () => ({
      accept: Object.values(PieceType),
      drop: (item:{x:number, y:number}) => {
        const { x: fromX, y: fromY } = item
        return move(fromX, fromY, x, y)
      },
      canDrop: (item:{x:number, y:number}) => {
        const { x: fromX, y: fromY } = item
        return canMove(fromX, fromY, x, y)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  )

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square isPair={(x + y) % 2 === 1}>{children}</Square>{" "}
      <Overlay
        type={
          (!isOver && canDrop && OverlayType.PossibleMove) ||
          (isOver && canDrop && OverlayType.LegalMoveHover) ||
          OverlayType.IllegalMoveHover
        }
      />
    </div>
  )
}
