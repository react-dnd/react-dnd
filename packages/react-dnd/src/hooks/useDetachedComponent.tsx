import * as React from 'react'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'

/**
 * Hook for showing a dragPreview
 * @param DragPreview The drag preview component to render
 */
export function useDetachedComponent<Props extends { ref: React.Ref<any> }>(
	DragPreview: React.RefForwardingComponent<Element, Props>,
): React.FC<Props> {
	// render the dragPreview into a detached element to prevent it from appearing too early
	const dragPreviewRoot = useMemo(() => document.createElement('div'), [
		DragPreview,
	])
	const portaledComponent = useMemo(
		() => (props: Props) => {
			return createPortal(
				<DragPreview ref={props.ref} {...props} />,
				dragPreviewRoot,
			)
		},
		[DragPreview],
	)

	return portaledComponent
}
