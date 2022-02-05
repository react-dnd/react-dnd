import type { CSSProperties, FC, ReactNode } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

const style: CSSProperties = {
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
	children?: ReactNode
}

export const Box: FC<BoxProps> = ({
	id,
	left,
	top,
	hideSourceOnDrag,
	children,
}) => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			item: { id, left, top },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id, left, top],
	)

	if (isDragging && hideSourceOnDrag) {
		return <div ref={drag} />
	}
	return (
		<div ref={drag} style={{ ...style, left, top }} role="Box">
			{children}
		</div>
	)
}
