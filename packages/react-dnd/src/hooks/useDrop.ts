declare var require: any
import {
	DropTargetHookSpec,
	ConnectDropTarget,
	DragObjectWithType,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useRefObject } from './internal/useRefObject'
import { useDropHandler, useDropTargetMonitor } from './internal/drop'
import { useMemo } from 'react'
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
	targetSpec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDropTarget] {
	invariant(targetSpec.accept != null, 'accept must be defined')
	const spec = useRefObject(targetSpec)
	const collect = useMemo(() => spec.current!.collect, [spec.current])
	const [monitor, connector] = useDropTargetMonitor()
	useDropHandler(spec, monitor, connector)

	const result: CollectedProps = collect
		? (useMonitorOutput(monitor as any, connector, collect as any) as any)
		: ({} as CollectedProps)

	const connectDropTarget = useMemo(() => connector.hooks.dropTarget(), [
		connector,
	])

	return [result, connectDropTarget]
}
