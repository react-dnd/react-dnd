import * as React from 'react'
import { createPortal } from 'react-dom'

/**
 * Hook for showing a dragPreview
 * @param DragPreview The drag preview component to render
 */
export function useDragPreview<Props>(
	DragPreview: React.RefForwardingComponent<Element, Props>,
): [React.FC<Props>, React.RefObject<any>] {
	const ref = React.useRef(null)
	// render the dragPreview into a detached element to prevent it from appearing too early
	const dragPreviewRoot = document.createElement('div')
	const portaledComponent = (props: Props) => {
		return createPortal(<DragPreview ref={ref} {...props} />, dragPreviewRoot)
	}

	return [portaledComponent, ref]
}
