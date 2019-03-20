declare var require: any
import {
	DropTargetHookSpec,
	ConnectDropTarget,
	DragObjectWithType,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useDropHandler, useDropTargetMonitor } from './internal/drop'
import { useMemo, useEffect } from 'react'
const invariant = require('invariant')

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	specFn: () => DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
	memoKeys: any[] = [],
): [CollectedProps, ConnectDropTarget] {
	const spec = useMemo(specFn, memoKeys)
	invariant(spec.accept != null, 'accept must be defined')
	const collect = useMemo(() => spec.collect, [spec])
	const [monitor, connector] = useDropTargetMonitor()
	useDropHandler(spec, monitor, connector)

	const result: CollectedProps = collect
		? (useMonitorOutput(monitor as any, connector, collect as any) as any)
		: ({} as CollectedProps)

	const connectDropTarget = useMemo(() => connector.hooks.dropTarget(), [
		connector,
	])

	useEffect(() => connector.setDropTargetOptions(spec.options), [spec.options])
	return [result, connectDropTarget]
}
