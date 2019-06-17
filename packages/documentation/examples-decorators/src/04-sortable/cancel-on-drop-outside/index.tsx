import React, { useRef, useState, useCallback } from 'react'
import { ConnectDropTarget } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import Card from './Card'
import ItemTypes from './ItemTypes'
import update from 'immutability-helper'

const style = {
	width: 400,
}

export interface ContainerProps {
	connectDropTarget: ConnectDropTarget
}

export interface ContainerState {
	cards: any[]
}

const Container: React.FC<ContainerProps> = ({ connectDropTarget }) => {
	const ref = useRef(null)
	const [cards, setCards] = useState([
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
	])

	const moveCard = useCallback(
		(id: string, atIndex: number) => {
			const { card, index } = findCard(id)
			setCards(
				update(cards, {
					$splice: [[index, 1], [atIndex, 0, card]],
				}),
			)
		},
		[cards],
	)

	const findCard = useCallback(
		(id: string) => {
			const card = cards.filter(c => `${c.id}` === id)[0]
			return {
				card,
				index: cards.indexOf(card),
			}
		},
		[cards],
	)

	connectDropTarget(ref)
	return (
		<div ref={ref} style={style}>
			{cards.map(card => (
				<Card
					key={card.id}
					id={`${card.id}`}
					text={card.text}
					moveCard={moveCard}
					findCard={findCard}
				/>
			))}
		</div>
	)
}

export default DropTarget(ItemTypes.CARD, {}, connect => ({
	connectDropTarget: connect.dropTarget(),
}))(Container)
