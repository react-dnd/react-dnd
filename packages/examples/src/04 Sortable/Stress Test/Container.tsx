import React from 'react'
import { name } from 'faker'
import Card from './Card'
import update from 'immutability-helper'

const style = {
	width: 400,
}

export interface ContainerState {
	cardsById: { [key: string]: any }
	cardsByIndex: any[]
}

export default class Container extends React.Component<{}, ContainerState> {
	// tslint:disable-next-line ban-types
	private pendingUpdateFn: any
	private requestedFrame: number | undefined

	constructor(props: {}) {
		super(props)

		const cardsById: { [key: string]: any } = {}
		const cardsByIndex = []

		for (let i = 0; i < 1000; i += 1) {
			const card = { id: i, text: name.findName() }
			cardsById[card.id] = card
			cardsByIndex[i] = card
		}

		this.state = {
			cardsById,
			cardsByIndex,
		}
	}

	public componentWillUnmount() {
		if (this.requestedFrame !== undefined) {
			cancelAnimationFrame(this.requestedFrame)
		}
	}

	public render() {
		const { cardsByIndex } = this.state

		return (
			<div style={style}>
				{cardsByIndex.map(card => (
					<Card
						key={card.id}
						id={card.id}
						text={card.text}
						moveCard={this.moveCard}
					/>
				))}
			</div>
		)
	}

	// tslint:disable-next-line ban-types
	private scheduleUpdate(updateFn: any) {
		this.pendingUpdateFn = updateFn

		if (!this.requestedFrame) {
			this.requestedFrame = requestAnimationFrame(this.drawFrame)
		}
	}

	private drawFrame = () => {
		const nextState = update(this.state, this.pendingUpdateFn)
		this.setState(nextState)

		this.pendingUpdateFn = undefined
		this.requestedFrame = undefined
	}

	private moveCard = (id: string, afterId: string) => {
		const { cardsById, cardsByIndex } = this.state

		const card = cardsById[id]
		const afterCard = cardsById[afterId]

		const cardIndex = cardsByIndex.indexOf(card)
		const afterIndex = cardsByIndex.indexOf(afterCard)

		this.scheduleUpdate({
			cardsByIndex: {
				$splice: [[cardIndex, 1], [afterIndex, 0, card]],
			},
		})
	}
}
