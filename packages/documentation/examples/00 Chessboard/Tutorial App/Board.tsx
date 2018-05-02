import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend, { IHTML5BackendContext } from 'react-dnd-html5-backend'
import BoardSquare from './BoardSquare'
import Knight from './Knight'
import './Board.less'

export interface IBoardProps {
	knightPosition: [number, number]
}

@DragDropContext(HTML5Backend)
export default class Board extends React.Component<IBoardProps> {
	public static propTypes = {
		knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
	}

	public render() {
		const squares = []
		for (let i = 0; i < 64; i += 1) {
			squares.push(this.renderSquare(i))
		}

		return <div className="Board">{squares}</div>
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
