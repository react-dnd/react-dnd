import * as React from 'react'
import { DropTargetHookSpec } from '../interfaces'
import { DropTarget } from 'dnd-core'

export function useDropTargetHandler<CustomProps>(
	targetSpec: DropTargetHookSpec<CustomProps>,
) {
	const targetSpecRef = React.useRef(targetSpec)

	React.useEffect(function updateDropTargetSpec() {
		targetSpecRef.current = targetSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = React.useMemo(
		() =>
			({
				canDrop(monitor, targetId) {
					const { canDrop } = targetSpecRef.current
					return canDrop ? canDrop() : true
				},
				hover(monitor, targetId) {
					const { hover } = targetSpecRef.current
					if (hover) {
						hover()
					}
				},
				drop(monitor, targetId) {
					const { drop } = targetSpecRef.current
					if (drop) {
						drop()
					}
				},
			} as DropTarget),
		[],
	)

	return handler
}
