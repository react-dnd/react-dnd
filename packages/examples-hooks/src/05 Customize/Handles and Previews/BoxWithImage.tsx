import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
import boxImage from './boxImage'

const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	width: '20rem',
}

const BoxWithImage: React.FC = () => {
	const ref = React.useRef(null)
	const dragPreview = React.useRef<HTMLImageElement>(null)

	React.useEffect(() => {
		const img = new Image()
		img.onload = () => {
			;(dragPreview as any).current = img
		}
		img.src = boxImage
	})
	const { opacity } = useDrag({
		ref,
		type: ItemTypes.BOX,
		dragPreview: dragPreview.current,
		begin: () => ({}),
		collect: monitor => ({
			opacity: monitor.isDragging ? 0.4 : 1,
		}),
	})

	return (
		<div ref={ref} style={{ ...style, opacity }}>
			Drag me to see an image
		</div>
	)
}
export default BoxWithImage
