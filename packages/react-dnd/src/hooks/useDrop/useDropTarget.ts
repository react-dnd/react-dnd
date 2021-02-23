import { useEffect, useMemo } from 'react'
import { DropTargetMonitor } from '../../types'
import { DragObjectWithType, DropTargetHookSpec } from '../types'
import { DropTargetImpl } from './DropTargetImpl'

export function useDropTarget<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
	monitor: DropTargetMonitor,
) {
	const dropTarget = useMemo(() => new DropTargetImpl(spec, monitor), [monitor])
	useEffect(() => {
		dropTarget.spec = spec
	}, [spec])
	return dropTarget
}
