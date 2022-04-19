import type { FC } from 'react'

import { Knight } from './Knight'

export interface PieceProps {
  isKnight: boolean
}

export const Piece: FC<PieceProps> = ({ isKnight }) =>
  isKnight ? <Knight /> : null
