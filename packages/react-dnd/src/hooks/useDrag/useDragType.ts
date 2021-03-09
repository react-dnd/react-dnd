import { invariant } from '@react-dnd/invariant'
import { Identifier } from 'dnd-core'
import { useMemo } from 'react'
import { DragSourceHookSpec } from '../types'

export function useDragType(
	spec: DragSourceHookSpec<any, any, any>,
): Identifier {
	return useMemo(() => {
		const result: Identifier | null =
			spec.type ?? (spec.item?.type as Identifier) ?? null
		invariant(result != null, 'spec.type or spec.item.type must be defined')
		return result
	}, [spec])
}
