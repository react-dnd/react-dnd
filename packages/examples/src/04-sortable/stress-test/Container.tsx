import Faker from 'faker'
import update from 'immutability-helper'
import type { CSSProperties } from 'react'
import { Component } from 'react'

import { Card } from './Card.js'

const style: CSSProperties = {
	width: 400,
}

interface CardItem {
	id: number
	text: string
}

export interface CardState {
	cardsById: Record<string, CardItem>
	cardsByIndex: CardItem[]
}

function buildCardData() {
	const cardsById: Record<string, CardItem> = {}
	const cardsByIndex: CardItem[] = []

	for (let i = 0; i < 1000; i += 1) {
		const card = { id: i, text: Faker.name.findName() }
		cardsById[card.id] = card
		cardsByIndex[i] = card
	}

	return {
		cardsById,
		cardsByIndex,
	}
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface ContainerProps {}

export class Container extends Component<
	ContainerProps,
	Record<string, unknown>
> {
	private requestedFrame: number | undefined
	private cardState: CardState = buildCardData()

	public constructor(props: ContainerProps) {
		super(props)
		this.state = STATE
	}

	public componentWillUnmount(): void {
		if (this.requestedFrame !== undefined) {
			cancelAnimationFrame(this.requestedFrame)
		}
	}

	public render(): JSX.Element {
		const { cardsByIndex } = this.cardState

		return (
			<>
				<div style={style}>
					{cardsByIndex.map((card) => (
						<Card
							key={card.id}
							id={card.id}
							text={card.text}
							moveCard={this.moveCard}
						/>
					))}
				</div>
			</>
		)
	}

	private moveCard = (id: string, afterId: string): void => {
		const { cardsById, cardsByIndex } = this.cardState

		const card = cardsById[id] as CardItem
		const afterCard = cardsById[afterId] as CardItem
		const cardIndex = cardsByIndex.indexOf(card)
		const afterIndex = cardsByIndex.indexOf(afterCard)
		this.cardState = update(this.cardState, {
			cardsByIndex: {
				$splice: [
					[cardIndex, 1],
					[afterIndex, 0, card],
				],
			},
		})
		this.scheduleUpdate()
	}

	private scheduleUpdate() {
		if (!this.requestedFrame) {
			this.requestedFrame = requestAnimationFrame(this.drawFrame)
		}
	}

	private drawFrame = (): void => {
		this.setState(STATE)
		this.requestedFrame = undefined
	}
}

const STATE = {}
