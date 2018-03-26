import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import styled from 'styled-components'
import HTML5Backend from 'react-dnd-html5-backend'
import BoardSquare from './BoardSquare'
import Knight from './Knight'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
`

const SquareContainer = styled.div`
	width: 12.5%;
	height: 12.5%;
`

@DragDropContext(HTML5Backend)
export default class Board extends Component {
	static propTypes = {
		knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
	}

	renderSquare(i) {
		const x = i % 8
		const y = Math.floor(i / 8)

		return (
			<SquareContainer key={i}>
				<BoardSquare x={x} y={y}>
					{this.renderPiece(x, y)}
				</BoardSquare>
			</SquareContainer>
		)
	}

	renderPiece(x, y) {
		const [knightX, knightY] = this.props.knightPosition
		const isKnightHere = x === knightX && y === knightY
		return isKnightHere ? <Knight /> : null
	}

	render() {
		const squares = []
		for (let i = 0; i < 64; i += 1) {
			squares.push(this.renderSquare(i))
		}

		return <Container>{squares}</Container>
	}
}
