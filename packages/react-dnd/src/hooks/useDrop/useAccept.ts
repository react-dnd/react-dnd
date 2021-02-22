import { useMemo } from 'react'
import { DragObjectWithType, DropTargetHookSpec } from '../types'

export function useAccept<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
) {
	const specAccept = spec.accept
	return useMemo(
		() => (Array.isArray(specAccept) ? specAccept : [specAccept]),
		[specAccept],
	)
}
