import { CSSProperties, FC } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

export interface BoxProps {
	name: string
}

export const Box: FC<BoxProps> = function Box({ name }) {
	const [{ isDragging, handlerId }, drag] = useDrag({
		item: { name, type: ItemTypes.BOX },
		end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				alert(`You dropped ${item.name} into ${dropResult.name}!`)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	})
	const opacity = isDragging ? 0.4 : 1
	return (
		<div ref={drag} style={{ ...style, opacity }} data-handler-id={handlerId}>
			{name}
		</div>
	)
}
