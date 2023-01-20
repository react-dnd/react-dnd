import update from 'immutability-helper'
import shuffle from 'lodash/shuffle.js'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'

import { Box } from './Box.js'
import { Dustbin } from './Dustbin.js'
import { ItemTypes } from './ItemTypes.js'

export interface SourceBox {
	name: string
	type: string
}

export interface DustbinBox {
	accepts: string[]
	lastDroppedItem: any
}

export interface ContainerState {
	boxes: SourceBox[]
	dustbins: DustbinBox[]
	droppedBoxNames: string[]
}

export const Container: FC = memo(function Container() {
	const [dustbins, setDustbins] = useState<DustbinBox[]>([
		{ accepts: [ItemTypes.GLASS], lastDroppedItem: null },
		{ accepts: [ItemTypes.FOOD], lastDroppedItem: null },
		{
			accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
			lastDroppedItem: null,
		},
		{ accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
	])
	const [boxes, setBoxes] = useState<SourceBox[]>([
		{ name: 'Bottle', type: ItemTypes.GLASS },
		{ name: 'Banana', type: ItemTypes.FOOD },
		{ name: 'Magazine', type: ItemTypes.PAPER },
	])
	const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

	useEffect(() => {
		const interval = setInterval(() => {
			setBoxes(shuffle(boxes))
			setDustbins(shuffle(dustbins))
		}, 4000)
		return () => clearInterval(interval)
	})

	const isDropped = (boxName: string) => droppedBoxNames.indexOf(boxName) > -1

	const handleDrop = useCallback(
		(index: number, item: { name: string }) => {
			const { name } = item
			setDustbins(
				update(dustbins, {
					[index]: {
						lastDroppedItem: {
							$set: item,
						},
					},
				}),
			)
			setDroppedBoxNames(
				update(
					droppedBoxNames,
					name
						? {
								$push: [name],
						  }
						: {},
				),
			)
		},
		[dustbins, droppedBoxNames],
	)

	return (
		<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (
					<Dustbin
						accepts={accepts}
						lastDroppedItem={lastDroppedItem}
						onDrop={(item) => handleDrop(index, item)}
						key={accepts.join('|')}
					/>
				))}
			</div>

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{boxes.map(({ name, type }) => (
					<Box name={name} type={type} isDropped={isDropped(name)} key={name} />
				))}
			</div>
		</div>
	)
})
