import type { CSSProperties, FC } from 'react'
import { useMemo } from 'react'
import type { DragSourceOptions } from 'react-dnd'
import { useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes.js'

const style: CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1rem',
	marginBottom: '1rem',
	cursor: 'move',
}

export interface SourceBoxProps {
	dropEffect?: string
}

export const SourceBox: FC<SourceBoxProps> = ({ dropEffect }) => {
	const options = useMemo(() => {
		const result: DragSourceOptions = {}
		if (dropEffect) {
			result.dropEffect = dropEffect
		}
		return result
	}, [dropEffect])

	const [{ opacity }, drag] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			options,
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
		}),
		[options],
	)

	return (
		<div ref={drag} style={{ ...style, opacity }}>
			I have a {dropEffect || 'undefined'} dropEffect
		</div>
	)
}
