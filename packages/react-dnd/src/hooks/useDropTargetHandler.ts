import * as React from 'react'
import { DropTargetHookSpec } from '../interfaces'

export function useDropTargetHandler(targetSpec: DropTargetHookSpec) {
	const targetSpecRef = React.useRef(targetSpec)

	React.useEffect(function updateDropTargetSpec() {
		targetSpecRef.current = targetSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = React.useMemo(
		() => ({
			canDrop() {
				const { canDrop } = targetSpecRef.current
				return canDrop ? canDrop() : true
			},
			hover() {
				// tslint:disable-next-line
				console.log('HOVER ARGS', arguments)
				const { hover } = targetSpecRef.current
				if (hover) {
					;(hover as any)()
				}
			},
			drop() {
				const { drop } = targetSpecRef.current
				if (drop) {
					;(drop as any)()
				}
			},
		}),
		[],
	)

	return handler
}
