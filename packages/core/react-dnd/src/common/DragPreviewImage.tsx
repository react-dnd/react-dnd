import * as React from 'react'
import { ConnectDragPreview } from '../interfaces'

export interface DragPreviewImageProps {
	connect: ConnectDragPreview
	src: string
}
/*
 * A utility for rendering a drag preview image
 */
export const DragPreviewImage: React.FC<DragPreviewImageProps> = React.memo(
	({ connect, src }) => {
		if (typeof Image !== 'undefined') {
			const img = new Image()
			img.src = src
			img.onload = () => connect(img)
		}
		return null
	},
)
DragPreviewImage.displayName = 'DragPreviewImage'
