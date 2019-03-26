// tslint:disable max-classes-per-file jsx-no-lambda
import React, { useState, useCallback, useMemo } from 'react'
import {
	__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__,
	DragSourceMonitor,
} from 'react-dnd'
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
	onToggleForbidDrag?: () => void
}

const SourceBox: React.FC<SourceBoxProps> = ({ color, children }) => {
	const [forbidDrag, setForbidDrag] = useState(false)
	const [{ isDragging }, drag] = useDrag(
		useMemo(
			() => ({
				item: { type: `${color}` },
				canDrag: () => !forbidDrag,
				collect: (monitor: DragSourceMonitor) => ({
					isDragging: monitor.isDragging(),
				}),
			}),
			[forbidDrag, color],
		),
	)
	const opacity = isDragging ? 0.4 : 1
	const onToggleForbidDrag = useCallback(() => {
		setForbidDrag(!forbidDrag)
	}, [forbidDrag])

	const backgroundColor = useMemo(() => {
		switch (color) {
			case Colors.YELLOW:
				return 'lightgoldenrodyellow'
			case Colors.BLUE:
				return 'lightblue'
			default:
				return 'lightgoldenrodyellow'
		}
	}, [color])

	const containerStyle = useMemo(
		() => ({
			...style,
			backgroundColor,
			opacity,
			cursor: forbidDrag ? 'default' : 'move',
		}),
		[forbidDrag, backgroundColor],
	)

	return (
		<div ref={drag} style={containerStyle}>
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

export default SourceBox
