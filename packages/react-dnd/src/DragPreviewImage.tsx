import * as React from 'react'
import { createPortal } from 'react-dom'
import { ConnectDragPreview } from './interfaces'

interface DragPreviewImageProps
	extends React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	> {
	connect: ConnectDragPreview
}
/*
 * A utility for rendering a component into a detached portal.
 * NOTE: Drag previews should just be image elements
 */
const DragPreviewImage: React.FC<DragPreviewImageProps> = ({
	connect,
	...props
}) => {
	const root = document.createElement('div')
	return createPortal(<img ref={connect} {...props} />, root)
}

export default DragPreviewImage
