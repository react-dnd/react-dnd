import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
import boxImage from './boxImage'

const {
	useDrag,
	useDragPreview,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	width: '20rem',
}

const BoxImage = React.forwardRef((props, ref: React.Ref<HTMLImageElement>) => {
	if (typeof Image === 'undefined') {
		return null
	}
	return <img ref={ref} src={boxImage} />
})

const BoxWithImage: React.FC = () => {
	const [DragPreview, preview] = useDragPreview(BoxImage)
	const [{ opacity }, ref] = useDrag({
		item: { type: ItemTypes.BOX },
		preview,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	})

	return (
		<>
			<DragPreview />
			<div ref={ref} style={{ ...style, opacity }}>
				Drag me to see an image
			</div>
		</>
	)
}
export default BoxWithImage
