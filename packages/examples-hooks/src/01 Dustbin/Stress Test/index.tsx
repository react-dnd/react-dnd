// tslint:disable jsx-no-lambda
declare var require: any
import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import ItemTypes from './ItemTypes'
import update from 'immutability-helper'
const shuffle = require('lodash/shuffle')

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
export default class Container extends React.Component<{}, ContainerState> {
	private interval: any

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

	public componentDidMount() {
		this.interval = setInterval(() => this.tickTock(), 1000)
	}

	public tickTock() {
		this.setState({
			boxes: shuffle(this.state.boxes),
			dustbins: shuffle(this.state.dustbins),
		})
	}

	public componentWillUnmount() {
		clearInterval(this.interval)
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

	public handleDrop(index: number, item: { name: string }) {
		const { name } = item

		this.setState(
			update(this.state, {
				dustbins: {
					[index]: {
						lastDroppedItem: {
							$set: item,
						},
					},
				},
				droppedBoxNames: name
					? {
							$push: [name],
					  }
					: {},
			}),
		)
	}
}
