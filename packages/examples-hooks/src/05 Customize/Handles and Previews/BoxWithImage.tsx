import * as React from 'react'
import { createPortal } from 'react-dom'
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

const BoxImage = React.forwardRef((props, ref: React.Ref<HTMLImageElement>) => {
	if (typeof Image === 'undefined') {
		return null
	}
	return <img ref={ref} src={boxImage} />
})

const BoxImageWrapper: React.FC<any> = React.forwardRef(
	({ root }, ref: React.Ref<HTMLImageElement>) => {
		return createPortal(<BoxImage ref={ref} />, root)
	},
)

const BoxWithImage: React.FC = () => {
	const ref = React.useRef(null)
	const preview = React.useRef(null)
	const dragPreviewRoot = document.createElement('div')

	const { opacity } = useDrag({
		ref,
		item: { type: ItemTypes.BOX },
		preview: preview as any,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	})

	return (
		<>
			<BoxImageWrapper ref={preview} root={dragPreviewRoot} />
			<div ref={ref} style={{ ...style, opacity }}>
				Drag me to see an image
			</div>
		</>
	)
}
export default BoxWithImage
