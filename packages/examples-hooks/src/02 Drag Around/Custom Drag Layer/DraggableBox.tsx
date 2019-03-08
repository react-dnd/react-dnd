import * as React from 'react'
import {
	__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__,
	DragSourceMonitor,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Box from './Box'
const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

function getStyles(
	{ left, top }: DraggableBoxProps,
	isDragging: boolean,
): React.CSSProperties {
	const transform = `translate3d(${left}px, ${top}px, 0)`
	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		// IE fallback: hide the real node using CSS when dragging
		// because IE will ignore our custom "empty image" drag preview.
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	}
}

export interface DraggableBoxProps {
	id: string
	title: string
	left: number
	top: number
}

const DraggableBox: React.FC<DraggableBoxProps> = props => {
	const { id, title, left, top } = props
	const ref = React.useRef(null)

	const { isDragging } = useDrag({
		ref,
		type: ItemTypes.BOX,
		// Use empty image as a drag preview so browsers don't draw it
		// and we can draw whatever we want on the custom drag layer instead.
		preview: getEmptyImage(),
		previewOptions: {
			// IE fallback: specify that we'd rather screenshot the node
			// when it already knows it's being dragged so we can hide it with CSS.
			captureDraggingState: true,
		},
		begin: () => ({ id, title, left, top }),
		collect: (monitor: DragSourceMonitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	return (
		<div ref={ref} style={getStyles(props, isDragging)}>
			<Box title={title} />
		</div>
	)
}

export default DraggableBox
