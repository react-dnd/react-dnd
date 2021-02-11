import { FC, useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Dustbin } from './Dustbin'
import { Box } from './Box'
import { ItemTypes } from './ItemTypes'

interface DustbinState {
	accepts: string[]
	lastDroppedItem: any
}

interface BoxState {
	name: string
	type: string
}

export interface DustbinSpec {
	accepts: string[]
	lastDroppedItem: any
}
export interface BoxSpec {
	name: string
	type: string
}
export interface ContainerState {
	droppedBoxNames: string[]
	dustbins: DustbinSpec[]
	boxes: BoxSpec[]
}

export const Container: FC = () => {
	const [dustbins, setDustbins] = useState<DustbinState[]>([
		{ accepts: [ItemTypes.GLASS], lastDroppedItem: null },
		{ accepts: [ItemTypes.FOOD], lastDroppedItem: null },
		{
			accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
			lastDroppedItem: null,
		},
		{ accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
	])

	const [boxes] = useState<BoxState[]>([
		{ name: 'Bottle', type: ItemTypes.GLASS },
		{ name: 'Banana', type: ItemTypes.FOOD },
		{ name: 'Magazine', type: ItemTypes.PAPER },
	])

	const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

	function isDropped(boxName: string) {
		return droppedBoxNames.indexOf(boxName) > -1
	}

	const handleDrop = useCallback(
		(index: number, item: { name: string }) => {
			const { name } = item
			setDroppedBoxNames([...droppedBoxNames, ...(name ? [name] : [])])
			const newDustbins = [...dustbins]
			newDustbins[index].lastDroppedItem = item
			setDustbins(newDustbins)
		},
		[droppedBoxNames, dustbins],
	)

	return (
		<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (
					<Dustbin
						accept={accepts}
						lastDroppedItem={lastDroppedItem}
						onDrop={(item) => handleDrop(index, item)}
						key={index}
					/>
				))}
			</div>

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{boxes.map(({ name, type }, index) => (
					<Box
						name={name}
						type={type}
						isDropped={isDropped(name)}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}
