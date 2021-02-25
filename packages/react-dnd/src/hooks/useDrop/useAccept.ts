import { useMemo } from 'react'
import { DragObjectWithType, DropTargetHookSpec } from '../types'

/**
 * Internal utility hook to get an array-version of spec.accept.
 * The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
 * @param spec
 */
export function useAccept<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
) {
	const { accept } = spec
	return useMemo(() => (Array.isArray(accept) ? accept : [accept]), [accept])
}
