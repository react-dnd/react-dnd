import * as React from 'react'
import styled from 'styled-components'
import BoardSquare from './BoardSquare'
import Knight from './Knight'

export interface BoardProps {
	knightPosition: [number, number]
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
`

export default class Board extends React.Component<BoardProps> {
	public render() {
		const squares = []
		for (let i = 0; i < 64; i += 1) {
			squares.push(this.renderSquare(i))
		}

		return <Container>{squares}</Container>
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
