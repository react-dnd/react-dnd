import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrop } from 'react-dnd'

const style: CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

export interface DustbinProps {
	lastDroppedItem?: any
	accepts: string[]
	onDrop: (arg: any) => void
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
	lastDroppedItem,
	accepts: accept,
	onDrop,
}) {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept,
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
			drop: (item: unknown) => onDrop(item),
		}),
		[accept],
	)

	const isActive = isOver && canDrop
	let backgroundColor = '#222'
	if (isActive) {
		backgroundColor = 'darkgreen'
	} else if (canDrop) {
		backgroundColor = 'darkkhaki'
	}

	return (
		<div ref={drop} style={{ ...style, backgroundColor }}>
			{isActive
				? 'Release to drop'
				: `This dustbin accepts: ${accept.join(', ')}`}

			{lastDroppedItem && (
				<p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
			)}
		</div>
	)
})
