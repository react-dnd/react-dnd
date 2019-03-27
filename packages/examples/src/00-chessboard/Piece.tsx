import React from 'react'
import Knight from './Knight'

export interface PieceProps {
	isKnight: boolean
}

export const Piece: React.FC<PieceProps> = ({ isKnight }) =>
	isKnight ? <Knight /> : null
