import React, { useEffect, useState } from 'react'
import Board from './Board'
import { observe } from './Game'

export interface ChessboardTutorialAppState {
	knightPosition: [number, number]
}

const containerStyle: React.CSSProperties = {
	width: 500,
	height: 500,
	border: '1px solid gray',
}

/**
 * The Chessboard Tutorial Application
 */
const ChessboardTutorialApp: React.FC = () => {
	const [knightPos, setKnightPos] = useState<[number, number]>([1, 7])

	// the observe function will return an unsubscribe callback
	useEffect(() => observe((newPos: [number, number]) => setKnightPos(newPos)))
	return (
		<div style={containerStyle}>
			<Board knightPosition={knightPos} />
		</div>
	)
}

export default ChessboardTutorialApp
