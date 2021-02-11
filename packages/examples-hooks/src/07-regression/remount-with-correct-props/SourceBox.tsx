import { FC, CSSProperties } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const getStyle = (isDragging: boolean): CSSProperties => ({
	display: 'inline-block',
	padding: '0.5rem 1rem',
	cursor: 'pointer',
	border: '1px dashed gray',
	backgroundColor: isDragging ? 'red' : undefined,
	opacity: isDragging ? 0.4 : 1,
})

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
	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.BOX, id },
		isDragging: (monitor) => monitor.getItem().id === id,
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
		begin: onBeginDrag,
		end: onEndDrag,
	})

	return (
		<div ref={drag} style={getStyle(isDragging)}>
			Drag me
		</div>
	)
}
