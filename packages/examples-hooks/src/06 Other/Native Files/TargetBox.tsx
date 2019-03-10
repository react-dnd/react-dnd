import * as React from 'react'
import {
	__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__,
	DropTargetMonitor,
} from 'react-dnd'
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
	accepts: string[]
	onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void
}

const TargetBox: React.FC<TargetBoxProps> = props => {
	const { accepts: accept, onDrop } = props
	const ref = React.useRef(null)
	const { canDrop, isOver } = useDrop({
		ref,
		accept,
		drop(item, monitor) {
			if (onDrop) {
				onDrop(props, monitor)
			}
		},
		collect: monitor => ({
			isOver: monitor.isOver,
			canDrop: monitor.canDrop,
		}),
	})
	const isActive = canDrop && isOver
	return (
		<div ref={ref} style={style}>
			{isActive ? 'Release to drop' : 'Drag file here'}
		</div>
	)
}

export default TargetBox
