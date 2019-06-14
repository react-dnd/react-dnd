import React from 'react'
import { ConnectDropTarget, DropTargetMonitor, XYCoord } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'

const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
	position: 'relative',
}

export interface ContainerProps {
	hideSourceOnDrag: boolean
	connectDropTarget: ConnectDropTarget
}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number; title: string } }
}

class Container extends React.Component<ContainerProps, ContainerState> {
	public state: ContainerState = {
		boxes: {
			a: { top: 20, left: 80, title: 'Drag me around' },
			b: { top: 180, left: 20, title: 'Drag me too' },
		},
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

	public moveBox(id: string, left: number, top: number) {
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

export default DropTarget(
	ItemTypes.BOX,
	{
		drop(
			props: ContainerProps,
			monitor: DropTargetMonitor,
			component: Container | null,
		) {
			if (!component) {
				return
			}
			const item = monitor.getItem()
			const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
			const left = Math.round(item.left + delta.x)
			const top = Math.round(item.top + delta.y)

			component.moveBox(item.id, left, top)
		},
	},
	(connect: any) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(Container)
