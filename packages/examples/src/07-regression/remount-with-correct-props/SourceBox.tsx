import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes.js'

const getStyle = (isDragging: boolean): CSSProperties => {
	const result: CSSProperties = {
		display: 'inline-block',
		padding: '0.5rem 1rem',
		cursor: 'pointer',
		border: '1px dashed gray',
		opacity: isDragging ? 0.4 : 1,
	}
	if (isDragging) {
		result.backgroundColor = 'red'
	}
	return result
}

export interface SourceBoxProps {
	id: string
	onBeginDrag: () => void
	onEndDrag: () => void
}
export const SourceBox: FC<SourceBoxProps> = ({
	id,
	onBeginDrag,
	onEndDrag,
}) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.BOX,
		item: () => {
			onBeginDrag()
			return { id }
		},
		isDragging: (monitor) => monitor.getItem<{ id: string }>().id === id,
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
		end: onEndDrag,
	}))

	return (
		<div ref={drag} style={getStyle(isDragging)}>
			Drag me
		</div>
	)
}
