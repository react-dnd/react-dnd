import type { FC, ReactNode } from 'react'
import { useDrop } from 'react-dnd'

import type { Game } from './Game'
import { ItemTypes } from './ItemTypes'
import { Overlay, OverlayType } from './Overlay'
import { Square } from './Square'

export interface BoardSquareProps {
  x: number
  y: number
  children?: ReactNode
  game: Game
}

export const BoardSquare: FC<BoardSquareProps> = ({
  x,
  y,
  children,
  game,
}: BoardSquareProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => game.canMoveKnight(x, y),
      drop: () => game.moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game],
  )
  const black = (x + y) % 2 === 1

  return (
    <div
      ref={drop}
      role="Space"
      data-testid={`(${x},${y})`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  )
}
