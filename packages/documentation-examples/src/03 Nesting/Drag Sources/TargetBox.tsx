// tslint:disable max-classes-per-file
import React from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import Colors from './Colors'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

const ColorTarget = {
	drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
		props.onDrop(monitor.getItemType())
	},
}

export interface TargetBoxProps {
	onDrop: (item: any) => void
	lastDroppedColor?: string
}

interface TargetBoxCollectedProps {
	isOver: boolean
	canDrop: boolean
	draggingColor: string
	connectDropTarget: ConnectDropTarget
}

class TargetBoxRaw extends React.Component<
	TargetBoxProps & TargetBoxCollectedProps
> {
	public render() {
		const {
			canDrop,
			isOver,
			draggingColor,
			lastDroppedColor,
			connectDropTarget,
		} = this.props
		const opacity = isOver ? 1 : 0.7

		let backgroundColor = '#fff'
		switch (draggingColor) {
			case Colors.BLUE:
				backgroundColor = 'lightblue'
				break
			case Colors.YELLOW:
				backgroundColor = 'lightgoldenrodyellow'
				break
			default:
				break
		}

		return connectDropTarget(
			<div style={{ ...style, backgroundColor, opacity }}>
				<p>Drop here.</p>

				{!canDrop && lastDroppedColor && (
					<p>Last dropped: {lastDroppedColor}</p>
				)}
			</div>,
		)
	}
}

const TargetBox = DropTarget<TargetBoxProps, TargetBoxCollectedProps>(
	[Colors.YELLOW, Colors.BLUE],
	ColorTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
		draggingColor: monitor.getItemType() as string,
	}),
)(TargetBoxRaw)

export interface StatefulTargetBoxState {
	lastDroppedColor: string | null
}
export default class StatefulTargetBox extends React.Component<
	{},
	StatefulTargetBoxState
> {
	constructor(props: {}) {
		super(props)
		this.state = { lastDroppedColor: null }
	}

	public render() {
		return (
			<TargetBox
				{...this.props}
				lastDroppedColor={this.state.lastDroppedColor as string}
				onDrop={((color: string) => this.handleDrop(color)) as any}
			/>
		)
	}

	private handleDrop(color: string) {
		this.setState({
			lastDroppedColor: color,
		})
	}
}
