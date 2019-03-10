import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'

const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export interface BoxProps {
	id: any
	left: number
	top: number
	hideSourceOnDrag?: boolean
}

const Box: React.FC<BoxProps> = ({
	id,
	left,
	top,
	hideSourceOnDrag,
	children,
}) => {
	const ref = React.useRef(null)
	const { isDragging } = useDrag({
		ref,
		item: { id, left, top, type: ItemTypes.BOX },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	if (isDragging && hideSourceOnDrag) {
		return <div ref={ref} />
	}
	return (
		<div ref={ref} style={{ ...style, left, top }}>
			{children}
		</div>
	)
}

export default Box
