import * as React from 'react'
import BoardSquare from './BoardSquare'
import Knight from './Knight'

export interface BoardProps {
	knightPosition: [number, number]
}

export default class Board extends React.Component<BoardProps> {
	public render() {
		const squares = []
		for (let i = 0; i < 64; i += 1) {
			squares.push(this.renderSquare(i))
		}

		return (
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexWrap: 'wrap',
				}}
			>
				{squares}
			</div>
		)
	}

	private renderSquare(i: number) {
		const x = i % 8
		const y = Math.floor(i / 8)

		return (
			<div key={i} style={{ width: '12.5%', height: '12.5%' }}>
				<BoardSquare x={x} y={y}>
					{this.renderPiece(x, y)}
				</BoardSquare>
			</div>
		)
	}

	private renderPiece(x: number, y: number) {
		const [knightX, knightY] = this.props.knightPosition
		const isKnightHere = x === knightX && y === knightY
		return isKnightHere ? <Knight /> : null
	}
}
