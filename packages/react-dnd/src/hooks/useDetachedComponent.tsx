import * as React from 'react'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'

/**
 * A utility for rendering a component into a detached portal. Useful for things like drag previews.
 * @param DragPreview The drag preview component to render
 */
export function useDetachedComponent<Props extends { ref: React.Ref<any> }>(
	Component: React.RefForwardingComponent<Element, Props>,
): React.FC<Props> {
	// render the component into a detached element to prevent it from appearing too early
	const root = useMemo(() => document.createElement('div'), [Component])
	return useMemo(
		() => (props: Props) => {
			return createPortal(<Component ref={props.ref} {...props} />, root)
		},
		[Component],
	)
}
