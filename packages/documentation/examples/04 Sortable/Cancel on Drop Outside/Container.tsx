import React from 'react'
import PropTypes from 'prop-types'
import { DropTarget, DragDropContext, ConnectDropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import ItemTypes from './ItemTypes'
const update = require('immutability-helper')

const style = {
	width: 400,
}

const cardTarget = {
	drop() {
		//
	},
}

export interface ContainerProps {
	connectDropTarget?: ConnectDropTarget
}

export interface ContainerState {
	cards: any[]
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
export default class Container extends React.Component<
	ContainerProps,
	ContainerState
> {
	public static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
	}

	constructor(props: ContainerProps) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
		this.findCard = this.findCard.bind(this)
		this.state = {
			cards: [
				{
					id: 1,
					text: 'Write a cool JS library',
				},
				{
					id: 2,
					text: 'Make it generic enough',
				},
				{
					id: 3,
					text: 'Write README',
				},
				{
					id: 4,
					text: 'Create some examples',
				},
				{
					id: 5,
					text: 'Spam in Twitter and IRC to promote it',
				},
				{
					id: 6,
					text: '???',
				},
				{
					id: 7,
					text: 'PROFIT',
				},
			],
		}
	}

	public render() {
		const { connectDropTarget } = this.props
		const { cards } = this.state

		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={style}>
					{cards.map(card => (
						<Card
							key={card.id}
							id={card.id}
							text={card.text}
							moveCard={this.moveCard}
							findCard={this.findCard}
						/>
					))}
				</div>,
			)
		)
	}

	private moveCard(id: string, atIndex: number) {
		const { card, index } = this.findCard(id)
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),
		)
	}

	private findCard(id: string) {
		const { cards } = this.state
		const card = cards.filter(c => c.id === id)[0]

		return {
			card,
			index: cards.indexOf(card),
		}
	}
}
