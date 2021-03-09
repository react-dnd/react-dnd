import { useEffect, useMemo } from 'react'
import { DropTargetMonitor } from '../../types'
import { DropTargetHookSpec } from '../types'
import { DropTargetImpl } from './DropTargetImpl'

export function useDropTarget<O, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
	monitor: DropTargetMonitor<O, R>,
) {
	const dropTarget = useMemo(() => new DropTargetImpl(spec, monitor), [monitor])
	useEffect(() => {
		dropTarget.spec = spec
	}, [spec])
	return dropTarget
}
