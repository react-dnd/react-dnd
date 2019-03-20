declare var require: any
import {
	DragSourceHookSpec,
	DragObjectWithType,
	ConnectDragSource,
	ConnectDragPreview,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useRefObject } from './internal/useRefObject'
import { useDragSourceMonitor, useDragHandler } from './internal/drag'
import { useMemo } from 'react'
const invariant = require('invariant')

/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
export function useDrag<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	sourceSpec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	const spec = useRefObject(sourceSpec)
	const collect = useMemo(() => spec.current!.collect, [spec.current])

	// TODO: wire options into createSourceConnector
	invariant(sourceSpec.item != null, 'item must be defined')
	invariant(sourceSpec.item.type != null, 'item type must be defined')

	const [monitor, connector] = useDragSourceMonitor()
	useDragHandler(spec, monitor, connector)

	const result: CollectedProps = collect
		? (useMonitorOutput(monitor as any, connector, collect as any) as any)
		: (({} as CollectedProps) as any)

	return [
		result,
		(connector as any).hooks.dragSource(),
		(connector as any).hooks.dragPreview(),
	]
}
