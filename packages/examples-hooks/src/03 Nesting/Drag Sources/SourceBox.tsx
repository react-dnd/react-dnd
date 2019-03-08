// tslint:disable max-classes-per-file jsx-no-lambda
import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import Colors from './Colors'
const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem',
	margin: '0.5rem',
}

export interface SourceBoxProps {
	color?: string
	forbidDrag?: boolean
	onToggleForbidDrag?: () => void
}

const SourceBox: React.FC<SourceBoxProps> = ({
	color,
	forbidDrag,
	onToggleForbidDrag,
	children,
}) => {
	const ref = React.useRef(null)
	const { isDragging } = useDrag({
		ref,
		type: `${color}`,
		canDrag: () => !forbidDrag,
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})
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

	return (
		<div
			ref={ref}
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
		</div>
	)
}

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
