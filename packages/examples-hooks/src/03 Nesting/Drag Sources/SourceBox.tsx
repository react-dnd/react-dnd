// tslint:disable max-classes-per-file jsx-no-lambda
import React from 'react'
import {
	DragSource,
	ConnectDragSource,
	DragSourceMonitor,
	DragSourceConnector,
} from 'react-dnd'
import Colors from './Colors'
import { SourceBox } from '../../01 Dustbin/Stress Test'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem',
	margin: '0.5rem',
}

const ColorSource = {
	canDrag(props: SourceBoxProps) {
		return !props.forbidDrag
	},

	beginDrag() {
		return {}
	},
}

export interface SourceBoxProps {
	color?: string
	forbidDrag?: boolean
	onToggleForbidDrag?: () => void
}

interface SourceBoxCollectedProps {
	connectDragSource: ConnectDragSource
	isDragging: boolean
}

class SourceBoxRaw extends React.Component<
	SourceBoxProps & SourceBoxCollectedProps
> {
	public render() {
		const {
			color,
			children,
			isDragging,
			connectDragSource,
			forbidDrag,
			onToggleForbidDrag,
		} = this.props
		const opacity = isDragging ? 0.4 : 1

		let backgroundColor
		switch (color) {
			case Colors.YELLOW:
				backgroundColor = 'lightgoldenrodyellow'
				break
			case Colors.BLUE:
				backgroundColor = 'lightblue'
				break
			default:
				break
		}

		return connectDragSource(
			<div
				style={{
					...style,
					backgroundColor,
					opacity,
					cursor: forbidDrag ? 'default' : 'move',
				}}
			>
				<input
					type="checkbox"
					checked={forbidDrag}
					onChange={onToggleForbidDrag}
				/>
				<small>Forbid drag</small>
				{children}
			</div>,
		)
	}
}

const SourceBox = DragSource(
	(props: SourceBoxProps) => props.color + '',
	ColorSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(SourceBoxRaw)

export interface StatefulSourceBoxProps {
	color: string
}

export interface StatefulSourceBoxState {
	forbidDrag: boolean
}
export default class StatefulSourceBox extends React.Component<
	StatefulSourceBoxProps,
	StatefulSourceBoxState
> {
	constructor(props: StatefulSourceBoxProps) {
		super(props)
		this.state = {
			forbidDrag: false,
		}
	}

	public render() {
		return (
			<SourceBox
				{...this.props}
				forbidDrag={this.state.forbidDrag}
				onToggleForbidDrag={() => this.handleToggleForbidDrag()}
			/>
		)
	}

	private handleToggleForbidDrag() {
		this.setState({
			forbidDrag: !this.state.forbidDrag,
		})
	}
}
