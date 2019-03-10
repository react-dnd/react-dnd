// tslint:disable max-classes-per-file
import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import Colors from './Colors'
import { DragItem } from './interfaces'

const {
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

export interface TargetBoxProps {
	onDrop: (item: any) => void
	lastDroppedColor?: string
}

const TargetBox: React.FC<TargetBoxProps> = ({ onDrop, lastDroppedColor }) => {
	const ref = React.useRef(null)
	const { isOver, draggingColor, canDrop } = useDrop<
		DragItem,
		void,
		{ isOver: boolean; draggingColor: string; canDrop: boolean }
	>({
		ref,
		type: [Colors.YELLOW, Colors.BLUE],
		drop(item) {
			onDrop(item.type)
			return undefined
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
			draggingColor: monitor.getItemType() as string,
		}),
	})

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
		<div ref={ref} style={{ ...style, backgroundColor, opacity }}>
			<p>Drop here.</p>

			{!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
		</div>
	)
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
