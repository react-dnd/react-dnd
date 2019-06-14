import React from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget, DropTargetConnector } from 'react-dnd'
import ItemTypes from './ItemTypes'
import DraggableBox from './DraggableBox'
import snapToGrid from './snapToGrid'
// @ts-ignore
import update from 'immutability-helper'

const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
	position: 'relative',
}

export interface ContainerProps {
	snapToGrid: boolean
	connectDropTarget: ConnectDropTarget
}

export interface ContainerState {
	boxes: Record<string, { top: number; left: number; title: string }>
}

class Container extends React.PureComponent<ContainerProps, ContainerState> {
	public state: ContainerState = {
		boxes: {
			a: { top: 20, left: 80, title: 'Drag me around' },
			b: { top: 180, left: 20, title: 'Drag me too' },
		},
	}

	public render() {
		const { connectDropTarget } = this.props
		const { boxes } = this.state

		return connectDropTarget(
			<div style={styles}>
				{Object.keys(boxes).map(key => this.renderBox(boxes[key], key))}
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

	private renderBox(item: any, key: any) {
		return <DraggableBox key={key} id={key} {...item} />
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
			const delta = monitor.getDifferenceFromInitialOffset() as {
				x: number
				y: number
			}
			const item = monitor.getItem()

			let left = Math.round(item.left + delta.x)
			let top = Math.round(item.top + delta.y)
			if (props.snapToGrid) {
				;[left, top] = snapToGrid(left, top)
			}

			component.moveBox(item.id, left, top)
		},
	},
	(connect: DropTargetConnector) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(Container)
