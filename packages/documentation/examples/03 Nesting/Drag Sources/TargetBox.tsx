// tslint:disable max-classes-per-file
import React from 'react'
import PropTypes from 'prop-types'
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
	isOver?: boolean
	canDrop?: boolean
	draggingColor?: string
	lastDroppedColor?: string
	connectDropTarget?: ConnectDropTarget
	onDrop: (item: any) => void
}

@DropTarget([Colors.YELLOW, Colors.BLUE], ColorTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
	draggingColor: monitor.getItemType(),
}))
class TargetBox extends React.Component<TargetBoxProps> {
	public static propTypes = {
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
		draggingColor: PropTypes.string,
		lastDroppedColor: PropTypes.string,
		connectDropTarget: PropTypes.func.isRequired,
		onDrop: PropTypes.func.isRequired,
	}

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

		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={{ ...style, backgroundColor, opacity }}>
					<p>Drop here.</p>

					{!canDrop &&
						lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
				</div>,
			)
		)
	}
}

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
				onDrop={((color: any) => this.handleDrop(color)) as any}
			/>
		)
	}

	private handleDrop(color: string) {
		this.setState({
			lastDroppedColor: color,
		})
	}
}
