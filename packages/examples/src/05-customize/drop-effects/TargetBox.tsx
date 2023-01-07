import type { CSSProperties, FC } from 'react'
import { useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes.js'

const style: CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

interface TargetBoxProps {
	dropEffect?: 'copy' | 'move'
}

export const TargetBox: FC<TargetBoxProps> = ({
	dropEffect,
}: TargetBoxProps) => {
	const [{ isActive }, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
		options: {
			dropEffect,
		},
		collect: (monitor) => ({
			isActive: monitor.canDrop() && monitor.isOver(),
		}),
	}))

	return (
		<div ref={drop} style={style}>
			<p>{isActive ? 'Release to drop' : 'Drag item here'}</p>
			<p>I have a {dropEffect || 'undefined'} dropEffect</p>
		</div>
	)
}
