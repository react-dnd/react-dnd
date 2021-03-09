import { invariant } from '@react-dnd/invariant'
import { Identifier } from 'dnd-core'
import { useMemo } from 'react'
import { DragSourceHookSpec } from '../types'

export function useDragType(
	spec: DragSourceHookSpec<any, any, any>,
): Identifier {
	return useMemo(() => {
		const result: Identifier = spec.type
		invariant(result != null, 'spec.type must be defined')
		return result
	}, [spec])
}
