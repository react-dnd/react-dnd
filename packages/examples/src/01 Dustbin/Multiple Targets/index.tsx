import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import ItemTypes from './ItemTypes'
import update from 'immutability-helper'

export interface ContainerState {
	droppedBoxNames: string[]
	dustbins: Array<{
		accepts: string[]
		lastDroppedItem: any
	}>
	boxes: Array<{
		name: string
		type: string
	}>
}
export default class Container extends React.Component<{}, ContainerState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			dustbins: [
				{ accepts: [ItemTypes.GLASS], lastDroppedItem: null },
				{ accepts: [ItemTypes.FOOD], lastDroppedItem: null },
				{
					accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
					lastDroppedItem: null,
				},
				{ accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
			],
			boxes: [
				{ name: 'Bottle', type: ItemTypes.GLASS },
				{ name: 'Banana', type: ItemTypes.FOOD },
				{ name: 'Magazine', type: ItemTypes.PAPER },
			],
			droppedBoxNames: [],
		}
	}

	public isDropped(boxName: string) {
		return this.state.droppedBoxNames.indexOf(boxName) > -1
	}

	public render() {
		const { boxes, dustbins } = this.state

		return (
			<div>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					{dustbins.map(({ accepts, lastDroppedItem }, index) => (
						<Dustbin
							accepts={accepts}
							lastDroppedItem={lastDroppedItem}
							// tslint:disable-next-line jsx-no-lambda
							onDrop={item => this.handleDrop(index, item)}
							key={index}
						/>
					))}
				</div>

				<div style={{ overflow: 'hidden', clear: 'both' }}>
					{boxes.map(({ name, type }, index) => (
						<Box
							name={name}
							type={type}
							isDropped={this.isDropped(name)}
							key={index}
						/>
					))}
				</div>
			</div>
		)
	}

	private handleDrop(index: number, item: { name: string }) {
		const { name } = item
		const droppedBoxNames = name ? { $push: [name] } : { $push: [] }
		const dustbins = {
			[index]: {
				lastDroppedItem: {
					$set: item,
				},
			},
		}

		this.setState(
			update(this.state, {
				dustbins,
				droppedBoxNames,
			}),
		)
	}
}
