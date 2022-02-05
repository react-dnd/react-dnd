import { CSSProperties, FC, useMemo } from 'react'
import { Board } from './Board.js'
import { Game } from './Game.js'

export interface ChessboardTutorialAppState {
	knightPosition: [number, number]
}

const containerStyle: CSSProperties = {
	width: 500,
	height: 500,
	border: '1px solid gray',
}

/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp: FC = () => {
	const game = useMemo(() => new Game(), [])

	return (
		<div style={containerStyle}>
			<Board game={game} />
		</div>
	)
}
