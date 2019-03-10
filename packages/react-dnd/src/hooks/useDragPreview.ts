import * as React from 'react'
import { createPortal } from 'react-dom'

/**
 * Hook for showing a dragPreview
 * @param DragPreview The drag preview component to render
 */
export function useDragPreview<Props>(
	DragPreview: React.RefForwardingComponent<Element, Props>,
): [React.RefObject<Element>, React.FC<Props>] {
	// drag previews won't have layered functionality, so we can create the ref for them
	// here
	const ref = React.useRef(null)

	// render the dragPreview into a detached element to prevent it from appearing too early
	const dragPreviewRoot = document.createElement('div')
	const portaledComponent = (props: Props) => {
		const sendProps = { ...props, ref }
		return createPortal(
			React.createElement(DragPreview, sendProps),
			dragPreviewRoot,
		)
	}

	return [ref, portaledComponent]
}
