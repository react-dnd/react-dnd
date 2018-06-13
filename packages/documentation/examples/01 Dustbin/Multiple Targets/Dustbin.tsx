import * as React from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'

const style: React.CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

const dustbinTarget = {
	drop(props: DustbinProps, monitor: DropTargetMonitor) {
		props.onDrop(monitor.getItem())
	},
}

export interface DustbinProps {
	accepts: string[]
	canDrop?: boolean
	lastDroppedItem?: any
	isOver?: boolean
	connectDropTarget?: ConnectDropTarget
	onDrop: (item: any) => void
}

@DropTarget(
	(props: DustbinProps) => props.accepts,
	dustbinTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)
export default class Dustbin extends React.Component<DustbinProps> {
	public render() {
		const {
			accepts,
			isOver,
			canDrop,
			connectDropTarget,
			lastDroppedItem,
		} = this.props
		const isActive = isOver && canDrop

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={{ ...style, backgroundColor }}>
					{isActive
						? 'Release to drop'
						: `This dustbin accepts: ${accepts.join(', ')}`}

					{lastDroppedItem && (
						<p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
					)}
				</div>,
			)
		)
	}
}
