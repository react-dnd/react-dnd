import React from 'react'
import {
	DropTarget,
	DropTargetConnector,
	ConnectDropTarget,
	DropTargetMonitor,
} from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

const boxTarget = {
	drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
		if (props.onDrop) {
			props.onDrop(props, monitor)
		}
	},
}

export interface TargetBoxProps {
	accepts: string[]
	onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void
}

interface TargetBoxCollectedProps {
	isOver: boolean
	canDrop: boolean
	connectDropTarget: ConnectDropTarget
}

class TargetBox extends React.Component<
	TargetBoxProps & TargetBoxCollectedProps
> {
	public render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		return connectDropTarget(
			<div style={style}>
				{isActive ? 'Release to drop' : 'Drag file here'}
			</div>,
		)
	}
}

export default DropTarget<TargetBoxProps, TargetBoxCollectedProps>(
	(props: TargetBoxProps) => props.accepts,
	boxTarget,
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)(TargetBox)
