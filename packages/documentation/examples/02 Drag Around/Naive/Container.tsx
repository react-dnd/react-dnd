import React from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext, ConnectDropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ItemTypes from './ItemTypes'
import Box from './Box'

const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
	position: 'relative',
}

const boxTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem()
		const delta = monitor.getDifferenceFromInitialOffset()
		const left = Math.round(item.left + delta.x)
		const top = Math.round(item.top + delta.y)

		component.moveBox(item.id, left, top)
	},
}

export interface ContainerProps {
	hideSourceOnDrag: boolean
	connectDropTarget?: ConnectDropTarget
}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number; title: string } }
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.BOX, boxTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
export default class Container extends React.Component<
	ContainerProps,
	ContainerState
> {
	public static propTypes = {
		hideSourceOnDrag: PropTypes.bool.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
	}

	constructor(props: ContainerProps) {
		super(props)
		this.state = {
			boxes: {
				a: { top: 20, left: 80, title: 'Drag me around' },
				b: { top: 180, left: 20, title: 'Drag me too' },
			},
		}
	}

	public render() {
		const { hideSourceOnDrag, connectDropTarget } = this.props
		const { boxes } = this.state

		return connectDropTarget(
			<div style={styles}>
				{Object.keys(boxes).map(key => {
					const { left, top, title } = boxes[key]
					return (
						<Box
							key={key}
							id={key}
							left={left}
							top={top}
							hideSourceOnDrag={hideSourceOnDrag}
						>
							{title}
						</Box>
					)
				})}
			</div>,
		)
	}

	private moveBox(id, left, top) {
		this.setState(
			update(this.state, {
				boxes: {
					[id]: {
						$merge: { left, top },
					},
				},
			}),
		)
	}
}
