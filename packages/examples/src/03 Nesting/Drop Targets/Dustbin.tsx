import React from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'

function getStyle(backgroundColor: string): React.CSSProperties {
	return {
		border: '1px solid rgba(0,0,0,0.2)',
		minHeight: '8rem',
		minWidth: '8rem',
		color: 'white',
		backgroundColor,
		padding: '2rem',
		paddingTop: '1rem',
		margin: '1rem',
		textAlign: 'center',
		float: 'left',
		fontSize: '1rem',
	}
}

const boxTarget = {
	drop(
		props: DustbinProps,
		monitor: DropTargetMonitor,
		component: React.Component | null,
	) {
		if (!component) {
			return
		}
		const hasDroppedOnChild = monitor.didDrop()
		if (hasDroppedOnChild && !props.greedy) {
			return
		}

		component.setState({
			hasDropped: true,
			hasDroppedOnChild,
		})
	},
}

export interface DustbinProps {
	greedy?: boolean
}

interface DustbinCollectedProps {
	isOver: boolean
	isOverCurrent: boolean
	connectDropTarget: ConnectDropTarget
}

export interface DustbinState {
	hasDropped: boolean
	hasDroppedOnChild: boolean
}

class Dustbin extends React.Component<
	DustbinProps & DustbinCollectedProps,
	DustbinState
> {
	public state: DustbinState = {
		hasDropped: false,
		hasDroppedOnChild: false,
	}

	public render() {
		const {
			greedy,
			isOver,
			isOverCurrent,
			connectDropTarget,
			children,
		} = this.props
		const { hasDropped, hasDroppedOnChild } = this.state

		const text = greedy ? 'greedy' : 'not greedy'
		let backgroundColor = 'rgba(0, 0, 0, .5)'

		if (isOverCurrent || (isOver && greedy)) {
			backgroundColor = 'darkgreen'
		}

		return connectDropTarget(
			<div style={getStyle(backgroundColor)}>
				{text}
				<br />
				{hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}

				<div>{children}</div>
			</div>,
		)
	}
}
export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	isOverCurrent: monitor.isOver({ shallow: true }),
}))(Dustbin)
